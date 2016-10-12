<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserTopic
 *
 * @property integer $user_id
 * @property string $accessed_at
 * @property string $changed_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserTopic whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserTopic whereAccessedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserTopic whereChangedAt($value)
 */
class UserTopic extends Model
{
    protected $table = 'user_topics';

    public $timestamps = false;

    protected $fillable = ['user_id', 'accessed_at', 'changed_at'];

    protected $primaryKey = 'user_id';
}
