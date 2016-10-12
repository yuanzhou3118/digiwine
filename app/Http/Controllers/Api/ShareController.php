<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Services\CommonService;
use App\Services\PointService;
use App\Services\SessionService;
use App\Traits\AcxiomBehaviorTrait;
use App\Traits\PointTrait;

class ShareController extends Controller
{
    use PointTrait, AcxiomBehaviorTrait;

    /**
     * 登陆路用户id。
     *
     * @var int
     */
    private $id;

    /**
     * LessonController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        $this->id = SessionService::getUser();

        CommonService::setCrossDomain();
    }

    /**
     * 用户分享接口。
     *
     * @return \Illuminate\Http\Response
     */
    public function share()
    {
        $status = $this->addSharePoint($this->id);

        $this->behaviorDataUser($this->id, $status == 1, PointService::SHARE_TYPE_ID);//发送分享的行为数据到安客臣。

        return response()->json(['result' => 1]);//提交成功。
    }
}
