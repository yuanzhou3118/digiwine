@extends('layouts.administrator.master')

@section('title', '笔记管理')

@section('content')
    <style>
        #pager {
            padding: 0 10px;
            margin: 10px 0;
            overflow: hidden;
        }

        #pager a {
            display: block;
            text-transform: uppercase;
            font-size: 12px;
            float: left;
        }

        #pager a.number {
            border: 1px solid #ccc;
            text-decoration: none;
            margin: 0 5px 0 0;
            padding: 5px;
            background: #f0f0f0;
            color: #333;
        }

        #pager a.hover {
            border: 1px solid #f00;
        }

        #pager a.empty {
            display: none;
        }

        #pager a.current {
            border: 1px solid #003f7e;
            color: #000;
            font-weight: 700;
            background-color: #eee;
        }

        .pagetotle {
            float: right;
        }
    </style>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">笔记管理</div>
                    <div class="panel-body">
                        <div class="col-md-2 form-group">
                            <label class="control-label">审核状态：</label>
                            <select title="status" class="form-control" id="status">
                                <option value="2" selected="selected">不限</option>
                                <option value="0">待审核</option>
                                <option value="1">审核通过</option>
                                <option value="-1">审核未通过</option>
                            </select>
                        </div>
                        <div class="col-md-2 form-group">
                            <br>
                            <button type="button" class="btn btn-primary" id="query_btn">查询</button>
                        </div>
                    </div>
                    <div id="pager">
                    </div>
                    <div id="info">
                    </div>
                </div>
            </div>
        </div>
    </div>

@section('footer_js')
    <script type="text/javascript" src="{{URL::asset('assets/javascript/jquery.pager.topic.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/javascript/jquery.blockUI.js')}}"></script>
    <script type="text/javascript">
        $(function () {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
        });
    </script>
    <script>
        window.approvalUrl = '{{URL::route('note.check.do', 1)}}';
        window.queryUrl = '{{URL::route('note.manage.do', 1)}}';
        window.loadImgUrl = '{{URL::asset('assets/images/loading.gif')}}';
        window.eidtNote = '{{URL::route('note.edit', 1)}}';

        window.approvalUrl = window.approvalUrl.substring(0, window.approvalUrl.length - 1);
        window.queryUrl = window.queryUrl.substring(0, window.queryUrl.length - 1);
        window.eidtNote = window.eidtNote.substring(0, window.eidtNote.length - 1);


    </script>
    <script type="text/javascript" src="{{URL::asset('assets/javascript/note.query.js')}}"></script>
@endsection

@endsection
