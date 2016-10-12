<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\LessonComment
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $lesson_id
 * @property string $comment
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LessonComment whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LessonComment whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LessonComment whereLessonId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LessonComment whereComment($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LessonComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\LessonComment whereUpdatedAt($value)
 */
class LessonComment extends Model
{
    protected $table = 'lesson_comments';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
