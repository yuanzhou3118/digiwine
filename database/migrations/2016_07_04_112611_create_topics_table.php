<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->integer('tag');//标签
            $table->string('question',300);//话题内容
            $table->integer('share')->default(0);//分享数量
            $table->integer('favorite')->default(0);//收藏数量
            $table->integer('sort')->default(999);
            $table->integer('comment_count')->default(0);//评论数
            $table->integer('status')->default(0);//审核状态
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('topics');
    }
}
