@extends('master')

@section('title', '新增多图文消息')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        新增多图文消息
                    </div>
                    <div class="panel-body">
                        <a href="{{URL::route('wechat.news.manage')}}"
                           class="btn btn-success">返回</a>
                    </div>
                    <div class="panel-body">
                        <form action="{{ URL::route('wechat.news.create.do') }} " method="post"
                              class="form-group">
                            {{csrf_field()}}
                            <label class="control-label">图文名称:</label><input title="图文名称" type="text" name="name"
                                                                             class="form-control required"><br>
                            <input type="submit" value="新增" class="btn btn-primary form-control">
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
