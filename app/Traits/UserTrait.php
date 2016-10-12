<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-07
 * Time: 15:56
 */

namespace App\Traits;

use App\Models\User;
use App\Models\UserMobile;
use App\Models\UserOpenid;
use App\Services\CookieService;
use Log;
use DB;
use Exception;

trait UserTrait
{
    /**
     * 根据用户ID查询手机号和openid。
     *
     * @param $id
     * @param array $columns
     * @return mixed|static
     */
    protected function getUserById($id, array $columns = ['*'])
    {
        return User::whereId($id)->first($columns);
    }

    /**
     * 验证手机号是否存在。
     *
     * @param $mobile
     * @return bool
     */
    protected function checkUserByMobile($mobile)
    {
        return User::whereMobile($mobile)->whereStatus(true)->count() > 0;
    }

    /**
     * 验证openid是否存在。
     *
     * @param $openid
     * @return bool
     */
    protected function checkUserByOpenid($openid)
    {
        return User::whereOpenid($openid)->whereStatus(true)->count() > 0;
    }

    /**
     * 根据手机号查询用户。
     *
     * @param $mobile
     * @param array $columns
     * @return mixed|static
     */
    protected function getUserByMobile($mobile, array $columns = ['*'])
    {
        return User::whereMobile($mobile)->whereStatus(true)->first($columns);
    }

    /**
     * 根据openid查询用户。
     *
     * @param $openid
     * @param array $columns
     * @return mixed|static
     */
    protected function getUserByOpenid($openid, array $columns = ['*'])
    {
        return User::whereOpenid($openid)->whereStatus(true)->first($columns);
    }

    /**
     * 获取个人中心信息。
     *
     * @param $id
     * @return array
     */
    protected function getUserBasicById($id)
    {
        $user = $this->getUserById($id, ['nick_name']);

        return [
            'result' => 1,
            'nick_name' => e($user->nick_name),
            'topic_status' => 1,
            'note_status' => 1,
        ];
    }

    /**
     * 更新用户头像。
     *
     * @param $id
     * @param $headUrl
     * @return int
     */
    protected function updateUserHeadUrl($id, $headUrl)
    {
        $user = $this->getUserById($id, ['id']);

        $user->head_url = $headUrl;

        try {
            $user->save();

            return 1;
        } catch (Exception $e) {
            Log::error('update user head_url exception,user_id:' . $id . ',exception:' . $e->getMessage());

            return 0;
        }
    }

    /**
     * 更新用户信息。
     *
     * @param $id
     * @param $nickName
     * @param $area
     * @param $interest
     * @param $profession
     * @param $gender
     * @param $birthday
     * @return int
     */
    protected function updateUser($id, $nickName, $area, $interest, $profession, $gender, $birthday)
    {
        $user = $this->getUserById($id, ['id']);

        $user->nick_name = $nickName;
        $user->area = $area;
        $user->interest = $interest;
        $user->profession = $profession;
        $user->gender = $gender;
        $user->birthday = $birthday;

        try {
            $user->save();

            return 1;
        } catch (Exception $e) {
            Log::error('update user info exception,user_id:' . $id . ',exception:' . $e->getMessage());

            return 0;
        }
    }

    /**
     * 绑定手机号时验证处理。
     *
     * @param $id
     * @param $mobile
     * @return array
     */
    protected function checkBindingUserByMobile($id, $mobile)
    {
        $existUser = $this->getUserById($id, ['id', 'mobile']);

        if (mb_strlen($existUser->mobile) > 0) {
            return ['status' => 3];//用户已经绑定过手机号了。
        }

        $mobileUser = $this->getUserByMobile($mobile, ['id', 'openid']);

        if (is_null($mobileUser)) {
            return ['status' => 1, 'user' => $existUser];//可以绑定。
        } elseif (mb_strlen($mobileUser->openid) > 0) {
            return ['status' => 4];//手机号已经被别的用户绑定过了。
        } else {
            return ['status' => 2, 'user' => $existUser, 'user_check' => $mobileUser];//需要验证总积分数。
        }
    }

    /**
     * 使用高积分用户绑定。
     *
     * @param $userId
     * @param $delUserId
     * @return array
     */
    protected function mergeHighPointsUserByMobile($userId, $delUserId)
    {
        $user = $this->getUserById($userId, ['id', 'head_url']);

        $delUser = $this->getUserById($delUserId, ['id', 'openid']);

        $user->openid = $delUser->openid;

        $delUser->status = false;

        try {
            $user->save();

            $delUser->save();

            DB::commit();

            return ['result' => 1, 'openid' => $delUser->openid, 'head_url' => $user->head_url];
        } catch (Exception $e) {
            Log::error('merge high user mobile exception,user_id:' . $user->id . ',openid:' . $delUser->openid .
                ',merge_user_id, ' . $delUser->id . ',exception:' . $e->getMessage());

            DB::rollBack();

            return ['result' => 0];
        }
    }

    /**
     * 绑定手机号到当前账号。
     *
     * @param $userId
     * @param $delUserId
     * @param $mobile
     * @return int
     */
    protected function mergeCurrentUserByMobile($userId, $delUserId, $mobile)
    {
        return $this->mergeUserByMobile($this->getUserById($userId, ['id']),
            $this->getUserById($delUserId, ['id']),
            $mobile);
    }

    /**
     * 绑定手机号到当前账号。
     *
     * @param User $user
     * @param User $userCheck
     * @param $mobile
     * @return int
     */
    protected function mergeUserByMobile($user, $userCheck, $mobile)
    {
        $user->mobile = $mobile;

        $userCheck->status = false;

        try {
            $user->save();

            $userCheck->save();

            DB::commit();

            return 1;
        } catch (Exception $e) {
            Log::error('merge user mobile exception,user_id:' . $user->id . ',mobile:' . $mobile .
                ',merge_user_id, ' . $userCheck->id . ',exception:' . $e->getMessage());

            DB::rollBack();

            return 0;
        }
    }

    /**
     * 绑定手机号。
     *
     * @param User $user
     * @param $mobile
     * @return int
     */
    protected function bindingUserByMobile($user, $mobile)
    {
        $userMobile = new UserMobile();

        $userMobile->mobile = $mobile;

        $user->mobile = $mobile;

        DB::beginTransaction();

        try {
            $userMobile->save();

            $user->save();

            DB::commit();

            return 1;
        } catch (Exception $e) {
            Log::error('binding user mobile exception,user_id:' . $user->id . ',mobile:' . $mobile .
                ',exception:' . $e->getMessage());

            DB::rollBack();

            return 0;
        }
    }

    /**
     * 绑定openid时验证处理。
     *
     * @param $id
     * @param $openid
     * @return array
     */
    protected function checkBindingUserByOpenid($id, $openid)
    {
        $existUser = $this->getUserById($id, ['id', 'openid', 'nick_name', 'head_url']);

        if (mb_strlen($existUser->openid) > 0) {
            return ['status' => 3];//用户已经绑定过openid了。
        }

        $openidUser = $this->getUserByOpenid($openid, ['id', 'mobile']);

        if (is_null($openidUser)) {
            return ['status' => 1, 'user' => $existUser];//可以绑定。
        } elseif (mb_strlen($openidUser->mobile) > 0) {
            return ['status' => 4];//openid已经被别的用户绑定过了。
        } else {
            return ['status' => 2, 'user' => $existUser, 'user_check' => $openidUser];//需要验证总积分数。
        }
    }

    /**
     * 微信使用高积分用户绑定。
     *
     * @param $userId
     * @param $delUserId
     * @return array
     */
    protected function mergeHighPointsUserByOpenid($userId, $delUserId)
    {
        $user = $this->getUserById($userId, ['id', 'head_url']);

        $delUser = $this->getUserById($delUserId, ['id', 'mobile']);

        $user->mobile = $delUser->mobile;

        $delUser->status = false;

        try {
            $user->save();

            $delUser->save();

            DB::commit();

            return ['result' => 1, 'mobile' => $delUser->mobile, 'head_url' => $user->head_url];
        } catch (Exception $e) {
            Log::error('merge high user openid exception,user_id:' . $user->id . ',mobile:' . $delUser->mobile .
                ',merge_user_id, ' . $delUser->id . ',exception:' . $e->getMessage());

            DB::rollBack();

            return ['result' => 0];
        }
    }

    /**
     * 绑定openid到当前账号。
     *
     * @param $userId
     * @param $delUserId
     * @param $openid
     * @return int
     */
    protected function mergeCurrentUserByOpenid($userId, $delUserId, $openid)
    {
        return $this->mergeUserByOpenid($this->getUserById($userId, ['id']),
            $this->getUserById($delUserId, ['id']),
            $openid);
    }

    /**
     * 绑定openid到当前账号。
     *
     * @param User $user
     * @param User $userCheck
     * @param $openid
     * @return int
     */
    protected function mergeUserByOpenid($user, $userCheck, $openid)
    {
        $user->openid = $openid;

        $userCheck->status = false;

        try {
            $user->save();

            $userCheck->save();

            DB::commit();

            return 1;
        } catch (Exception $e) {
            Log::error('merge user openid exception,user_id:' . $user->id . ',openid:' . $openid .
                ',merge_user_id, ' . $userCheck->id . ',exception:' . $e->getMessage());

            DB::rollBack();

            return 0;
        }
    }

    /**
     * 绑定openid。
     *
     * @param User $user
     * @param $openid
     * @param $nickName
     * @param $headUrl
     * @return int
     */
    protected function bindingUserByOpenid($user, $openid, $nickName, $headUrl)
    {
        $userOpenid = new UserOpenid();

        $userOpenid->openid = $openid;

        $user->openid = $openid;

        if (mb_strlen($user->nick_name) == 0 && mb_strlen($nickName) > 0) {
            $user->nick_name = $nickName;
        }

        $status = false;

        if (mb_strlen($user->head_url) == 0 && mb_strlen($headUrl) > 0) {
            $status = true;

            $user->head_url = $headUrl;
        }

        DB::beginTransaction();

        try {
            $userOpenid->save();

            $user->save();

            DB::commit();

            if ($status) {
                CookieService::userHeadUrl($headUrl);
            }

            return 1;
        } catch (Exception $e) {
            Log::error('binding user openid exception,user_id:' . $user->id . ',openid:' . $openid .
                ',exception:' . $e->getMessage());

            DB::rollBack();

            return 0;
        }
    }

    /**
     * 根据手机号注册用户。
     *
     * @param $mobile
     * @param $source
     * @return int
     */
    protected function createUserByMobile($mobile, $source)
    {
        $userMobile = new UserMobile();

        $userMobile->mobile = $mobile;

        $user = new User();

        $user->mobile = $mobile;
        $user->source = $source;
        $user->head_url = '';
        $user->nick_name = '匿名用户';
        $user->openid = '';
        $user->kol = 0;
        $user->gender = 0;
        $user->interest = '';
        $user->profession = '';
        $user->birthday = '';
        $user->area = '';
        $user->status = true;

        DB::beginTransaction();

        try {
            $userMobile->save();

            $user->save();

            DB::commit();

            return $user->id;
        } catch (Exception $e) {
            Log::error('save user exception,mobile:' . $mobile . ',exception:' . $e->getMessage());

            DB::rollBack();

            return 0;
        }
    }

    /**
     * 根据openid注册用户。
     *
     * @param $openid
     * @param $source
     * @param $headUrl
     * @param $nickName
     * @return int
     */
    protected function createUserByOpenid($openid, $source, $headUrl, $nickName)
    {
        $userOpenid = new UserOpenid();

        $userOpenid->openid = $openid;

        $user = new User();

        $user->mobile = '';
        $user->source = $source;
        $user->head_url = $headUrl;
        $user->nick_name = $nickName;
        $user->openid = $openid;
        $user->kol = 0;
        $user->gender = 0;
        $user->interest = '';
        $user->profession = '';
        $user->birthday = '';
        $user->area = '';
        $user->status = true;

        DB::beginTransaction();

        try {
            $userOpenid->save();

            $user->save();

            DB::commit();

            return $user->id;
        } catch (Exception $e) {
            Log::error('save user exception,openid:' . $openid . ',exception:' . $e->getMessage());

            DB::rollBack();

            return 0;
        }
    }
}
