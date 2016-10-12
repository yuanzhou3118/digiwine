<?php

namespace App\Http\Controllers\Api;

use App\Services\CommonService;
use App\Services\SessionService;
use App\Traits\PointTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class MyPointController extends Controller
{
    use PointTrait;

    /**
     * 用户登陆的id。
     *
     * @var int
     */
    private $id;

    /**
     * UserController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        $this->id = SessionService::getUser();

        CommonService::setCrossDomain();
    }

    /**
     * 获取我的积分基本信息接口。
     *
     * @return \Illuminate\Http\Response
     */
    public function basic()
    {
        return response()->json(array_merge(['result' => 1], $this->getPointAndLevelByUserId($this->id)));
    }

    /**
     * 获取我的积分明细接口。
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function query(Request $request)
    {
        $pageIndex = intval(trim($request->input('page_index')));

        if ($pageIndex < 1) {
            $pageIndex = 1;
        }

        $pageSize = intval(trim($request->input('page_size')));

        if ($pageSize < 1) {
            $pageSize = CommonService::PAGE_DEFAULT_SIZE;
        }

        return response()->json($this->queryPointsByUserId($this->id, $pageIndex, $pageSize),
            200, [], JSON_UNESCAPED_UNICODE);
    }
}
