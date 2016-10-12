<?php

namespace App\Http\Controllers\Api;

use App\Services\CommonService;
use App\Services\CookieService;
use App\Services\PointService;
use App\Services\SessionService;
use App\Services\VendorService;
use App\Traits\AcxiomBehaviorTrait;
use App\Traits\AcxiomUserTrait;
use App\Traits\PointTrait;
use App\Traits\SmsTrait;
use App\Traits\UserTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\RegService;
use Session;

class UserController extends Controller
{
    use SmsTrait, UserTrait, AcxiomUserTrait, PointTrait, AcxiomBehaviorTrait;

    /**
     * UserController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        CommonService::setCrossDomain();
    }

    /**
     * 手机登陆接口。
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

        $source = trim($request->input('$source'));

        if (mb_strlen($source) > 50) {
            return response()->json(['result' => -1]);
        }

        Session::forget('captcha');

        $user = $this->getUserByMobile($mobile, ['id', 'head_url', 'openid']);

        if (is_null($user)) {//注册。
            $registerStatus = $this->createUserByMobile($mobile, $source);

            if ($registerStatus > 0) {
                SessionService::setUser($registerStatus);

                $this->addRegisterPoint($registerStatus);//添加积分。

                $this->sendUserDataToAcxiom([
                    VendorService::THIRD_PARTY_ID => $registerStatus,
                    VendorService::MOBILE => $mobile,
                ]);//发送数据到安客臣。

                $this->behaviorDataUser($registerStatus, true, PointService::REGISTER);

                CookieService::userLogin('', 1, 0);

                return response()->json(['result' => 1]);
            }

            return response()->json(['result' => 0]);
        }

        SessionService::setUser($user->id);

        CookieService::userLogin($user->head_url, 1, mb_strlen($user->openid) > 0 ? 1 : 0);

        return response()->json(['result' => 1]);
    }

    /**
     * 微信登陆接口。
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

        if (mb_strlen($nickName) == 0) {
            $nickName = '匿名用户';
        }

        $headUrl = trim($request->input('head_url'));

        if (mb_strlen($headUrl) > 200) {
            return response()->json(['result' => -1]);
        }

        $source = trim($request->input('$source'));

        if (mb_strlen($source) > 50) {
            return response()->json(['result' => -1]);
        }

        $user = $this->getUserByOpenid($openid, ['id', 'head_url', 'mobile']);

        if (is_null($user)) {//注册。
            $registerStatus = $this->createUserByOpenid($openid, $source, $headUrl, $nickName);

            if ($registerStatus > 0) {
                SessionService::setUser($registerStatus);

                $this->addRegisterPoint($registerStatus);//添加积分。

                $this->sendUserDataToAcxiom([
                    VendorService::THIRD_PARTY_ID => $registerStatus,
                    VendorService::OPEN_ID => $openid,
                    VendorService::USER_NAME => $nickName,
                ]);//发送数据到安客臣。

                $this->behaviorDataUser($registerStatus, true, PointService::REGISTER);

                CookieService::userLogin($headUrl, 0, 1);

                return response()->json(['result' => 1]);
            }

            return response()->json(['result' => 0]);
        }

        SessionService::setUser($user->id);

        CookieService::userLogin($user->head_url, mb_strlen($user->mobile) > 0 ? 1 : 0, 1);

        return response()->json(['result' => 1]);
    }

    /**
     * 发送短信验证码接口。
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function captcha(Request $request)
    {
        $mobile = trim($request->input('mobile'));

        if (RegService::verifyMobile($mobile)) {
            return response()->json(['result' => -1]);
        }

//        if (!CommonService::checkEnv())//测试环境临时处理
//        {
//            $captcha = 1111;
//
//            session(['captcha' => $mobile . $captcha]);
//
//            return response()->json(['result' => 1]);
//        }

        $captcha = mt_rand(1000, 9999);

        session(['captcha' => $mobile . $captcha]);

        return response()->json(['result' => $this->sendAcxiomSms($mobile, $captcha)]);
    }

    /**
     * 用户登出接口。
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        CookieService::userLogout();

        Session::flush();

        return response()->json(['result' => 1]);
    }
}
