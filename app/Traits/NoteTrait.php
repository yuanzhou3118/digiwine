<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-05-27
 * Time: 12:09
 */

namespace App\Traits;

use App\Models\Note;
use App\Models\NoteFavorite;
use App\Models\User;
use App\Services\CommonService;
use DB;
use Exception;
use Log;

trait NoteTrait
{
    /**
     * 根据笔记ID查询笔记信息。
     *
     * @param $id
     * @param array $columns
     * @return mixed|static
     */
    protected function getNoteById($id, $columns = ['*'])
    {
        return Note::whereId($id)->first($columns);
    }

    /**
     * 根据笔记id验证笔记是否存在。
     *
     * @param $id
     * @return bool
     */
    protected function checkNoteById($id)
    {
        return Note::whereId($id)->whereStatus(1)->count() > 0;
    }

    /**
     * 根据收藏笔记ID查询收藏笔记信息。
     *
     * @param $id
     * @return mixed|static
     */
    protected function getNoteFavoriteById($id)
    {
        return NoteFavorite::whereId($id)->first();
    }

    /**
     * 根据id验证我的笔记是否存在。
     *
     * @param $id
     * @param $userId
     * @return bool
     */
    protected function checkNoteFavoriteByIdAndUserId($id, $userId)
    {
        return NoteFavorite::whereId($id)->whereUserId($userId)->count() > 0;
    }

    /**
     * 删除笔记收藏。
     *
     * @param $id
     * @return int
     */
    protected function delNoteFavoriteById($id)
    {
        try {
            NoteFavorite::destroy($id);

            return 1;
        } catch (Exception $e) {
            Log::error('delete note favorite exception,id:' . $id . ',exception:' . $e->getMessage());

            return 0;
        }
    }

    /**
     * 根据参数查询所有note信息
     *
     * @param $sort
     * @param $pageIndex
     * @param $pageSize
     * @param $userId
     * @return array
     */
    protected function queryNoteById($sort, $pageIndex, $pageSize, $userId)
    {
        $query = DB::table('notes')
            ->join('users', 'users.id', '=', 'notes.user_id')
            ->where('notes.status', 1);

        if ($userId != 0) {
            $query = $query->where('notes.user_id', '=', $userId);
        }

        if (($userId == 0) && ($sort == 1)) {
            $query = $query->orderBy('notes.sort');
        }

        $countQuery = $query;

        $totalCount = $countQuery->count();

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return ['result' => 3, 'data' => [], 'total_count' => $totalCount];//没有数据。
        }

        if ($sort == 1) {
            $query = $query->orderBy('notes.note_likes', 'desc');
        }

        $queryData = $query
            ->orderBy('notes.created_at', 'desc')
//            ->orderBy('notes.id', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get([
                'notes.id as note_id',
                'users.head_url',
                'notes.content',
                'notes.imga',
                'notes.imgb',
                'notes.imgc',
                'notes.note_likes',
                'notes.note_favorites',
                'notes.created_at',
            ]);

        $resultData = [];

        foreach ($queryData as $item) {
            array_push($resultData, [
                'note_id' => $item->note_id,
                'head_url' => CommonService::getHeadUrl($item->head_url),
                'created_at' => date('Y/m/d', strtotime($item->created_at)),
                'content' => e($item->content),
                'imga' => $item->imga,
                'imgb' => $item->imgb,
                'imgc' => $item->imgc,
                'note_likes' => $item->note_likes,
                'note_favorites' => $item->note_favorites,
            ]);
        }

        return ['result' => 1, 'data' => $resultData, 'total_count' => $totalCount];
    }

    /**
     * @param $sort
     * @param $pageIndex
     * @param $pageSize
     * @param $userId
     * @return array
     */
    public function getQueryNoteByFavoriteId($sort, $pageIndex, $pageSize, $userId)
    {
        $query = DB::table('note_favorites')
            ->join('notes', 'notes.id', '=', 'note_favorites.note_id')
            ->where('notes.status', 1)
            ->where('note_favorites.user_id', '=', $userId);

        if ($sort) {
            $query = $query->orderBy('notes.note_likes', 'desc');
        }

        $countQuery = $query;
        $totalCount = $countQuery->count();

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return ['result' => 3, 'data' => [], 'total_count' => $totalCount];//没有数据。
        }

        if ($totalCount < $pageSize)
            $pageSize = $totalCount;

        $queryData = $query
            ->orderBy('notes.created_at', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get([
                'notes.id as note_id',
                'notes.user_id',
                'notes.content',
                'notes.imga',
                'notes.imgb',
                'notes.imgc',
                'notes.note_likes',
                'notes.note_favorites',
                'notes.created_at',
            ]);

        for ($i = 0; $i < $pageSize; $i++) {
            $user = User::whereId($userId)->first();
            $queryData[$i]->head_url = $user->head_url;
        }

        $resultData = [];

        foreach ($queryData as $item) {
            array_push($resultData, [
                'note_id' => $item->note_id,
                'head_url' => CommonService::getHeadUrl($item->head_url),
                'created_at' => date('Y/m/d', strtotime($item->created_at)),
                'content' => e($item->content),
                'imga' => $item->imga,
                'imgb' => $item->imgb,
                'imgc' => $item->imgc,
                'note_likes' => $item->note_likes,
                'note_favorites' => $item->note_favorites,
            ]);
        }

        return ['result' => 1, 'data' => $resultData, 'total_count' => $totalCount];
    }
}
