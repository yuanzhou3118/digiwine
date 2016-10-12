<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserOpenid
 *
 * @property string $openid
 * @method static \Illuminate\Database\Query\Builder|\App\Models\UserOpenid whereOpenid($value)
 */
class UserOpenid extends Model
{
    protected $table = 'user_openids';

    public $timestamps = false;

    public $primaryKey = 'openid';

    protected $fillable = ['openid'];
}
