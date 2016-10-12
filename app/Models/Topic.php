<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Topic
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $tag
 * @property string $question
 * @property integer $share
 * @property integer $favorite
 * @property integer $sort
 * @property integer $comment_count
 * @property integer $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereTag($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereQuestion($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereShare($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereFavorite($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereSort($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereCommentCount($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Topic whereUpdatedAt($value)
 */
class Topic extends Model
{
    protected $table = 'topics';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
