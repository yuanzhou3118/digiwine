<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BackendUser
 *
 * @property integer $id
 * @property string $account
 * @property string $pwd
 * @property boolean $status
 * @property string $name
 * @property string $ip
 * @property string $last_login
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereAccount($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser wherePwd($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereIp($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereLastLogin($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\BackendUser whereUpdatedAt($value)
 */
class BackendUser extends Model
{
    protected $table = 'backend_users';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
