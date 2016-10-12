<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-13
 * Time: 18:42
 */

namespace App\Traits;

use App\Services\PointService;
use App\Services\VendorService;
use Log;

trait AcxiomBehaviorTrait
{
    /**
     * 发送用户的行为数据到安客臣。
     *
     * @param $userId
     * @param $hasPoint
     * @param $type
     * @param string $timestamp
     */
    protected function behaviorDataUser($userId, $hasPoint, $type, $timestamp = '')
    {
        $behaviorCode = '';
        $scoreValue = PointService::NO_POINT;
        $action = '';

        switch ($type) {
            case PointService::REGISTER:
                $action = 'register';

                $behaviorCode = 'bhv_JC_001';

                $scoreValue = PointService::REGISTER;

                break;
//            case  PointService::UPDATE_USER_INFO:
//                $action = 'info';
//
//                $behaviorCode = 'bhv_JC_002';
//
//                if ($hasPoint) {
//                    $scoreValue = PointService::UPDATE_USER_INFO;
//                }
//
//                break;
            case  PointService::SHARE_TYPE_ID:
                $action = 'share';

                $behaviorCode = 'bhv_JC_007';

                if ($hasPoint) {
                    $scoreValue = PointService::SHARE;
                }

                break;
            case  PointService::CREATE_TOPIC_TYPE_ID:
                $action = 'create topic';

                $behaviorCode = 'bhv_JC_004';

                if ($hasPoint) {
                    $scoreValue = PointService::CREATE_TOPIC;
                }

                break;
            case  PointService::TOPIC_ANSWER_COUNT_LIMIT:
                $action = 'topic comment';

                $behaviorCode = 'bhv_JC_005';

                if ($hasPoint) {
                    $scoreValue = PointService::TOPIC_ANSWER;
                }

                break;
            default:
                break;
        }

        $data = [
            'credentialID' => $userId,
            'behavior_code' => $behaviorCode,
            'behavior_content' => [
                'score_value' => $scoreValue,
            ],
        ];

        $response = VendorService::callAcxiomBehaviorApi($data, $timestamp);

        if (!is_array($response) || !array_key_exists('RETURN_CODE', $response) || $response['RETURN_CODE'] != '000') {
            Log::error('send acxiom user ' . $action . ' Behavior Data fail,user_id:' . $userId);
        }
    }

    /**
     * 发送创建笔记的行为数据到安客臣。
     *
     * @param $userId
     * @param $hasPoint
     * @param $timestamp
     * @param $wineName
     */
    protected function behaviorDataNote($userId, $hasPoint, $timestamp, $wineName)
    {
        $data = [
            'credentialID' => $userId,
            'behavior_code' => 'bhv_JC_006',
            'behavior_content' => [
                'taste_note' => $wineName,
                'score_value' => $hasPoint ? PointService::NOTE : PointService::NO_POINT,
            ],
        ];

        $response = VendorService::callAcxiomBehaviorApi($data, $timestamp);

        if (!is_array($response) || !array_key_exists('RETURN_CODE', $response) || $response['RETURN_CODE'] != '000') {
            Log::error('send acxiom note Behavior Data fail,user_id:' . $userId);
        }
    }

    /**
     * 提交课程相关行为数据到安客臣。
     *
     * @param $userId
     * @param $lessonId
     * @param $hasPoint
     * @param $type
     */
    protected function behaviorDataLesson($userId, $lessonId, $hasPoint, $type)
    {
        $scoreType = '';
        $scoreValue = PointService::NO_POINT;

        switch ($type) {
            case PointService::LESSON_ANSWER_TYPE_ID:
                $scoreType = 'answer';

                if ($hasPoint) {
                    $scoreValue = PointService::LESSON_ANSWER;
                }

                break;
            case PointService::LESSON_REVIEW_TYPE_ID:
                $scoreType = 'comment';

                if ($hasPoint) {
                    $scoreValue = PointService::LESSON_REVIEW;
                }

                break;
            case PointService::LESSON_VIDEO_TYPE_ID:
                $scoreType = ' video';

                if ($hasPoint) {
                    $scoreValue = PointService::LESSON_VIDEO;
                }

                break;
            default:
                break;
        }

        $data = [
            'credentialID' => $userId,
            'behavior_code' => 'bhv_JC_003',
            'behavior_content' => [
                'lesson_id' => $lessonId,
                'score_type' => $scoreType,
                'score_value' => $scoreValue,
            ],
        ];

        $response = VendorService::callAcxiomBehaviorApi($data);

        if (!is_array($response) || !array_key_exists('RETURN_CODE', $response) || $response['RETURN_CODE'] != '000') {
            Log::error('send acxiom Lesson ' . $scoreType . ' Behavior Data fail,user_id:' . $userId .
                ',lesson_id:' . $lessonId);
        }
    }

    /**
     * 提交用户更新个人信息的相关行为数据到安客臣。
     *
     * @param $userId
     * @param $hasPoint
     * @param $type
     * @param string $timestamp
     */
    protected function behaviorDataUserMsg($userId, $hasPoint, $type, $timestamp = '')
    {
        $scoreType = '';
        $scoreValue = PointService::NO_POINT;

        switch ($type) {
            case PointService::UPDATE_HEAD_URL_TYPE_ID:
                $scoreType = 'upload photo';

                if ($hasPoint) {
                    $scoreValue = PointService::UPDATE_HEAD_URL;
                }

                break;
            case PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID:
                $scoreType = 'binding';

                if ($hasPoint) {
                    $scoreValue = PointService::BINDING_MOBILE_OR_WECHAT;
                }

                break;
            case PointService::UPDATE_USER_INFO_TYPE_ID:
                $scoreType = 'add other info';

                if ($hasPoint) {
                    $scoreValue = PointService::UPDATE_USER_INFO;
                }

                break;
            default:
                break;
        }

        $data = [
            'credentialID' => $userId,
            'behavior_code' => 'bhv_JC_002',
            'behavior_content' => [
                'score_type' => $scoreType,
                'score_value' => $scoreValue,
            ],
        ];

        $response = VendorService::callAcxiomBehaviorApi($data, $timestamp);

        if (!is_array($response) || !array_key_exists('RETURN_CODE', $response) || $response['RETURN_CODE'] != '000') {
            Log::error('send acxiom user score_type ' . $scoreType . ' Behavior Data fail,user_id:' . $userId);
        }
    }
}
