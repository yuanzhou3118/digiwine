<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-11
 * Time: 16:45
 */

namespace App\Services;

/**
 * 积分常量设置。
 *
 * @package App\Services
 */
class PointService
{
    const NO_POINT = 0;

    /**
     * 注册获得积分数。
     */
    const REGISTER = 500;

    /**
     * 注册的积分类型。
     */
    const REGISTER_TYPE_ID = 5;

    /**
     * 完善个人信息获得积分数。
     */
    const UPDATE_USER_INFO = 200;

    /**
     * 完善个人信息的积分类型。
     */
    const UPDATE_USER_INFO_TYPE_ID = 6;

    /**
     * 绑定手机号或微信获得积分数。
     */
    const BINDING_MOBILE_OR_WECHAT = 200;

    /**
     * 绑定手机号或微信的积分类型。
     */
    const BINDING_MOBILE_OR_WECHAT_TYPE_ID = 7;

    /**
     * 更新头像获得积分数。
     */
    const UPDATE_HEAD_URL = 100;

    /**
     * 更新头像的积分类型。
     */
    const UPDATE_HEAD_URL_TYPE_ID = 11;

    /**
     * 默认获取积分最大次数。
     */
    const COMMON_COUNT_LIMIT = 1;

    /**
     * 默认类型ID。
     */
    const COMMON_TYPE_ID = 0;

    /**
     * 默认排序ID。
     */
    const COMMON_SORT = 0;

    /**
     * 看课程视频获得积分数。
     */
    const LESSON_VIDEO = 30;

    /**
     * 看课程视频的积分类型。
     */
    const LESSON_VIDEO_TYPE_ID = 2;

    /**
     * 回答课程问题获得的积分数。
     */
    const LESSON_ANSWER = 30;

    /**
     * 回答课程问题的积分类型。
     */
    const LESSON_ANSWER_TYPE_ID = 1;

    /**
     * 回答课程问题获得积分的最大次数。
     */
    const LESSON_ANSWER_COUNT_LIMIT = 25;

    /**
     * 评论课程获得的积分数。
     */
    const LESSON_REVIEW = 5;

    /**
     * 评论课程的积分类型。
     */
    const LESSON_REVIEW_TYPE_ID = 3;

    /**
     * 每天评论课程获得积分的最大次数。
     */
    const LESSON_REVIEW_COUNT_LIMIT = 2;

    /**
     * 分享获得的积分数。
     */
    const SHARE = 5;

    /**
     * 分享的积分类型。
     */
    const SHARE_TYPE_ID = 4;

    /**
     * 每天分享获得积分的最大次数。
     */
    const SHARE_COUNT_LIMIT = 2;

    /**
     * 创建话题获得的积分数。
     */
    const CREATE_TOPIC = 5;

    /**
     * 创建话题的积分类型。
     */
    const CREATE_TOPIC_TYPE_ID = 8;

    /**
     * 每天创建话题获得积分的最大次数。
     */
    const CREATE_TOPIC_COUNT_LIMIT = 2;

    /**
     * 回复话题获得的积分数。
     */
    const TOPIC_ANSWER = 5;

    /**
     * 回复话题的积分类型。
     */
    const TOPIC_ANSWER_TYPE_ID = 9;

    /**
     * 每天回复话题获得积分的最大次数。
     */
    const TOPIC_ANSWER_COUNT_LIMIT = 2;

    /**
     * 创建笔记获取的积分数。
     */
    const NOTE = 20;

    /**
     * 创建笔记的积分类型。
     */
    const NOTE_TYPE_ID = 10;

    /**
     * 每天创建笔记获得积分的最大次数。
     */
    const NOTE_COUNT_LIMIT = 1;

    /**
     * 获取积分等级。
     *
     * @param $points
     * @return int
     */
    public static function getLevel($points)
    {
        if ($points < 1000) {
            return 1;
        } elseif ($points < 5000) {
            return 2;
        } elseif ($points < 10000) {
            return 3;
        } else {
            return 4;
        }
    }

    /**
     * 获取积分的显示信息。
     *
     * @param $scoreType
     * @return string
     */
    public static function getContent($scoreType)
    {
        switch ($scoreType) {
            case self::REGISTER_TYPE_ID:
                return '完成注册';
            case self::UPDATE_USER_INFO_TYPE_ID:
                return '完善所有个人资料';
            case self::UPDATE_HEAD_URL_TYPE_ID:
                return '更新一次头像';
            case self::BINDING_MOBILE_OR_WECHAT_TYPE_ID:
                return '绑定手机或微信';
            case self::NOTE_TYPE_ID:
                return '新增一篇品酒笔记';
            case self::CREATE_TOPIC_TYPE_ID:
                return '提出一个圆桌问题';
            case self::TOPIC_ANSWER_TYPE_ID:
                return '解决一个圆桌问题';
            case self::SHARE_TYPE_ID:
                return '分享一次';
            case self::LESSON_ANSWER_TYPE_ID:
                return '完成一次随堂测验';
            case self::LESSON_REVIEW_TYPE_ID:
                return '发表一次评论';
            case self::LESSON_VIDEO_TYPE_ID:
                return '观看一课视频';
            default:
                return '';
        }
    }
}
