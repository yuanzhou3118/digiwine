<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index')->name('home');

//后台登陆
//登陆页面 #admin-login
Route::get('login', 'Admin\AdminController@login')->name('admin.login');
//提交登陆页面 #admin-login
Route::post('login', 'Admin\AdminController@doLogin')->name('admin.login.do');
//退出后台登陆 #admin-logout
Route::get('logout', 'Admin\AdminController@doLogout')->name('admin.logout');

Route::group(['middleware' => 'backend.auth'], function () {
    //帮助中心 #ac
    //数据回滚 #db-migrate-rollback
    Route::get('acdmr', 'Admin\HelpCenterController@migrateReset')->name('db.migrate.reset');
    //清空缓存 #cache-clear
    Route::get('accc', 'Admin\HelpCenterController@clearCache')->name('cache.clear');
    //数据迁移 #db-migrate
    Route::get('acdm', 'Admin\HelpCenterController@migrate')->name('db.migrate');
    //初始化数据 #db-seed
    Route::get('acds', 'Admin\HelpCenterController@seed')->name('db.seed');
    //系统设置页面 #admin-setting
    Route::get('acas', 'Admin\HelpCenterController@appSetting')->name('admin.setting');
    //执行优化操作 #admin-optimize
    Route::get('acao', 'Admin\HelpCenterController@optimize')->name('admin.optimize');
    //查看系统log
    Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index')->name('sys.log');

    //后台维护 #admin-dashboard
    Route::get('ad', 'Admin\AdminController@index')->name('admin.dashboard');

    //话题模块
    Route::get('topic-manage-{id}', 'Topic\TopicController@index')->name('topic.manage');//管理页面
    Route::get('topic-query-{id}', 'Topic\TopicController@indexDo')->name('topic.manage.do');//ajax传数据
    Route::get('topic-edit-{id}', 'Topic\TopicController@edit')->name('topic.edit');//编辑页面
    Route::post('topic-edit-{id}', 'Topic\TopicController@update')->name('topic.edit.do');
    Route::post('topic-review-{id}', 'Topic\TopicController@checkTopic')->name('topic.check.do');//审核结果

    //话题评论模块
    Route::get('topic-comment-{id}', 'Topic\TopicCommentController@index')->name('topic.comment.manage');
    Route::get('comment-query-{id}', 'Topic\TopicCommentController@indexDo')->name('topic.comment.manage.do');
    Route::post('comment-review-{id}', 'Topic\TopicCommentController@checkComment')->name('topic.comment.check.do');//审核评论结果

    //笔记模块
    Route::get('note-manage-{id}', 'Note\NoteController@index')->name('note.manage');
    Route::get('note-query-{id}', 'Note\NoteController@indexDo')->name('note.manage.do');
    Route::post('note-review-{id}', 'Note\NoteController@checkNote')->name('note.check.do');//审核结果
    Route::get('note-edit-{id}', 'Note\NoteController@edit')->name('note.edit');//编辑页面
    Route::post('note-edit-{id}', 'Note\NoteController@update')->name('note.edit.do');

    //用户模块
    Route::get('user-manage-{id}', 'UserController@index')->name('user.manage');
    Route::get('user-query-{id}', 'UserController@indexDo')->name('user.manage.do');
//    Route::get('user-edit-{id}', 'UserController@edit')->name('user.edit');//编辑页面
//    Route::post('user-edit-{id}', 'UserController@update')->name('user.edit.do');
    Route::post('user-edit-{id}', 'UserController@editKol')->name('user.edit.kol');//修改kol
});

//首页
Route::get('api-topic-home', 'Api\TopicController@home')->name('api.topic.home');//热门话题
Route::get('api-note-home', 'Api\NoteController@home')->name('api.note.home');//热门笔记


//话题
Route::get('api-topic-all', 'Api\TopicController@query')->name('api.topic.all');//所有话题接口（带分页）
Route::get('api-topic-view', 'Api\TopicController@view')->name('api.topic.view');//查看话题接口
Route::get('api-topic-query-comment', 'Api\TopicController@topicQueryComment')->name('api.topic.query.comment');//查询话题评论接口（带分页）

//用户登陆
Route::post('api-mb-login', 'Api\UserController@mobile')->name('api.user.mobile.login');//手机号登陆接口
Route::post('api-wechat-login', 'Api\UserController@wechat')->name('api.user.wechat.login');//微信登陆接口
Route::post('api-captcha', 'Api\UserController@captcha')->name('api.user.captcha');//接口获取验证码
Route::post('api-logout', 'Api\UserController@logout')->name('api.user.logout');//退出登录接口

//查询课程评论接口（带分页）。
Route::get('api-lesson-query-comment', 'Api\LessonQueryController@query')->name('api.lesson.query.comment');

//查询笔记。
Route::get('api-note-all', 'Api\NoteController@query')->name('api.note.all');//所有笔记接口（带分页）
Route::get('api-note-view', 'Api\NoteController@view')->name('api.note.view');//查看笔记接口

Route::group(['middleware' => 'user.auth'], function () {
    //课程模块
    //提交课程评论接口。
    Route::post('api-lesson-comment', 'Api\LessonController@comment')->name('api.lesson.comment');
    //提交课程分享接口。
    Route::post('api-lesson-share', 'Api\LessonController@share')->name('api.lesson.share');
    //提交看课程视频接口。
    Route::post('api-video-point', 'Api\LessonController@video')->name('api.lesson.video');
    //提交课程答题接口。
    Route::post('api-lesson-point', 'Api\LessonController@answer')->name('api.lesson.answer');

    //话题模块
    Route::post('api-topic-create', 'Api\TopicController@topicCreate')->name('api.topic.create');//创建话题接口
    Route::get('api-topic-favorite', 'Api\TopicController@topicFavorite')->name('api.topic.favorite');//收藏话题接口
    Route::post('api-topic-comment', 'Api\TopicController@topicComment')->name('api.topic.comment');//评论话题接口
    Route::post('api-topic-comment-like', 'Api\TopicController@topicCommentBang')->name('api.topic.comment-like');//评论话题点赞接口
    Route::get('api-topic-favorite-status', 'Api\TopicController@favoriteStatus')->name('api.topic.favorite.status');//查看是否已收藏话题
    Route::get('api-comment-bang-status', 'Api\TopicController@likeStatus')->name('api.comment.bang.status');//查看是否已收藏话题


    //笔记
    Route::post('api-note-create', 'Api\NoteController@create')->name('api.note.create');//创建笔记接口
    Route::post('api-note-favorite', 'Api\NoteController@favorite')->name('api.note.favorite');//收藏笔记接口
    Route::post('api-note-like', 'Api\NoteController@like')->name('api.note.like');//点赞笔记接口
    Route::get('api-note-status', 'Api\NoteController@status')->name('api.note.status');//查看笔记的收藏点赞状态

    //个人中心
    Route::get('api-profile-topic', 'Api\MyTopicController@topic')->name('api.profile.topic');//查询我的话题接口
    Route::get('api-profile-topic-favorite', 'Api\MyTopicController@favorite')->name('api.profile.topic.favorite');//查询我收藏的话题接口
    Route::post('api-profile-topic-delete', 'Api\MyTopicController@delete')->name('api.profile.topic.delete');//删除我收藏的话题接口
    Route::get('api-profile-note', 'Api\MyNoteController@note')->name('api.profile.note');//查询我的笔记接口
    Route::get('api-profile-note-favorite', 'Api\MyNoteController@favorite')->name('api.profile.note.favorite');//查询我收藏的笔记接口
    Route::post('api-profile-note-delete', 'Api\MyNoteController@delete')->name('api.profile.note.delete');//删除我收藏的笔记接口

    //绑定手机号接口。
    Route::post('api-binding-mobile', 'Api\MyProfileController@mobile')->name('api.profile.binding.mobile');
    //绑定手机号接口(merge)。
    Route::post('api-binding-mobile-merge', 'Api\MyProfileController@mergeMobile')->name('api.profile.binding.mobile.merge');
    //绑定微信接口。
    Route::post('api-binding-wechat', 'Api\MyProfileController@wechat')->name('api.profile.binding.wechat');
    //绑定微信接口(merge)。
    Route::post('api-binding-wechat-merge', 'Api\MyProfileController@mergeWechat')->name('api.profile.binding.wechat.merge');
    //获取个人中心信息接口。
    Route::get('api-profile-basic', 'Api\MyProfileController@basic')->name('api.profile.basic');
    //获取个人基本信息接口。
    Route::get('api-profile-detail', 'Api\MyProfileController@detail')->name('api.profile.detail');
    //更新个人基本信息接口。
    Route::post('api-profile-update', 'Api\MyProfileController@update')->name('api.profile.update');
    //更换头像接口。
    Route::post('api-profile-head', 'Api\MyProfileController@changeHeadUrl')->name('api.profile.head');
    //用户访问我的话题接口。
    Route::post('api-profile-topic-access', 'Api\MyTopicController@access')->name('api.profile.topic.access');
    //用户访问我的品酒笔记接口。
    Route::post('api-profile-note-access', 'Api\MyNoteController@access')->name('api.profile.note.access');

    //用户分享接口。
    Route::post('api-share', 'Api\ShareController@share')->name('api.share');

    //获取我的积分基本信息接口。
    Route::get('api-profile-point-basic', 'Api\MyPointController@basic')->name('api.profile.point.basic');
    //获取我的积分明细接口。
    Route::get('api-profile-point-detail', 'Api\MyPointController@query')->name('api.profile.point.detail');


    //获取笔记和话题的状态接口。
    Route::get('api-status-basic', 'Api\MyProfileController@noteAndTopicStatus')->name('api.status.basic');
});
