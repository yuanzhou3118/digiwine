<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\TopicFavorite
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $topic_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicFavorite whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicFavorite whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicFavorite whereTopicId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicFavorite whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\TopicFavorite whereUpdatedAt($value)
 */
class TopicFavorite extends Model
{
    protected $table = 'topic_favorites';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
