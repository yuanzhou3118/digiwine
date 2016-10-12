<?php

use Illuminate\Database\Seeder;
use App\Models\Lesson;

class LessonSeeder extends Seeder
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
            DB::statement('TRUNCATE TABLE lessons');

            $lesson = new Lesson();

            $lesson->id = 1;
            $lesson->share_count = 100;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 2;
            $lesson->share_count = 200;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 3;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 4;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 5;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 6;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 7;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 8;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 9;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            $lesson = new Lesson();

            $lesson->id = 10;
            $lesson->share_count = 300;
            $lesson->created_at = date('Y-m-d H:i:s', time());
            $lesson->updated_at = date('Y-m-d H:i:s', time());

            $lesson->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
        }
    }
}
