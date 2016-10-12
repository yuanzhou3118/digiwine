<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-08
 * Time: 10:21
 */

namespace App\Services;

use Curl;
use Log;

/**
 * 存放安客臣相关的配置数据。
 *
 * @package App\Services
 */
class VendorService
{
    /**
     * 短信验证码的url。
     */
    const MOBILE_URL = 'https://{0}.acxiom.com.cn/PRC/rest/customer/sendSMS';

    /**
     * 短信的source_name。
     */
    const SOURCE_NAME = 'fd7799e236fe2d0d2e2dd320c6c64541';

    /**
     * 签名的code。
     */
    const SOURCE_SIGN_CODE = 'JCSBWS';

    /**
     * 测试环境的host前缀。
     */
    const HOST_DEV_PREFIX = 'uat01';

    /**
     * 正式环境的host前缀。
     */
    const HOST_PRODUCTION_PREFIX = 'prcws';

    /**
     * 提交用户数据的url。
     */
    const USER_POST_URL = 'https://{0}.acxiom.com.cn/PRC/rest/customer/dataCollect';

    /**
     * 提交行为数据的url。
     */
    const BEHAVIOR_POST_URL = 'https://{0}.acxiom.com.cn/PRC/rest/customer/BehaviorCollect';

    const THIRD_PARTY_ID = 'thirdPartyID';

    const OPEN_ID = 'openId';

    const MOBILE = 'cellphone';

    const USER_NAME = 'username';

    const GENDER = 'gender';

    const CITY = 'city';

    const BIRTHDAY = 'birthday';

    const JOB_TITLE = 'jobTitle';

    const INTEREST = 'preferredLeisure';

    /**
     * 调用安客臣相关api。
     *
     * @param $url
     * @param $data
     * @return mixed
     */
    public static function callAcxiomApi($url, $data)
    {
        $ts = date('Y-m-d H:i:s.B');

        $sign = md5(md5(self::SOURCE_SIGN_CODE . $ts) . $ts);

        $source_name = self::SOURCE_NAME;

        Log::info('send data to acxiom,data:' . json_encode(array_merge(compact('ts', 'sign', 'source_name'), $data)));

        $result = Curl::to($url)
            ->withOption('SSL_VERIFYPEER', 0)
            ->withOption('SSL_VERIFYHOST', 0)
            ->withOption('SSL_CIPHER_LIST', 'TLSv1')
            ->withOption('HEADER', 0)
            ->withData(array_merge(compact('ts', 'sign', 'source_name'), $data))
            ->asJson(true)
            ->withTimeout(60)
            ->post();

        Log::info('get data from acxiom,data:' . json_encode($result, JSON_UNESCAPED_UNICODE));

        return $result;

        return Curl::to($url)
            ->withOption('SSL_VERIFYPEER', 0)
            ->withOption('SSL_VERIFYHOST', 0)
            ->withOption('SSL_CIPHER_LIST', 'TLSv1')
            ->withOption('HEADER', 0)
            ->withData(array_merge(compact('ts', 'sign', 'source_name'), $data))
            ->asJson(true)
            ->withTimeout(60)
            ->post();
    }

    /**
     * 调用安客臣行为数据api。
     *
     * @param $data
     * @param string $timestamp
     * @return mixed
     */
    public static function callAcxiomBehaviorApi($data, $timestamp = '')
    {
        $common = [
            'timestamp' => $timestamp == '' ? date('Y-m-d H:i:s.B') : $timestamp,
            'credential_type' => 'thirdPartyID',
        ];

        Log::info('send acxiom note Behavior Data fail,timestamp:' .  json_encode($common));

        return static::callAcxiomApi(static::getBehaviorUrl(), array_merge($data, $common));
    }

    /**
     * 获取发送短信的url。
     *
     * @return mixed
     */
    public static function getMobileUrl()
    {
        return str_replace('{0}', static::getAcxiomEnv(), self::MOBILE_URL);
    }

    /**
     * 获取提交用户数据的url。
     *
     * @return mixed
     */
    public static function getUserUrl()
    {
        return str_replace('{0}', static::getAcxiomEnv(), self::USER_POST_URL);
    }

    /**
     * 获取提交行为数据的url。
     *
     * @return mixed
     */
    public static function getBehaviorUrl()
    {
        return str_replace('{0}', static::getAcxiomEnv(), self::BEHAVIOR_POST_URL);
    }

    /**
     * 获取环境的url前缀。
     *
     * @return string
     */
    public static function getAcxiomEnv()
    {
        return CommonService::checkEnv() ? self::HOST_PRODUCTION_PREFIX : self::HOST_DEV_PREFIX;
    }
}
