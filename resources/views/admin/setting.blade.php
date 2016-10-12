@extends('layouts.administrator.master')

@section('title', '系统设置')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">系统设置</div>
                    <div class="panel-body">
                        <a href="{{ URL::route('admin.optimize') }}" class="btn btn-success">执行系统优化</a><br><br>
                        <a href="{{ URL::route('db.migrate') }}" class="btn btn-success">执行数据迁移</a><br><br>
                        <a href="{{ URL::route('db.migrate.reset') }}" class="btn btn-success">重置数据迁移</a><br><br>
                        <a href="{{ URL::route('cache.clear') }}" class="btn btn-success">执行清空缓存</a><br><br>
                        <a href="{{ URL::route('db.seed') }}" class="btn btn-success">初始化DB数据</a><br><br>
                        <a href="{{ URL::route('sys.log') }}" class="btn btn-success">查看系统日记</a><br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
