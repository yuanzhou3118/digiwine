<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserMobile
 *
 * @property string $mobile
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserMobile whereMobile($value)
 */
class UserMobile extends Model
{
    protected $table = 'user_mobiles';

    public $timestamps = false;

    public $primaryKey = 'mobile';

    protected $fillable = ['mobile'];
}
