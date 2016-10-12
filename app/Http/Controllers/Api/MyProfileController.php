<?php

namespace App\Http\Controllers\Api;

use App\Services\CommonService;
use App\Services\CookieService;
use App\Services\ImgService;
use App\Services\PointService;
use App\Services\RegService;
use App\Services\SessionService;
use App\Services\VendorService;
use App\Traits\AcxiomBehaviorTrait;
use App\Traits\AcxiomUserTrait;
use App\Traits\PointTrait;
use App\Traits\UserNoteTrait;
use App\Traits\UserTopicTrait;
use App\Traits\UserTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Session;

class MyProfileController extends Controller
{
    use UserTrait, AcxiomUserTrait, PointTrait, AcxiomBehaviorTrait, UserTopicTrait, UserNoteTrait;

    /**
     * 用户登陆的id。
     *
     * @var int
     */
    private $id;

    /**
     * UserController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        $this->id = SessionService::getUser();

        CommonService::setCrossDomain();
    }

    /**
     * 绑定手机号接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function mobile(Request $request)
    {
        $mobile = trim($request->input('mobile'));

        if (RegService::verifyMobile($mobile)) {
            return response()->json(['result' => -1]);
        }

        $captcha = trim($request->input('captcha'));

        if (mb_strlen($captcha) == 0) {
            return response()->json(['result' => -1]);
        }

        $myCaptcha = trim(session('captcha'));

        if (mb_strlen($myCaptcha) == 0) {
            return response()->json(['result' => -1]);
        }

        if (strcasecmp($mobile . $captcha, $myCaptcha) != 0) {
            return response()->json(['result' => 2]);
        }

        Session::forget('captcha');

        $checkStatus = $this->checkBindingUserByMobile($this->id, $mobile);

        if ($checkStatus['status'] > 2) {
            return response()->json(['result' => $checkStatus['status']]);
        } elseif ($checkStatus['status'] == 2) { //比较积分。
            if ($this->compareUsersPoint($this->id, $checkStatus['user_check']->id)) {//绑定当前账号。
                $result = $this->mergeUserByMobile($checkStatus['user'], $checkStatus['user_check'], $mobile);
            } else {
                SessionService::setMergeUser($checkStatus['user_check']->id);

                SessionService::setMergeMobile($mobile);

                return response()->json(['result' => 5]);//提示用户需要merge哪一个账号。
            }
        } else {
            $result = $this->bindingUserByMobile($checkStatus['user'], $mobile);
        }

        if ($result == 1) {//绑定成功。
            CookieService::userBindingMobile();

            $status = $this->addUpdateUserBindingPoint($this->id);

            $this->behaviorDataUserMsg($this->id, $status == 1, PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID);

            $this->sendUserDataToAcxiom([
                VendorService::THIRD_PARTY_ID => $this->id,
                VendorService::MOBILE => $mobile,
            ]);//发送数据到安客臣。


        }

        return response()->json(['result' => $result]);
    }

    /**
     * 需要merge的绑定手机号接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function mergeMobile(Request $request)
    {
        $mergeType = trim($request->input('merge_type'));

        if (RegService::verifyUserMerge($mergeType)) {
            return response()->json(['result' => -1]);
        }

        $mergeUserId = SessionService::getMergeUser();

        if ($mergeUserId < 1) {
            return response()->json(['result' => -1]);
        }

        $mobile = SessionService::getMergeMobile();

        if (mb_strlen($mobile) == 0) {
            return response()->json(['result' => -1]);
        }

        Session::forget(SessionService::MERGE_USER_ID);

        Session::forget(SessionService::MERGE_MOBILE);

        $type = intval($mergeType);

        if ($type == 1) {//使用高积分账号绑定。
            $result = $this->mergeHighPointsUserByMobile($mergeUserId, $this->id);

            if ($result['result'] == 1) {//绑定成功。
                SessionService::setUser($mergeUserId);

                CookieService::userLogin($result['head_url'], 1, 1);

                $status = $this->addUpdateUserBindingPoint($mergeUserId);

                $this->behaviorDataUserMsg($mergeUserId, $status == 1, PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID);

                $this->sendUserDataToAcxiom([
                    VendorService::THIRD_PARTY_ID => $mergeUserId,
                    VendorService::OPEN_ID => $result['openid'],
                ]);//发送数据到安客臣。
            }

            return response()->json(['result' => $result['result']]);
        } else {
            $result = $this->mergeCurrentUserByMobile($this->id, $mergeUserId, $mobile);

            if ($result == 1) {//绑定成功。
                CookieService::userBindingMobile();

                $status = $this->addUpdateUserBindingPoint($this->id);

                $this->behaviorDataUserMsg($this->id, $status == 1, PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID);

                $this->sendUserDataToAcxiom([
                    VendorService::THIRD_PARTY_ID => $this->id,
                    VendorService::MOBILE => $mobile,
                ]);//发送数据到安客臣。
            }

            return response()->json(['result' => $result]);
        }
    }

    /**
     * 绑定openid接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function wechat(Request $request)
    {
        $openid = trim($request->input('openid'));

        if (mb_strlen($openid) == 0 || mb_strlen($openid) > 100) {
            return response()->json(['result' => -1]);
        }

        $nickName = trim($request->input('nick_name'));

        if (mb_strlen($nickName) > 100) {
            return response()->json(['result' => -1]);
        }

        $headUrl = trim($request->input('head_url'));

        if (mb_strlen($headUrl) > 200) {
            return response()->json(['result' => -1]);
        }

        $checkStatus = $this->checkBindingUserByOpenid($this->id, $openid);

        if ($checkStatus['status'] > 2) {
            return response()->json(['result' => $checkStatus['status']]);
        } elseif ($checkStatus['status'] == 2) { //比较积分。
            if ($this->compareUsersPoint($this->id, $checkStatus['user_check']->id)) {//绑定当前账号。
                $result = $this->mergeUserByOpenid($checkStatus['user'], $checkStatus['user_check'], $openid);
            } else {
                SessionService::setMergeUser($checkStatus['user_check']->id);

                SessionService::setMergeOpenid($openid);

                return response()->json(['result' => 5]);//提示用户需要merge哪一个账号。
            }
        } else {
            $result = $this->bindingUserByOpenid($checkStatus['user'], $openid, $nickName, $headUrl);
        }

        if ($result == 1) {//绑定成功。
            CookieService::userBindingWechat();

            $status = $this->addUpdateUserBindingPoint($this->id);

            $this->behaviorDataUserMsg($this->id, $status == 1, PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID);

            $this->sendUserDataToAcxiom([
                VendorService::THIRD_PARTY_ID => $this->id,
                VendorService::OPEN_ID => $openid,
            ]);//发送数据到安客臣。
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 需要merge的绑定openid接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function mergeWechat(Request $request)
    {
        $mergeType = trim($request->input('merge_type'));

        if (RegService::verifyUserMerge($mergeType)) {
            return response()->json(['result' => -1]);
        }

        $mergeUserId = SessionService::getMergeUser();

        if ($mergeUserId < 1) {
            return response()->json(['result' => -1]);
        }

        $openid = SessionService::getMergeOpenid();

        if (mb_strlen($openid) == 0) {
            return response()->json(['result' => -1]);
        }

        Session::forget(SessionService::MERGE_USER_ID);

        Session::forget(SessionService::MERGE_OPENID);

        $type = intval($mergeType);

        if ($type == 1) {//使用高积分账号绑定。
            $result = $this->mergeHighPointsUserByOpenid($mergeUserId, $this->id);

            if ($result['result'] == 1) {//绑定成功。
                SessionService::setUser($mergeUserId);

                CookieService::userLogin($result['head_url'], 1, 1);

                $status = $this->addUpdateUserBindingPoint($mergeUserId);

                $this->behaviorDataUserMsg($mergeUserId, $status == 1, PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID);

                $this->sendUserDataToAcxiom([
                    VendorService::THIRD_PARTY_ID => $mergeUserId,
                    VendorService::MOBILE => $result['mobile'],
                ]);//发送数据到安客臣。
            }

            return response()->json(['result' => $result['result']]);
        } else {
            $result = $this->mergeCurrentUserByOpenid($this->id, $mergeUserId, $openid);

            if ($result == 1) {//绑定成功。
                CookieService::userBindingWechat();

                $status = $this->addUpdateUserBindingPoint($this->id);

                $this->behaviorDataUserMsg($this->id, $status == 1, PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID);

                $this->sendUserDataToAcxiom([
                    VendorService::THIRD_PARTY_ID => $this->id,
                    VendorService::OPEN_ID => $openid,
                ]);//发送数据到安客臣。
            }

            return response()->json(['result' => $result]);
        }
    }

    /**
     * 获取个人中心信息接口。
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function basic()
    {
        $user = $this->getUserById($this->id, ['nick_name']);

        $topicStatus = 0;

        $userTopic = $this->getUserTopic($this->id);

        if (!is_null($userTopic) && strtotime($userTopic->changed_at) > strtotime($userTopic->accessed_at)) {
            $topicStatus = 1;
        }

        $noteStatus = 0;

        $userNote = $this->getUserNote($this->id);

        if (!is_null($userNote) && strtotime($userNote->changed_at) > strtotime($userNote->accessed_at)) {
            $noteStatus = 1;
        }

        $basic = [
            'result' => 1,
            'nick_name' => e($user->nick_name),
            'topic_status' => $topicStatus,
            'note_status' => $noteStatus,
        ];

        return response()->json(array_merge($basic,
            $this->getPointAndLevelByUserId($this->id)), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 获取当前用户话题和笔记的状态
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function noteAndTopicStatus()
    {
        $topicStatus = 0;

        $userTopic = $this->getUserTopic($this->id);

        if (!is_null($userTopic) && strtotime($userTopic->changed_at) > strtotime($userTopic->accessed_at)) {
            $topicStatus = 1;
        }

        $noteStatus = 0;

        $userNote = $this->getUserNote($this->id);

        if (!is_null($userNote) && strtotime($userNote->changed_at) > strtotime($userNote->accessed_at)) {
            $noteStatus = 1;
        }

        return response()->json(['result' => 1,'status' => ($topicStatus || $noteStatus) ? 1 : 0]);
    }

    /**
     * 获取个人基本信息接口。
     *
     * @return \Illuminate\Http\Response
     */
    public function detail()
    {
        $userInfo = $this->getUserById($this->id, [
            'openid',
            'mobile',
            'nick_name',
            'area',
            'gender',
            'birthday',
            'interest',
            'profession',
        ]);

        return response()->json([
            'result' => 1,
            'data' => [
                'nick_name' => e($userInfo->nick_name),
                'binding_mobile_status' => mb_strlen($userInfo->mobile) > 0 ? 1 : 0,
                'binding_wechat_status' => mb_strlen($userInfo->openid) > 0 ? 1 : 0,
                'mobile' => $userInfo->mobile,
                'area' => e($userInfo->area),
                'gender' => $userInfo->gender,
                'birthday' => $userInfo->birthday,
                'interest' => e($userInfo->interest),
                'profession' => e($userInfo->profession),
            ],
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 更新个人基本信息接口。
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $nickName = trim($request->input('nick_name'));

        if (mb_strlen($nickName) == 0 || mb_strlen($nickName) > 100) {
            return response()->json(['result' => -1]);
        }

        $area = trim($request->input('area'));

        if (mb_strlen($area) == 0 || mb_strlen($area) > 20) {
            return response()->json(['result' => -1]);
        }

        $interest = trim($request->input('interest'));

        if (mb_strlen($interest) == 0 || mb_strlen($interest) > 200) {
            return response()->json(['result' => -1]);
        }

//        if (RegService::verifyInterest($interest)) {
//            return response()->json(['result' => -1]);
//        }

        $profession = trim($request->input('profession'));

        if (mb_strlen($profession) == 0 || mb_strlen($profession) > 100) {
            return response()->json(['result' => -1]);
        }

//        if (RegService::verifyJobTitle($profession)) {
//            return response()->json(['result' => -1]);
//        }

        $gender = intval(trim($request->input('gender')));

        if (RegService::verifyGender($gender)) {
            return response()->json(['result' => -1]);
        }

        $birthday = trim($request->input('birthday'));

        if (mb_strlen($birthday) == 0 || (mb_strlen($birthday) > 0 && !CommonService::isDate($birthday))) {
            return response()->json(['result' => -1]);
        }

        $result = $this->updateUser($this->id,
            $nickName,
            $area,
            $interest,
            $profession,
            $gender,
            $birthday);

        if ($result == 1) {//更新成功。
            $status = $this->addUpdateUserInfoPoint($this->id);

            //发送data collection数据到安客臣。
            $this->sendUserDataToAcxiom([
                VendorService::THIRD_PARTY_ID => $this->id,
                VendorService::USER_NAME => $nickName,
                VendorService::CITY => $area,
                VendorService::GENDER => $gender == 0 ? 'M' : 'F',
                VendorService::BIRTHDAY => date('Ymd', strtotime($birthday)),
//                VendorService::JOB_TITLE => $profession,
//                VendorService::INTEREST => $interest,
            ]);

            //发送完善用户信息的行为数据到安客臣。
            $this->behaviorDataUserMsg($this->id, $status == 1, PointService::UPDATE_USER_INFO_TYPE_ID);
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 更换头像接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeHeadUrl(Request $request)
    {
        $data = trim($request->input('head_url'));

        if (mb_strlen($data) == 0) {
            return response()->json(['result' => -1]);
        }

        $checkImg = ImgService::checkBase64Img($data);

        if ($checkImg['result'] == 0) {
            return response()->json(['result' => -1]);
        }

        $file = 'uploads/headimgs/' . $this->id . $checkImg['img_suffix'];

        $result = ImgService::upload(public_path($file), $checkImg['img_data']);

        $myHeadUrl = '/' . $file;

        $myResult = 0;

        if (!$result) {
            if ($this->updateUserHeadUrl($this->id, $myHeadUrl) == 1) {
                $myResult = 1;

                CookieService::userHeadUrl($myHeadUrl);

                $status = $this->addUpdateUserHeadUrlPoint($this->id);

                $this->behaviorDataUserMsg($this->id, $status == 1, PointService::UPDATE_HEAD_URL_TYPE_ID);
            }


        }


        return response()->json(['result' => $myResult]);
    }
}
