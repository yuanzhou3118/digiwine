<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\User
 *
 * @property integer $id
 * @property string $nick_name
 * @property string $head_url
 * @property string $mobile
 * @property string $openid
 * @property string $area
 * @property string $source
 * @property boolean $kol
 * @property boolean $gender
 * @property string $birthday
 * @property string $interest
 * @property string $profession
 * @property boolean $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereNickName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereHeadUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereMobile($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereOpenid($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereArea($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereSource($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereKol($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereGender($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereBirthday($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereInterest($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereProfession($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\User whereUpdatedAt($value)
 */
class User extends Model
{
    protected $table = 'users';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
