<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('content',300);
            $table->string('imga',150)->nullable();
            $table->string('imgb',150)->nullable();
            $table->string('imgc',150)->nullable();
            $table->string('wine_name',100);
            $table->string('grape_varieties',50);//葡萄品种
            $table->string('country',50);//国家
            $table->string('place_of_origin',150);//产地
            $table->string('price',20);
            $table->string('years',10);
            $table->unsignedTinyInteger('score')->default(1);
            $table->string('color',10);
            $table->string('aroma_characteristics',50);//香气特征
            $table->string('flavor_characteristics',50);//风味特征
            $table->unsignedTinyInteger('acid')->default(1);//酸度
            $table->unsignedTinyInteger('tannic')->default(1);//单宁
            $table->unsignedTinyInteger('texture')->default(1);//质感
            $table->unsignedTinyInteger('wine_body')->default(1);//酒体
            $table->unsignedTinyInteger('sweetness')->default(1);//甜度
            $table->unsignedTinyInteger('aftertaste')->default(1);//回味
            $table->unsignedInteger('note_likes')->default(0);//笔记点赞数
            $table->unsignedInteger('note_favorites')->default(0);//笔记收藏数
            $table->integer('status')->default(0);//审核状态
            $table->unsignedInteger('sort')->default(999);//排序
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
        Schema::drop('notes');
    }
}
