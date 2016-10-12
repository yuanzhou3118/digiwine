<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-08
 * Time: 15:53
 */

namespace App\Services;

class CommonService
{
    /**
     * 返回json的头信息。
     */
    const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

    /**
     * 默认每页条数。
     */
    const PAGE_DEFAULT_SIZE = 5;

    /**
     * 默认头像url。
     */
    const DIGIWINE_HEAD_URL = '/images/other/user-head.jpg';

    const USER_TOPIC_ACCESS = 1;

    const USER_TOPIC_CHANGE = 2;

    const USER_NOTE_ACCESS = 1;

    const USER_NOTE_CHANGE = 2;

    /**
     * 获取日期的时间戳。
     *
     * @param null $date
     * @return int
     */
    public static function getDay($date = null)
    {
        if (!is_null($date)) {
            return strtotime(date('Y-m-d', strtotime($date)));
        }

        return strtotime(date('Y-m-d'));
    }

    /**
     * 获取用户头像url。
     *
     * @param $headUrl
     * @return string
     */
    public static function getHeadUrl($headUrl)
    {
        return mb_strlen($headUrl) > 0 ? $headUrl : self::DIGIWINE_HEAD_URL;
    }

    /**
     * 验证是否是正式环境。
     *
     * @return bool
     */
    public static function checkEnv()
    {
        return strcasecmp(app()->environment(), 'production') == 0;
    }

    /**
     * 验证是否是日期格式字符串。
     *
     * @param $date
     * @return bool
     */
    public static function isDate($date)
    {
        return strtotime(date('Y-m-d', strtotime($date))) === strtotime($date);
    }

    /**
     * 设置允许跨域。
     */
    public static function setCrossDomain()
    {
        if(!static::checkEnv()){
            header('Access-Control-Allow-Origin: http://test100.nurunci.com');

            header('Access-Control-Allow-Credentials: true');

            header('P3P: CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"');
        }
    }
}