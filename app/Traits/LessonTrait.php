<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-11
 * Time: 12:47
 */

namespace App\Traits;

use App\Models\Lesson;
use DB;

trait LessonTrait
{
    /**
     * 获取评论的分享数。
     *
     * @param $id
     * @return mixed|static
     */
    protected function getLessonById($id)
    {
        return Lesson::whereId($id)->first(['share_count']);
    }

    /**
     * 课程的分享数加1。
     *
     * @param $id
     */
    protected function updateLesson($id)
    {
        DB::statement('update lessons set share_count = share_count + 1 WHERE id = ?', [$id]);
    }
}
