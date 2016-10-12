<?php

namespace App\Http\Controllers\Api;

use App\Models\TopicCommentLike;
use App\Models\TopicFavorite;
use App\Services\CommonService;
use App\Services\PointService;
use App\Services\RegService;
use App\Services\SessionService;
use App\Traits\AcxiomBehaviorTrait;
use App\Traits\PointTrait;
use App\Traits\TopicTrait;
use App\Traits\UserTopicTrait;
use App\Traits\UserTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Topic;
use Exception;
use Log;
use DB;

class TopicController extends Controller
{
    use TopicTrait, PointTrait, UserTopicTrait, UserTrait, AcxiomBehaviorTrait;

    /**
     * TopicController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        CommonService::setCrossDomain();
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function home()
    {
        return response()->json($this->queryTopicById(1, 2, 1000, 0), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 查询话题接口。
     * api-topic-all
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function query(Request $request)
    {
        $pageIndex = intval(trim($request->input('page_index')));

        if ($pageIndex < 1) {
            $pageIndex = 1;
        }

        $pageSize = intval(trim($request->input('page_size')));//每页显示记录数

        if ($pageSize < 1) {
            $pageSize = CommonService::PAGE_DEFAULT_SIZE;
        }

        $tag = intval(trim($request->input('tag')));//热门---999，其他按照各自的编号

        if (RegService::verifyTag($tag)) {
            $tag = 999;
        }

        return response()->json($this->queryTopicById($pageIndex, $pageSize, $tag, 0),
            200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 查看话题接口。
     * api-topic-view
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function view(Request $request)
    {
        $topicId = $request->input('topic_id');//通过topic_id查询数据

        $topic = $this->getTopicValidById($topicId,['question','tag','favorite','created_at','comment_count']);

        if (is_null($topic)) {
            return response()->json(['result' => 0]);
        }

        return response()->json([
            'result' => 1,
            'topic' => [
                'question' => e($topic->question),
                'tag' => $topic->tag,
                'favorite' => $topic->favorite,
                'created_at' => date('Y/m/d', strtotime($topic->created_at)),
                'comment_count' => $topic->comment_count,
            ],

        ],
            200,
            ['Content-Type' => 'application/json;charset=utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * 查询话题评论接口（带分页）
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topicQueryComment(Request $request)
    {
        $topicId = $request->input('topic_id');//通过topic_id查询数据

        $checkTopicId = $this->getTopicById($topicId);

        if (is_null($checkTopicId)) {
            return response()->json(['result' => 1, 'commentData' => [], 'totalCount' => 0]);
        }

        $pageIndex = intval(trim($request->input('page_index')));
        $pageSize = intval(trim($request->input('page_size')));//每页显示记录数

        $query = DB::table('topic_comments')//评论信息
        ->join('users', 'users.id', '=', 'topic_comments.user_id')
            ->where('topic_comments.status', 1)
            ->where('topic_comments.topic_id', $topicId);

        $countQuery = $query;
        $totalCount = $countQuery->count();

        if ($totalCount == 0) {
            return response()->json(['result' => 1, 'commentData' => [], 'totalCount' => 0]);
        }

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return response()->json(['result' => 3, 'commentData' => [], 'totalCount' => $totalCount]);
        }
        if ($totalCount < $pageSize)
            $pageSize = $totalCount;

        $getComment = $query
            ->orderBy('topic_comments.sort')
//            ->orderBy('topic_comments.bang', 'desc')
            ->orderBy('topic_comments.created_at', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get([
                'topic_comments.id',
                'topic_comments.user_id',
                'topic_comments.content',
                'topic_comments.bang',
                'users.head_url',
                'users.nick_name',
                'users.kol',
            ]);

        return response()->json([
            'result' => 1,
            'commentData' => $getComment,
//            'commentData' => [
//                'comment_id' => $getComment->id,
//                'user_id' => $getComment->user_id,
//                'content' => e($getComment->content),
//                'comment_bang' => $getComment->bang,
//                'head_url' => e($getComment->head_url),
//                'nick_name' => e($getComment->nick_name),
//                'kol' => $getComment->kol,
//            ],
            'totalCount' => $totalCount
        ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * 创建并提交话题接口
     * api-topic-create
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topicCreate(Request $request)
    {
        $question = trim($request->input('question'));

        if (mb_strlen($question) < 15 || mb_strlen($question) > 300) {
            return response()->json(['result' => 2]);//话题内容超过字数限制
        }

        $tag = trim($request->input('tag'));

        if (RegService::verifyTag($tag)) {
            return response()->json(['result' => 3]);//标签超限
        }

        $userId = SessionService::getUser();

        $topic = new Topic();

        $topic->user_id = $userId;
        $topic->tag = $tag;
        $topic->question = $question;
        $topic->status = 1;

        $result = 0;

        try {
            $topic->save();

            $result = 1;
        } catch (Exception $e) {
            Log::error('save topic-create exception,user_id:' . $userId .
                ',question:' . $question . ',exception:' . $e->getMessage());
        }

        if ($result == 1) {
            $havePoint = $this->addCreateTopicPoint($topic->user_id, $topic->id, $topic->created_at);

            $this->behaviorDataUser($topic->user_id, $havePoint == 1, PointService::CREATE_TOPIC_TYPE_ID, date('Y-m-d H:i:s.B'));
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 收藏话题接口。
     * api-topic-favorite
     * 2:重复收藏
     * 3：topic_id错误
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topicFavorite(Request $request)
    {
        $topicId = intval(trim($request->input('topic_id')));

        if ($topicId < 1)
            return response()->json(['result' => 3]);//topic_id错误

        $checkTopicId = $this->getTopicById($topicId);

        if (is_null($checkTopicId))
            return response()->json(['result' => 3]);

        $userId = SessionService::getUser();

        $checkUserId = TopicFavorite::whereTopicId($topicId)->whereUserId($userId)->count();

        if ($checkUserId)
            return response()->json(['result' => 2]);//重复收藏

        $topicFavorite = new TopicFavorite();

        $topicFavorite->user_id = $userId;

        $topicFavorite->topic_id = $topicId;

        $checkTopicId->favorite = $checkTopicId->favorite + 1;

        DB::beginTransaction();

        try {
            $topicFavorite->save();

            $checkTopicId->save();

            DB::commit();

            $result = 1;
        } catch (Exception $e) {
            Log::error('save topic-favorite exception,user_id:' . $userId .
                ',topic:' . $topicId . ',exception:' . $e->getMessage());

            DB::rollBack();

            $result = 0;
        }
        return response()->json(['result' => $result]);

    }

    /**
     * 提交话题评论接口。
     * api-topic-comment
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topicComment(Request $request)
    {
        $content = trim($request->input('content'));

        if (mb_strlen($content) < 15 || mb_strlen($content) > 300) {
            return response()->json(['result' => -1]);//话题内容超过字数限制
        }

        $id = intval(trim($request->input('topic_id')));

        if ($id < 1)
            return response()->json(['result' => -1]);

        $topic = $this->getTopicValidById($id, ['id', 'user_id']);

        if (is_null($topic))
            return response()->json(['result' => 2]);

        $topic->comment_count = $topic->comment_count + 1;

        $userId = SessionService::getUser();

        $user = $this->getUserById($userId, ['kol']);

        $result = $this->createTopicComment($userId, $id, $content, $user->kol == 1 ? 10 : 999);

        if ($result == 1) {
            $this->updateUserTopic($topic->user_id, CommonService::USER_TOPIC_CHANGE);

            $this->updateTopicCommentCount($id);

            $status = $this->addTopicAnswerPoint($userId, $id, date('Y-m-d H:i:s'));

            $this->behaviorDataUser($userId, $status == 1, PointService::TOPIC_ANSWER_TYPE_ID);
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 评论话题点赞接口。
     * api-topic-comment-like
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topicCommentBang(Request $request)
    {
        $id = intval(trim($request->input('comment_id')));

        if ($id < 1)
            return response()->json(['result' => -1]);

        $topicInfo = $this->getTopicCommentValidById($id);

        if (is_null($topicInfo))
            return response()->json(['result' => -1]);

        $userId = SessionService::getUser();

        if ($this->checkTopicCommentLike($id, $userId)) {
            return response()->json(['result' => 2]);//已经点过赞了
        }

        $result = $this->createTopicCommentLike($topicInfo->id, $userId, $id);

        if ($result == 1) {
            $this->updateUserTopic($topicInfo->user_id, CommonService::USER_TOPIC_CHANGE);

            $this->updateTopicCommentLikeCount($id);
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 查看是否收藏话题
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function favoriteStatus(Request $request)
    {
        $topicId = intval(trim($request->input('topic_id')));

        $userId = SessionService::getUser();

        $topicFavorite = TopicFavorite::whereTopicId($topicId)->whereUserId($userId)->count();

        return response()->json(['status' => $topicFavorite ? 1 : 0, 'result' => 1]);
    }

    public function likeStatus(Request $request)
    {
        $commentId = trim($request->input('comment_id_array'));

        $userId = SessionService::getUser();

        $arr = explode('-', $commentId);

        $dataArray = [];

        foreach ($arr as $item) {
            $topicCommentLike = TopicCommentLike::whereTopicCommentId($item)->whereUserId($userId)->count();
            $dataArray[$item] = $topicCommentLike;
        }
        return response()->json([
            'status_array' => $dataArray, 'result' => 1
        ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
