<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\NoteFavorite
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $note_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteFavorite whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteFavorite whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteFavorite whereNoteId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteFavorite whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\NoteFavorite whereUpdatedAt($value)
 */
class NoteFavorite extends Model
{
    protected $table = 'note_favorites';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
