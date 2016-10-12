<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedTinyInteger('score_type');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('type_id');
            $table->integer('score');
            $table->unsignedInteger('sort');
            $table->timestamps();

            $table->index(['user_id', 'score_type', 'sort']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('scores');
    }
}
