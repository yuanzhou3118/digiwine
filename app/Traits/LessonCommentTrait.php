<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-11
 * Time: 12:47
 */

namespace App\Traits;

use App\Models\LessonComment;
use App\Services\CommonService;
use DB;
use Exception;
use Log;

trait LessonCommentTrait
{
    /**
     * 根据课程ID查询课程评论数。
     *
     * @param $lessonId
     * @return int
     */
    protected function getLessonCommentCountByLessonId($lessonId)
    {
        return LessonComment::whereLessonId($lessonId)->count();
    }

    /**
     * 查询课程评论。
     *
     * @param $lessonId
     * @param $pageIndex
     * @param $pageSize
     * @return array
     */
    protected function queryLessonCommentsById($lessonId, $pageIndex, $pageSize)
    {
        $count = $this->getLessonCommentCountByLessonId($lessonId);

        if ($count == 0) {
            return ['result' => 1, 'total_count' => $count];//没有数据。
        }

        if (($pageIndex - 1) * $pageSize >= $count) {
            return ['result' => 3, 'total_count' => $count];//超出分页数。
        }

        $data = DB::table('lesson_comments')->join('users', 'lesson_comments.user_id', '=', 'users.id')
            ->where('lesson_comments.lesson_id', $lessonId)
            ->orderBy('lesson_comments.created_at', 'desc')
            ->skip(($pageIndex - 1) * $pageSize)
            ->take($pageSize)
            ->get([
                'lesson_comments.comment',
                'lesson_comments.created_at',
                'users.nick_name',
                'users.head_url',
            ]);

        $result = [];

        foreach ($data as $item) {
            array_push($result, [
                'comment' => e($item->comment),
                'created_at' => date('m-d H:i', strtotime($item->created_at)),
                'nick_name' => e($item->nick_name),
                'head_url' => CommonService::getHeadUrl($item->head_url),
            ]);
        }

        return ['result' => 1, 'data' => $result, 'total_count' => $count];
    }

    /**
     * 添加课程评论。
     *
     * @param $userId
     * @param $lessonId
     * @param $comment
     * @return bool
     */
    protected function addLessonComment($userId, $lessonId, $comment)
    {
        $lessonComment = new LessonComment();

        $lessonComment->user_id = $userId;
        $lessonComment->lesson_id = $lessonId;
        $lessonComment->comment = $comment;

        try {
            $lessonComment->save();

            return true;
        } catch (Exception $e) {
            Log::error('add lesson comment exception,user_id:' . $userId . ',comment:' .
                $comment . ',exception:' . $e->getMessage());

            return false;
        }
    }
}
