<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title> @yield('title') </title>
    <link rel="stylesheet" href="{{URL::asset('assets/css/bootstrap.min.css')}}">
    @yield('css')
    @yield('header_js')
</head>
<body>
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="{{ URL::route('admin.dashboard')}}">后台管理</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a href="{{ URL::route('sys.log')}}">系统日记</a></li>
                <li><a href="{{ URL::route('user.manage', 1) }}">用户管理</a></li>
                <li><a href="{{ URL::route('topic.manage', 1) }}">话题管理</a></li>
                <li><a href="{{ URL::route('note.manage', 1) }}">笔记管理</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="{{URL::route('admin.logout')}}">登出</a></li>
            </ul>
        </div>
    </div>
</nav>
@yield('content')
<script src="{{URL::asset('assets/javascript/jquery-1.12.2.min.js')}}"></script>
<script src="{{URL::asset('assets/javascript/bootstrap.min.js')}}"></script>
@yield('footer_js')
</body>
</html>