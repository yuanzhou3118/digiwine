<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Lesson
 *
 * @property integer $id
 * @property integer $share_count
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Lesson whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Lesson whereShareCount($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Lesson whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Lesson whereUpdatedAt($value)
 */
class Lesson extends Model
{
    protected $table = 'lessons';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
