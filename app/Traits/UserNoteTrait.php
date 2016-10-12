<?php
/**
 * Created by PhpStorm.
 * User: xinhuang1
 * Date: 2016-07-29
 * Time: 18:21
 */

namespace App\Traits;

use App\Models\UserNote;
use App\Services\CommonService;
use Exception;
use Log;

trait UserNoteTrait
{
    /**
     *  根据用户id获取note更新和访问时间。
     *
     * @param $userId
     * @return mixed|static
     */
    protected function getUserNote($userId)
    {
        return UserNote::whereUserId($userId)->first(['accessed_at', 'changed_at']);
    }

    /**
     * 记录用户访问或用户note数据更新。
     *
     * @param $userId
     * @param $type
     */
    protected function updateUserNote($userId, $type)
    {
        $userTopic = UserNote::whereUserId($userId)->first(['user_id']);

        $defaultTime = '2016-02-01 13:11:12';
        $currentTime = date('Y-m-d H:i:s');

        if (is_null($userTopic)) {//创建新的
            $userTopic = new UserNote();

            $userTopic->user_id = $userId;

            if ($type == CommonService::USER_TOPIC_ACCESS) {
                $userTopic->accessed_at = $currentTime;
                $userTopic->changed_at = $defaultTime;
            } else {
                $userTopic->accessed_at = $defaultTime;
                $userTopic->changed_at = $currentTime;
            }
        } else {
            if ($type == CommonService::USER_TOPIC_ACCESS) {
                $userTopic->accessed_at = $currentTime;
            } else {
                $userTopic->changed_at = $currentTime;
            }
        }

        try {
            $userTopic->save();
        } catch (Exception $e) {
            Log::error('add or update user note exception,user_id:' . $userId .
                ',type:' . $type . ',exception:' . $e->getMessage());
        }
    }
}
