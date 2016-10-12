<?php

namespace App\Http\Controllers\Api;

use App\Services\CommonService;
use App\Services\SessionService;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Traits\NoteTrait;
use App\Traits\UserNoteTrait;
use Illuminate\Http\Request;

class MyNoteController extends Controller
{
    use NoteTrait, UserNoteTrait;

    /**
     * 用户登陆的id。
     *
     * @var int
     */
    private $id;

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
        $this->updateUserNote($this->id, CommonService::USER_NOTE_ACCESS);

        return response()->json(['result' => 1]);
    }

    /**
     * 查询我的笔记接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function note(Request $request)
    {
        $pageIndex = intval(trim($request->input('page_index')));

        if ($pageIndex < 1) {
            $pageIndex = 1;
        }

        $pageSize = intval(trim($request->input('page_size')));

        if ($pageSize < 1) {
            $pageSize = CommonService::PAGE_DEFAULT_SIZE;
        }

        return response()->json($this->queryNoteById(0, $pageIndex, $pageSize, $this->id),
            200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 查询我收藏的笔记接口。
     *
     * @param Request $request
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

        return response()->json($this->getQueryNoteByFavoriteId(0, $pageIndex, $pageSize, $this->id),
            200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 删除我收藏的笔记接口。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $id = intval(trim($request->input('note_favorite_id')));

        if ($id < 1) {
            return response()->json(['result' => -1]);
        }

        if (!$this->checkNoteFavoriteByIdAndUserId($id, $this->id)) {
            return response()->json(['result' => 2]);
        }

        return response()->json(['result' => $this->delNoteFavoriteById($id)]);
    }
}
