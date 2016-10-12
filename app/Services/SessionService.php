<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-12
 * Time: 10:36
 */

namespace App\Services;

class SessionService
{
    const USER_ID = 'user_id';

    const MERGE_USER_ID = 'merge_user_id';

    const MERGE_MOBILE = 'merge_mobile';

    const MERGE_OPENID = 'merge_openid';

    /**
     * 登陆后设置用户id的session。
     *
     * @param $userId
     */
    public static function setUser($userId){
        session([self::USER_ID => $userId]);
    }

    /**
     * 获取登陆用户的id。
     *
     * @return int
     */
    public static function getUser()
    {
        return intval(session(self::USER_ID));
    }

    /**
     * 设置需要merge用户的id。
     *
     * @param $userId
     */
    public static function setMergeUser($userId){
        session([self::MERGE_USER_ID => $userId]);
    }

    /**
     * 获取需要merge用户的id。
     *
     * @return int
     */
    public static function getMergeUser()
    {
        return intval(session(self::MERGE_USER_ID));
    }

    /**
     * 设置需要merge的手机号。
     *
     * @param $mobile
     */
    public static function setMergeMobile($mobile){
        session([self::MERGE_MOBILE => $mobile]);
    }

    /**
     * 设置需要merge的手机号。
     *
     * @return string
     */
    public static function getMergeMobile()
    {
        return strval(session(self::MERGE_MOBILE));
    }

    /**
     * 设置需要merge的openid。
     *
     * @param $openid
     */
    public static function setMergeOpenid($openid){
        session([self::MERGE_OPENID => $openid]);
    }

    /**
     * 设置需要merge的openid。
     *
     * @return string
     */
    public static function getMergeOpenid()
    {
        return strval(session(self::MERGE_OPENID));
    }
}
