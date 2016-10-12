<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\NoteLike
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $note_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteLike whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteLike whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteLike whereNoteId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteLike whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteLike whereUpdatedAt($value)
 */
class NoteLike extends Model
{
    protected $table = 'note_likes';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
