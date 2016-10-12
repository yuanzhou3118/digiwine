@extends('layouts.administrator.master')
@section('title', '后台管理')
@section('content')
    <div class="container-fluid">
        <div class="jumbotron">
            <div class="container">
                <h1>欢迎您，{{session('bk_name')}} 来到维护界面。</h1>
            </div>
        </div>
    </div>
@endsection
