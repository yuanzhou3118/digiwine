<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();

        try {
            DB::statement('TRUNCATE TABLE users');

            $user = new User();

            $user->id = 1;
            $user->mobile = '13636367264';
            $user->source = 'wechat_own_post';
            $user->head_url = '';
            $user->nick_name = '';
            $user->openid = '';
            $user->kol = 0;
            $user->gender = 0;
            $user->interest = '';
            $user->profession = 0;
            $user->created_at = date('Y-m-d H:i:s', time());
            $user->updated_at = date('Y-m-d H:i:s', time());

            $user->save();

            $user = new User();

            $user->id = 2;
            $user->mobile = '18621969518';
            $user->source = '';
            $user->head_url = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUQ1B3pbFzZpQe9yXxQ91twHqamjTrRDXicIW6icNdKQgAImhyibsGXicdZBBkPSib19aibNjIV0jndpfQ/0';
            $user->nick_name = '那片浮云';
            $user->openid = 'otWGmt6SWrrOuGhfOzH3-gQUYBBg';
            $user->kol = 0;
            $user->gender = 0;
            $user->interest = '';
            $user->profession = 0;
            $user->created_at = date('Y-m-d H:i:s', time());
            $user->updated_at = date('Y-m-d H:i:s', time());

            $user->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
        }
    }
}
