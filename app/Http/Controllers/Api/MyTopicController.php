<?php

namespace App\Http\Controllers\Api;

use App\Models\TopicFavorite;
use App\Services\CommonService;
use App\Services\SessionService;
use App\Traits\TopicTrait;
use App\Traits\UserTopicTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Exception;
use Log;

class MyTopicController extends Controller
{
    use TopicTrait, UserTopicTrait;

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
     * 记录用户访问接口。
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function access()
    {
        $this->updateUserTopic($this->id, CommonService::USER_TOPIC_ACCESS);

        return response()->json(['result' => 1]);
    }

    /**
     * 查询我的话题接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topic(Request $request)
    {
        $pageIndex = intval(trim($request->input('page_index')));

        if ($pageIndex < 1) {
            $pageIndex = 1;
        }

        $pageSize = intval(trim($request->input('page_size')));

        if ($pageSize < 1) {
            $pageSize = CommonService::PAGE_DEFAULT_SIZE;
        }

        return response()->json($this->queryTopicById($pageIndex, $pageSize, 0, $this->id),
            200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 查询我收藏的话题接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function favorite(Request $request)
    {
        $pageIndex = intval(trim($request->input('page_index')));

        if ($pageIndex < 1) {
            $pageIndex = 1;
        }

        $pageSize = intval(trim($request->input('page_size')));

        if ($pageSize < 1) {
            $pageSize = CommonService::PAGE_DEFAULT_SIZE;
        }

        return response()->json($this->getQueryTopicByFavoriteId($pageIndex, $pageSize, 0, $this->id),
            200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 删除我收藏的话题接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $topicFavoriteId = intval(trim($request->input('topic_favorite_id')));

        $checkTopicFavoriteId = TopicFavorite::whereUserId($this->id)->whereId($topicFavoriteId)->count();

        if (!$checkTopicFavoriteId) {
            return response()->json(['result' => 0]);
        }

        $result = false;

        try {
            $checkTopicFavoriteId->destroy($topicFavoriteId);
            $checkTopicFavoriteId->save();

            $result = '删除成功';

        } catch (Exception $e) {
            Log::error('delete note favorite exception,id:' . $topicFavoriteId . ',exception:' . $e->getMessage());
        }

        return response()->json(['result' => $result ? 1 : 0]);
    }
}
