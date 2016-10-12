<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nick_name', 100);
            $table->string('head_url', 200);
            $table->string('mobile', 50);
            $table->string('openid', 100);
            $table->string('area', 20);
            $table->string('source', 50);
            $table->unsignedTinyInteger('kol');
            $table->unsignedTinyInteger('gender');
            $table->string('birthday', 50);
            $table->string('interest', 200);
            $table->string('profession', 100);
            $table->boolean('status');
            $table->timestamps();

            $table->index('openid');
            $table->index('mobile');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
