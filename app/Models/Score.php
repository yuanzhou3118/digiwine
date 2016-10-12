<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Score
 *
 * @property integer $id
 * @property boolean $score_type
 * @property integer $user_id
 * @property integer $type_id
 * @property integer $score
 * @property integer $sort
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereScoreType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereTypeId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereScore($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereSort($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Score whereUpdatedAt($value)
 */
class Score extends Model
{
    protected $table = 'scores';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
