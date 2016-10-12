<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserNote
 *
 * @property integer $user_id
 * @property string $accessed_at
 * @property string $changed_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserNote whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserNote whereAccessedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserNote whereChangedAt($value)
 */
class UserNote extends Model
{
    protected $table = 'user_notes';

    public $timestamps = false;

    protected $fillable = ['user_id', 'accessed_at', 'changed_at'];

    protected $primaryKey = 'user_id';
}
