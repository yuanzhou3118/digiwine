<?php

namespace App\Http\Controllers\Topic;

use App\Services\PointService;
use App\Traits\AcxiomBehaviorTrait;
use App\Traits\PointTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Exception;
use Log;
use DB;
use App\Traits\TopicTrait;

class TopicController extends Controller
{
    use TopicTrait, PointTrait, AcxiomBehaviorTrait;

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('topic.manage');
    }

    /**
     * 话题管理页面
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexDo(Request $request, $id)
    {
        $pageIndex = intval(trim($id));

        $tag = trim($request->input('tag'));

        $sort = intval(trim($request->input('sort')));

        $status = intval(trim($request->input('status')));

        $query = DB::table('topics');

        if ($tag > 0)
            $query = $query->where('topics.tag', $tag);

        if ($sort > 0)
            $query = $query->where('topics.sort', $sort);

        if ($status != 2)
            $query = $query->where('topics.status', $status);

        $countQuery = $query;
        $totalCount = $countQuery->count();

        //分页器
        $pageSize = 10;//每页显示记录数

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return response()->json(['result' => 0, 'count' => $totalCount, 'data' => []]);
        }

        $queryData = $query
            ->orderBy('topics.created_at', 'desc')
            ->orderBy('topics.id', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get(['topics.id',
                'topics.user_id',
                'topics.tag',
                'topics.question',
                'topics.share',
                'topics.favorite',
                'topics.sort',
                'topics.status',
                'topics.created_at'
            ]);

        $resultData = [];

        foreach ($queryData as $item) {
            switch ($item->tag) {
                case 1:
                    $item->tag = '价格';
                    break;
                case 2:
                    $item->tag = '品鉴';
                    break;
                case 3:
                    $item->tag = '餐酒搭配';
                    break;
                case 4:
                    $item->tag = '器具';
                    break;
                case 5:
                    $item->tag = '其他';
                    break;
                default:
                    break;
            }
            array_push($resultData, [
                'id'=>$item->id,
                'user_id'=>$item->user_id,
                'tag'=>$item->tag,
                'question'=>e($item->question),
                'share'=>$item->share,
                'favorite'=>$item->favorite,
                'sort'=>$item->sort,
                'status'=>$item->status,
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
     * 编辑排序
     *
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $checkId = $this->getTopicById($id);

        if (is_null($checkId)) {
            return view('topic.manage', 1);
        }

        return view('topic.edit', ['topic' => $checkId]);
    }

    /**
     * 更新数据
     *
     * @param \Illuminate\Http\Request $request
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function update(Request $request, $id)
    {
        $topicId = $this->getTopicById($id);

        if (is_null($topicId))
            return view('topic.manage', 1);

        $sort = trim($request->input('sort'));

        $result = '保存失败';

        try {
            $topicId->sort = $sort;
            $topicId->save();

            $result = '保存成功';
        } catch (Exception $e) {
            Log::error('save notice exception,id:' . $id . ',exception:' . $e->getMessage());
        }

        return view('topic.edit', ['topic' => $topicId, 'result' => $result]);
    }

    /**
     * 审核话题
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function checkTopic(Request $request, $id)
    {
        $id = intval(trim($id));

        $topic = $this->getTopicById($id, ['id', 'user_id', 'created_at']);

        $status = intval(trim($request->input('status')));

        if (is_null($topic)) {
            return response()->json(['result' => 0]);
        }

        $topic->status = $status;

        $result = 0;

        try {
            $topic->save();

            $result = 1;
        } catch (Exception $e) {
            Log::error('approval question exception,id:' . $id . ',exception:' . $e->getMessage());
        }

        if ($result == 1 && $status == 1) {
            $havePoint = $this->addCreateTopicPoint($topic->user_id, $topic->id, $topic->created_at);

            $this->behaviorDataUser($topic->user_id, $havePoint == 1, PointService::CREATE_TOPIC, $topic->created_at);
        }

        return response()->json(['result' => $result]);
    }
}
