@extends('layouts.administrator.master')

@section('title', '编辑杰卡斯专家')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        编辑杰卡斯专家
                    </div>
                    <div class="panel-body">
                        <a href="{{URL::route('user.manage',1)}}"
                           class="btn btn-success">返回</a>
                    </div>
                    <div class="panel-body">
                        <form action="{{ URL::route('user.edit.do', $user->id) }} " method="post"
                              class="form-group">
                            {{csrf_field()}}
                            <label class="control-label">kol:</label><input title="kol" type="text" name="kol"
                                                                             value="{{$user->kol  or ''}}"
                                                                             class="form-control required"><br>
                            <input type="submit" value="保存" class="btn btn-primary form-control">
                            <label>{{$result or ''}}</label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        #text li {
            display: none;
        }
    </style>

@endsection
