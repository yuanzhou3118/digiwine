/*
    qz common.js
*/
function Delay(func, time) {
    setTimeout(function () {
        typeof  func == "function" && func();
    }, time || 800);
}

//Delay(function(){
//    $("#video-tip").show().click(function(){
//        $(this).hide();
//    })
//},3000);

function rightToScore(){
    CurrentTitle = "葡萄酒微课堂 - 我的品酒师资质向前迈进"+Score+"分！";
    if(User){
        Request.lesson_point(function(){
            console.log("完成课程加分 SUCCESS")
        },CurrentLesson);
    }
}
$().ready(function(){
    var qzPopTemp ='<div class="qz-pop-wrap"><div class="qz-pop login"><div class="qz-pop-title ft28 tx-center">登录注册后<br>可获得相应积分哦!</div><img class="qz-pop-icon" src="images/qz-popicon.png"> <a href="login.html" class="qz-pop-btn fl red-bg ft22 tx-center white letter-space btn">立即登录</a><div id="tryBtn" class="qz-pop-btn fr black-bg ft22 tx-center white letter-space btn">先玩一玩</div></div></div>';
    if(!User){
        $("body").append(qzPopTemp);
        $("#tryBtn").click(function(){
            $(".qz-pop-wrap").hide();
        })
    }
});

