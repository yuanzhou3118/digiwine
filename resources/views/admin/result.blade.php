@extends('layouts.administrator.master')
@section('title', '执行结果')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        执行结果
                    </div>
                    <div class="panel-body">
                        <a href="{{URL::route('admin.setting')}}"
                           class="btn btn-info">返回</a>
                    </div>
                    <p class="text-center">{{$result or ''}}</p><br><br>
                </div>
            </div>
        </div>
    </div>
@endsection
