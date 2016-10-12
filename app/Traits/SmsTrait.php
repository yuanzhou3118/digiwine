<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-08
 * Time: 10:19
 */

namespace App\Traits;

use App\Services\VendorService;
use Log;

trait SmsTrait
{
//    /**
//     * 发送bechtech的短信。
//     *
//     * @param $mobile
//     * @param $captcha
//     * @return int
//     */
//    protected function sendBechtechSms($mobile, $captcha)
//    {
//        $response = Curl::to('http://sms.bechtech.cn/Api/send/data/json?accesskey=4179' .
//            '&secretkey=7274d1014892218130b2ff1b24aa6606b2a2ad8b&mobile=' . $mobile .
//            '&content=' . urlencode('验证码为：' . $captcha . '。如非本人操作，请勿予理会。【保乐力加】'))
//            ->asJsonResponse(true)
//            ->withTimeout(60)
//            ->get();
//
//        if (!is_array($response) || !array_key_exists('result', $response) || $response['result'] != '01') {
//            Log::error('send bechtech sms fail,mobile:' . $mobile);
//
//            return 0;
//        }
//
//        return 1;
//    }

    /**
     * 发送acxiom的短信。
     *
     * @param $mobile
     * @param $captcha
     * @return int
     */
    protected function sendAcxiomSms($mobile, $captcha)
    {
        $cellphone = $mobile;

        $smsContent = '验证码为：' . $captcha . '。如非本人操作，请勿予理会。';

        $response = VendorService::callAcxiomApi(VendorService::getMobileUrl(), compact('cellphone', 'smsContent'));

        if (!is_array($response) || !array_key_exists('RETURN_CODE', $response) || $response['RETURN_CODE'] != '000') {
            Log::error('send acxiom sms fail,mobile:' . $mobile);

            return 0;
        }

        return 1;
    }
}
