<?php

namespace App\Http\Controllers\Topic;

use App\Traits\TopicTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Exception;
use Log;

class TopicCommentController extends Controller
{
    use TopicTrait;

    /**
     * 话题评论管理页面
     *
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index($id)
    {
        $id = intval(trim($id));

        if($id < 1){
            $id = 1;
        }

        return view('topic.comment.manage', ['topic_id' => $id]);
    }

    /**
     * 评论搜索
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexDo(Request $request, $id)
    {
        $pageIndex = intval(trim($id));

        $topic_id = intval(trim($request->input('topic_id')));

        $status = intval(trim($request->input('status')));

        $time1 = trim($request->input('time1'));
        $time2 = trim($request->input('time2'));

        $patten = '/^\d{4}[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])(\s+(0?[0-9]|1[0-9]|2[0-3])\:(0?[0-9]|[1-5][0-9])\:(0?[0-9]|[1-5][0-9]))?$/';//2016-05-28 10:20:22

        if (is_null($time1) || is_null($time2)) {
            return response()->json(['result' => 2]);
        }
        if ($time1 > $time2) {
            return response()->json(['result' => 0]);
        }
        $query = DB::table('topic_comments')
            ->where('topic_comments.topic_id', $topic_id)
            ->join('topics', 'topics.id', '=', 'topic_comments.topic_id');

        if (preg_match($patten, $time1) && preg_match($patten, $time2))//正则
        {
            $query = $query->where('topic_comments.created_at', '>=', $time1);
            $query = $query->where('topic_comments.created_at', '<=', $time2);
        }

        if ($status != 2)
            $query = $query->where('topic_comments.status', $status);

        $countQuery = $query;
        $totalCount = $countQuery->count();

        //分页器
        $pageSize = 10;//每页显示记录数

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return response()->json(['result' => 0, 'count' => $totalCount, 'data' => []]);
        }

        $queryData = $query
            ->orderBy('topic_comments.created_at', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get(['topic_comments.id',
                'topic_comments.user_id',
                'topic_comments.topic_id',
                'topic_comments.content',
                'topic_comments.sort',
                'topic_comments.status',
                'topic_comments.bang',
                'topic_comments.created_at'
            ]);

        return response()->json([
            'result' => 1,
            'count' => $totalCount,
            'data' => $queryData,
            'topic_id' => $topic_id,
        ],
            200,
            ['Content-Type' => 'application/json;charset=utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * 审核评论
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkComment(Request $request, $id)
    {
        $id = intval(trim($id));

        $status = intval(trim($request->input('status')));

        $checkComment = $this->getCommentById($id);

        if (is_null($checkComment)) {
            return response()->json(['result' => 0]);
        }

        $checkComment->status = $status;

        $result = false;

        try {
            $checkComment->save();

            $result = true;
        } catch (Exception $e) {
            Log::error('approval question exception,id:' . $id . ',exception:' . $e->getMessage());
        }

        return response()->json(['result' => $result ? 1 : 0]);
    }
}
