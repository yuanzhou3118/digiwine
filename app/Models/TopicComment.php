<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\TopicComment
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $topic_id
 * @property string $content
 * @property integer $sort
 * @property integer $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereTopicId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereContent($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereSort($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereUpdatedAt($value)
 * @property integer $bang
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicComment whereBang($value)
 */
class TopicComment extends Model
{
    protected $table = 'topic_comments';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
