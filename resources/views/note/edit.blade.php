@extends('layouts.administrator.master')

@section('title', '编辑笔记内容')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        编辑笔记顺序
                    </div>
                    <div class="panel-body">
                        <a href="{{URL::route('note.manage',1)}}"
                           class="btn btn-success">返回</a>
                    </div>
                    <div class="panel-body">
                        <form action="{{ URL::route('note.edit.do', $note->id) }} " method="post"
                              class="form-group">
                            {{csrf_field()}}
                            <label class="control-label">笔记顺序:</label><input title="图文名称" type="text" name="sort"
                                                                             value="{{$note->sort  or ''}}"
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
