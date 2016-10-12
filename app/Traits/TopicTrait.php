<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-05-27
 * Time: 12:09
 */

namespace App\Traits;

use App\Models\Topic;
use App\Models\TopicComment;
use App\Models\TopicCommentLike;
use App\Models\TopicFavorite;
use App\Services\RegService;
use DB;
use Exception;
use Log;

trait TopicTrait
{
    /**
     * 根据话题ID查询话题信息。
     *
     * @param $id
     * @param array $columns
     * @return mixed|static
     */
    protected function getTopicById($id, $columns = ['*'])
    {
        return Topic::whereId($id)->first($columns);
    }

    /**
     * topic评论数加1。
     *
     * @param $id
     */
    protected function updateTopicCommentCount($id)
    {
        DB::statement('update topics set comment_count = comment_count + 1 WHERE id = ?', [$id]);
    }

    /**
     * topic评论的点数加1。
     *
     * @param $id
     */
    protected function updateTopicCommentLikeCount($id)
    {
        DB::statement('update topic_comments set `bang` = `bang` + 1 WHERE id = ?', [$id]);
    }

    /**
     * 根据话题ID查询有效话题信息。
     *
     * @param $id
     * @param array $columns
     * @return mixed|static
     */
    protected function getTopicValidById($id, $columns = ['*'])
    {
        return Topic::whereId($id)->whereStatus(1)->first($columns);
    }

    /**
     * 根据话题评论ID查询有效话题信息。
     *
     * @param $id
     * @return mixed|static
     */
    protected function getTopicCommentValidById($id)
    {
        return DB::table('topic_comments')
            ->join('topics', 'topic_comments.topic_id', '=', 'topics.id')
            ->where('topic_comments.id', $id)
            ->where('topic_comments.status', 1)
            ->where('topics.status', 1)
            ->first(['topics.id', 'topics.user_id']);
    }

    /**
     * 创建topic评论。
     *
     * @param $userId
     * @param $topicId
     * @param $comment
     * @param $sort
     * @return int
     */
    protected function createTopicComment($userId, $topicId, $comment, $sort)
    {
        $topicComment = new TopicComment();

        $topicComment->user_id = $userId;
        $topicComment->topic_id = $topicId;
        $topicComment->content = $comment;
        $topicComment->sort = $sort;
        $topicComment->bang = 0;
        $topicComment->status = 1;

        try {
            $topicComment->save();

            return 1;

        } catch (Exception $e) {
            Log::error('create topic comment exception,user_id:' . $userId .
                ',topic_id:' . $topicId . ',comment:' . $comment . ',exception:' . $e->getMessage());

            return 0;
        }
    }

    /**
     * 验证用户是否点过赞。
     *
     * @param $commentId
     * @param $userId
     * @return bool
     */
    protected function checkTopicCommentLike($commentId, $userId)
    {
        return TopicCommentLike::whereTopicCommentId($commentId)->whereUserId($userId)->count() > 0;
    }

    /**
     * 创建topic评论点赞。
     *
     * @param $topicId
     * @param $userId
     * @param $commentId
     * @return int
     */
    protected function createTopicCommentLike($topicId, $userId, $commentId)
    {
        $topicCommentLike = new TopicCommentLike();

        $topicCommentLike->topic_id = $topicId;
        $topicCommentLike->user_id = $userId;
        $topicCommentLike->topic_comment_id = $commentId;

        try {
            $topicCommentLike->save();

            return 1;

        } catch (Exception $e) {
            Log::error('create topic comment like exception,user_id:' . $userId .
                ',topic_id:' . $topicId . ',comment_id:' . $commentId . ',exception:' . $e->getMessage());

            return 0;
        }
    }

    /**
     * 根据评论ID查询评论信息。
     *
     * @param $id
     * @return mixed|static
     */
    protected function getCommentById($id)
    {
        return TopicComment::whereId($id)->first();
    }

    /**
     * 根据收藏话题id查询收藏话题信息
     *
     * @param $id
     * @return mixed
     */
    protected function getTopicFavoriteById($id)
    {
        return TopicFavorite::whereId($id)->first();
    }

    /**
     * 根据话题id查询话题信息
     *
     * @param $pageIndex
     * @param $pageSize
     * @param $tag
     * @param $userId
     * @return array
     */
    protected function queryTopicById($pageIndex, $pageSize, $tag, $userId)
    {
        $query = DB::table('topics')
            ->where('topics.status', 1);

        if ($userId != 0) {
            $query = $query->where('topics.user_id', '=', $userId);
        }

        if ($tag == 999) {
            $query = $query->orderBy('topics.comment_count', 'desc');
        }
        if ($tag == 1000) {
            $query = $query->orderBy('topics.sort');
        }
        if (($tag != 999) && ($tag != 1000) && ($tag != 0)) {
            $query = $query->where('topics.tag', $tag);
        }

        $countQuery = $query;
        $totalCount = $countQuery->count();

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return ['result' => 3, 'data' => [], 'total_count' => $totalCount];//没有数据。
        }

        if ($totalCount < $pageSize)
            $pageSize = $totalCount;

        $queryData = $query
            ->orderBy('topics.created_at', 'desc')
            ->orderBy('topics.id', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get([
                'topics.id as topic_id',
                'topics.tag',
                'topics.question',
                'topics.created_at',
                'topics.comment_count',
                'topics.favorite',
            ]);

        for ($i = 0; $i < $pageSize; $i++) {
            $topicId = $queryData[$i]->topic_id;
            $query_a = DB::table('topic_comments')
                ->where('topic_comments.status', 1)
                ->join('users', 'users.id', '=', 'topic_comments.user_id')
                ->where('topic_comments.topic_id', $topicId)
                ->orderBy('topic_comments.sort')
                ->orderBy('topic_comments.bang', 'desc');

            $commentQuery = $query_a->orderBy('topic_comments.created_at', 'desc')
                ->take(1)
                ->get([
                    'topic_comments.content',
                    'users.kol',
                    'users.head_url',
                    'topic_comments.bang',
                    'topic_comments.user_id'
                ]);

            if (empty($commentQuery)) {
                $queryData[$i]->comment_bang = null;
                $queryData[$i]->comment_user_id = null;
                $queryData[$i]->content = null;
                $queryData[$i]->head_url = null;
                $queryData[$i]->kol = null;
            } else {
                $bang = $commentQuery[0]->bang;
                $user_id = $commentQuery[0]->user_id;
                $content = $commentQuery[0]->content;
                $head_url = $commentQuery[0]->head_url;
                $kol = $commentQuery[0]->kol;
                $queryData[$i]->comment_bang = $bang;
                $queryData[$i]->comment_user_id = $user_id;
                $queryData[$i]->content = $content;
                $queryData[$i]->head_url = $head_url;
                $queryData[$i]->kol = $kol;
            }
        }


        $resultData = [];

        foreach ($queryData as $item) {
            array_push($resultData, [
                'content' => e($item->content),
                'kol' => $item->kol,
                'head_url' => $item->head_url,
                'comment_bang' => $item->comment_bang,
                'comment_user_id' => $item->comment_user_id,
                'topic_id' => $item->topic_id,
                'tag' => $item->tag,
                'question' => e($item->question),
                'created_at' => date('Y/m/d', strtotime($item->created_at)),
                'comment_count' => $item->comment_count,
                'favorite' => $item->favorite,
            ]);
        }

        return ['result' => 1, 'data' => $resultData, 'total_count' => $totalCount];
    }

    /**
     * 返回用户收藏话题的query
     *
     * @param $pageIndex
     * @param $pageSize
     * @param $tag
     * @param $userId
     * @return array
     */
    public function getQueryTopicByFavoriteId($pageIndex, $pageSize, $tag, $userId)
    {
        $query = DB::table('topics')
            ->join('topic_favorites', 'topic_favorites.topic_id', '=', 'topics.id')
            ->where('topics.status', 1)
            ->where('topic_favorites.user_id', $userId);

        if ($tag == '999') {
            $query = $query->orderBy('topics.comment_count', 'desc');
        }
        if (($tag != '999') && ($tag != 0)) {
            $query = $query->where('topics.tag', $tag);
        }

        $countQuery = $query;
        $totalCount = $countQuery->count();

        if (($pageIndex - 1) * $pageSize >= $totalCount) {
            return ['result' => 3, 'data' => [], 'total_count' => $totalCount];//没有数据。
        }
        if ($totalCount < $pageSize)
            $pageSize = $totalCount;

        $queryData = $query
            ->orderBy('topics.created_at', 'desc')
            ->orderBy('topics.id', 'desc')
            ->skip($pageSize * ($pageIndex - 1))
            ->take($pageSize)
            ->get([
                'topics.id as topic_id',
                'topic_favorites.id as topic_favorite_id',
                'topics.tag',
                'topics.question',
                'topics.created_at',
                'topics.comment_count',
                'topics.favorite'
            ]);
        for ($i = 0; $i < $pageSize; $i++) {
            $topicId = $queryData[$i]->topic_id;
            $query_a = DB::table('topic_comments')
                ->where('topic_comments.status', 1)
                ->join('users', 'users.id', '=', 'topic_comments.user_id')
                ->where('topic_comments.topic_id', $topicId)
                ->orderBy('topic_comments.sort')
                ->orderBy('topic_comments.bang', 'desc');

            $commentQuery = $query_a->orderBy('topic_comments.created_at', 'desc')
                ->take(1)
                ->get([
                    'topic_comments.content',
                    'users.kol',
                    'users.head_url',
                    'topic_comments.bang',
                    'topic_comments.user_id'
                ]);

            if (empty($commentQuery)) {
                $queryData[$i]->comment_bang = null;
                $queryData[$i]->comment_user_id = null;
                $queryData[$i]->content = null;
                $queryData[$i]->head_url = null;
                $queryData[$i]->kol = null;
            } else {
                $bang = $commentQuery[0]->bang;
                $user_id = $commentQuery[0]->user_id;
                $content = $commentQuery[0]->content;
                $head_url = $commentQuery[0]->head_url;
                $kol = $commentQuery[0]->kol;
                $queryData[$i]->comment_bang = $bang;
                $queryData[$i]->comment_user_id = $user_id;
                $queryData[$i]->content = $content;
                $queryData[$i]->head_url = $head_url;
                $queryData[$i]->kol = $kol;
            }
        }

        $resultData = [];

        foreach ($queryData as $item) {
            array_push($resultData, [
                'content' => e($item->content),
                'kol' => $item->kol,
                'head_url' => $item->head_url,
                'comment_bang' => $item->comment_bang,
                'comment_user_id' => $item->comment_user_id,
                'topic_id' => $item->topic_id,
                'tag' => $item->tag,
                'question' => e($item->question),
                'created_at' => date('Y/m/d', strtotime($item->created_at)),
                'comment_count' => $item->comment_count,
                'favorite' => $item->favorite,
                'topic_favorite_id' => $item->topic_favorite_id,
            ]);
        }

        return ['result' => 1, 'data' => $resultData, 'total_count' => $totalCount];
    }
}
