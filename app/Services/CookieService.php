<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-08
 * Time: 17:22
 */

namespace App\Services;

class CookieService
{
    /**
     * cookie默认的过期时间。
     */
    const COOKIE_EXPIRE = 60 * 60 * 2;

    /**
     * 用户头像的cookie名称。
     */
    const COOKIE_DIGIWINE_HEAD_URL = 'digiwine_avatarurl';

    /**
     * 用户登陆状态的cookie名称。
     */
    const COOKIE_DIGIWINE_LOGIN = 'digiwine_login';

    /**
     * 用户是否绑定mobile的cookie名称。
     */
    const COOKIE_DIGIWINE_MOBILE = 'digiwine_mobile';

    /**
     * 用户是否绑定wechat的cookie名称。
     */
    const COOKIE_DIGIWINE_WECHAT = 'digiwine_wechat';

    /**
     * @return null|string
     */
    public static function setDomain()
    {
        return strcasecmp(app()->environment(),  'production') != 0 ? '.nurunci.com' : null;
    }

    /**
     * 添加cookie。
     *
     * @param $name
     * @param $value
     */
    public static function addCookie($name, $value)
    {
        setcookie($name, urlencode($value), time() + self::COOKIE_EXPIRE, '/', static::setDomain());
    }

    /**
     * 删除cookie。
     *
     * @param $name
     */
    public static function delCookie($name)
    {
        setcookie($name, null, time() - self::COOKIE_EXPIRE, '/', static::setDomain());
    }

    /**
     * 添加登陆后的cookie。
     *
     * @param $headUrl
     * @param $hasMobile
     * @param $hasWechat
     */
    public static function userLogin($headUrl, $hasMobile, $hasWechat)
    {
        static::addCookie(self::COOKIE_DIGIWINE_LOGIN, 1);

        static::addCookie(self::COOKIE_DIGIWINE_HEAD_URL, CommonService::getHeadUrl($headUrl));

        static::addCookie(self::COOKIE_DIGIWINE_MOBILE, $hasMobile);

        static::addCookie(self::COOKIE_DIGIWINE_WECHAT, $hasWechat);
    }

    /**
     * 退出登陆时删除cookie。
     */
    public static function userLogout()
    {
        static::delCookie(self::COOKIE_DIGIWINE_LOGIN);

        static::delCookie(self::COOKIE_DIGIWINE_HEAD_URL);

        static::delCookie(self::COOKIE_DIGIWINE_MOBILE);

        static::delCookie(self::COOKIE_DIGIWINE_WECHAT);
    }

    /**
     * 更新用户头像的cookie。
     *
     * @param $headUrl
     */
    public static function userHeadUrl($headUrl)
    {
        static::addCookie(self::COOKIE_DIGIWINE_HEAD_URL, CommonService::getHeadUrl($headUrl));
    }

    /**
     * 更新用户绑定手机号的cookie。
     */
    public static function userBindingMobile()
    {
        static::addCookie(self::COOKIE_DIGIWINE_MOBILE, 1);
    }

    /**
     * 更新用户绑定微信的cookie。
     */
    public static function userBindingWechat()
    {
        static::addCookie(self::COOKIE_DIGIWINE_WECHAT, 1);
    }
}
