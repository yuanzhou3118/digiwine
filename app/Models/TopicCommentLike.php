<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\TopicCommentLike
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $topic_comment_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicCommentLike whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicCommentLike whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicCommentLike whereTopicCommentId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicCommentLike whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicCommentLike whereUpdatedAt($value)
 * @property integer $topic_id
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicCommentLike whereTopicId($value)
 */
class TopicCommentLike extends Model
{
    protected $table = 'topic_comment_likes';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
