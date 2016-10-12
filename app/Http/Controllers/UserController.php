<?php

namespace App\Http\Controllers;

use App\Services\RegService;
use App\Traits\UserTrait;
use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use Exception;
use Log;

class UserController extends Controller
{
    use UserTrait;
    /**
     * 用户模块页面
     *
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index($id)
    {
        return view('user.manage');
    }

    /**
     * 搜索结果呈现
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexDo(Request $request, $id)
    {
        $id = intval(trim($id));

        $query = DB::table('users');

        $mobile = trim($request->input('mobile'));

        $kol = intval(trim($request->input('kol')));

        if(!RegService::verifySort($kol))
        {
            $query = $query->where('users.kol', $kol);
        }

        if(!RegService::verifyMobile($mobile))
        {
            $query = $query->where('users.mobile', $mobile);
        }
        $countQuery = $query;
        $totalCount = $countQuery->count();

        //分页器
        $pageSize = 10;//每页显示记录数

        if (($id - 1) * $pageSize >= $totalCount) {
            return response()->json(['result' => 0, 'count' => $totalCount, 'data' => []]);
        }

        $queryData = $query
            ->orderBy('users.created_at', 'desc')
            ->orderBy('users.id', 'desc')
            ->skip($pageSize * ($id - 1))
            ->take($pageSize)
            ->get([
                'users.id',
                'users.nick_name',
                'users.mobile',
                'users.openid',
                'users.kol',
                'users.created_at'
            ]);

        $resultData = [];

        foreach ($queryData as $item) {
            array_push($resultData, [
                'id'=>$item->id,
                'nick_name'=>e($item->nick_name),
                'mobile'=>$item->mobile,
                'openid'=>$item->openid,
                'kol'=>$item->kol?'专家':'非专家',
                'created_at'=>$item->created_at,
            ]);
        }
        return response()->json([
            'result' => 1,
            'count' => $totalCount,
            'data' => $resultData,
        ],
            200,
            ['Content-Type' => 'application/json;charset=utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * 编辑kol页面
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function editKol(Request $request,$id)
    {
        $id = intval(trim($id));

        $user = $this->getUserById($id);

        $kol = intval(trim($request->input('kol')));

        if (is_null($user)) {
            return response()->json(['result' => 0]);
        }

        $user->kol = $kol;

        $result = 0;

        try {
            $user->save();

            $result = 1;
        } catch (Exception $e) {
            Log::error('approval question exception,id:' . $id . ',exception:' . $e->getMessage());
        }

        return response()->json(['result' => $result]);
    }
}
