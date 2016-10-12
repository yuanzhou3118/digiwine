<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>后台登录</title>
    <link rel="stylesheet" href="{{URL::asset('assets/css/bootstrap.min.css')}}">
    <link rel="shortcut icon" href="{{URL::asset('favicon.ico')}}"/>
</head>
<style type="text/css">
    html, body {
        height: 100%;
    }

    .box {
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#6699FF', endColorstr='#6699FF'); /*  IE */
        background-image: linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
        background-image: -o-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
        background-image: -moz-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
        background-image: -webkit-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
        background-image: -ms-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);

        margin: 0 auto;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .login-box {
        width: 100%;
        max-width: 500px;
        height: 400px;
        position: absolute;
        top: 50%;

        margin-top: -200px;
        /*设置负值，为要定位子盒子的一半高度*/

    }

    @media screen and (min-width: 500px) {
        .login-box {
            left: 50%;
            /*设置负值，为要定位子盒子的一半宽度*/
            margin-left: -250px;
        }
    }

    .form {
        width: 100%;
        max-width: 500px;
        height: 275px;
        margin: 25px auto 0px auto;
        padding-top: 25px;
    }

    .login-content {
        height: 300px;
        width: 100%;
        max-width: 500px;
        background-color: rgba(255, 250, 2550, .6);
        float: left;
    }

    .input-group {
        margin: 0px 0px 30px 0px !important;
    }

    .form-control,
    .input-group {
        height: 40px;
    }

    .form-group {
        margin-bottom: 0px !important;
    }

    .login-title {
        padding: 20px 10px;
        background-color: rgba(0, 0, 0, .6);
    }

    .login-title h1 {
        margin-top: 10px !important;
    }

    .login-title small {
        color: #fff;
    }

    .link p {
        line-height: 20px;
        margin-top: 30px;
    }

    .btn-sm {
        padding: 8px 24px !important;
        font-size: 16px !important;
    }
</style>
<body>
<div class="box">
    <div class="login-box">
        <div class="login-title text-center">
            <h1>
                <small>登录</small>
            </h1>
        </div>
        <div class="login-content ">
            <div class="form">
                <form action="{{URL::route('admin.login.do')}}" class="panel-body wrapper-lg" method="post">
                    {{csrf_field()}}
                    <div class="form-group">
                        <div class="col-xs-12">
                            <div class="input-group">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                                <input type="text" name="account" placeholder="用户名" class="form-control"
                                       value="{{$backend_user->account}}">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                            <div class="input-group">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                                <input type="password" name="pwd" placeholder="密码" class="form-control"
                                       value="{{$backend_user->pwd}}">
                            </div>
                        </div>
                    </div>
                    <div class="pull-right m-t-xs">
                        <span>{{$result or ''}}</span>
                    </div>
                    <div class="form-group form-actions">
                        <div class="col-xs-4 col-xs-offset-4 ">
                            <button type="submit" class="btn btn-sm btn-info"><span
                                        class="glyphicon glyphicon-off"></span> 登录
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{URL::asset('assets/javascript/jquery-1.12.2.min.js')}}"></script>
<script type="text/javascript" src="{{URL::asset('assets/javascript/bootstrap.min.js')}}"></script>
</body>
</html>