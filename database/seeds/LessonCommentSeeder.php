<?php

use Illuminate\Database\Seeder;
use App\Models\LessonComment;

class LessonCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();

        try {
            DB::statement('TRUNCATE TABLE lesson_comments');

            $lessonComment = new LessonComment();

            $lessonComment->id = 1;
            $lessonComment->user_id = 1;
            $lessonComment->lesson_id = 1;
            $lessonComment->comment = '课程很棒！简单易理解有趣味，赞';
            $lessonComment->created_at = date('Y-m-d H:i:s', time());
            $lessonComment->updated_at = date('Y-m-d H:i:s', time());

            $lessonComment->save();

            $lessonComment = new LessonComment();

            $lessonComment->id = 2;
            $lessonComment->user_id = 2;
            $lessonComment->lesson_id = 1;
            $lessonComment->comment = '原来不是我们常吃的葡萄';
            $lessonComment->created_at = date('Y-m-d H:i:s', time());
            $lessonComment->updated_at = date('Y-m-d H:i:s', time());

            $lessonComment->save();

            $lessonComment = new LessonComment();

            $lessonComment->id = 3;
            $lessonComment->user_id = 2;
            $lessonComment->lesson_id = 3;
            $lessonComment->comment = '好有趣，希望出更多的小教程';
            $lessonComment->created_at = date('Y-m-d H:i:s', time());
            $lessonComment->updated_at = date('Y-m-d H:i:s', time());

            $lessonComment->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
        }
    }
}
