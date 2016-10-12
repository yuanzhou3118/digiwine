<?php

namespace App\Http\Controllers\Api;

use App\Services\CommonService;
use App\Services\RegService;
use App\Traits\LessonCommentTrait;
use App\Traits\LessonTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class LessonQueryController extends Controller
{
    use LessonTrait, LessonCommentTrait;

    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        CommonService::setCrossDomain();
    }

    /**
     * 查询课程及评论接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
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

        $id = intval(trim($request->input('lesson_id')));

        if (RegService::verifyLesson($id)) {
            return response()->json(['result' => 2]);//课程不存在。
        }

        return response()->json($this->queryLessonCommentsById($id, $pageIndex, $pageSize), 200, [],
            JSON_UNESCAPED_UNICODE);
    }
}
