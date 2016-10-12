<?php

use Illuminate\Database\Seeder;
use App\Models\BackendUser;

class BackendUserSeeder extends Seeder
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
            DB::statement('TRUNCATE TABLE backend_users');

            $backend_user = new BackendUser();

            $backend_user->account = 'admin';
            $backend_user->pwd = 'Qaz123*()';
            $backend_user->name = 'admin';
            $backend_user->status = true;

            $backend_user->save();

            $backend_user = new BackendUser();

            $backend_user->account = 'cpd001';
            $backend_user->pwd = 'Password01!';
            $backend_user->name = 'cpd001';
            $backend_user->status = true;

            $backend_user->save();

            $backend_user = new BackendUser();

            $backend_user->account = 'cpd002';
            $backend_user->pwd = 'asd123*()';
            $backend_user->name = 'cpd002';
            $backend_user->status = true;

            $backend_user->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
        }
    }
}
