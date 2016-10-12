/**
 * Created by 孙明 on 2015/11/20.
 */
var Debugger = false;

if (Debugger) {
    window.onerror = function (sMsg, sUrl, sLine) {
        alert("An error was thrown and caught.Error: " + sMsg + "Line: " + sLine + "URL: " + sUrl);
    }
}

var weChat_name = decodeURIComponent(getUrlParameter('nickname'));
var weChat_avatarurl = getUrlParameter('headimgurl');
var weChat_openid = getUrlParameter('openid');
var CurrentTitle = "";
var CurrentShareImage = "";
var ShareUrl = "";

//var RedirectVhost ="http://192.168.1.6:8080/wine/";//"http://digiwine.nurunci.com/";//
//var RedirectVhost = VHost = "http://digiwine.nurunci.com/";
//var RedirectVhost = VHost = "http://www.digiwine.com/";
var RedirectVhost = VHost = location.origin;//"http://digi_test.nurunci.com/";

var ImageUrlHeader = VHost + "api/avatars/";
var weChatUser = null;
var User = null;

var testSite = ".nurunci.com";
var mockTest = true;
if (location.host.indexOf(testSite) != -1) {
    mockTest = false;
}


if (weChat_openid) {
    //获取cookie中的cookie
    clearWechar();
    saveWechat(weChat_openid, weChat_avatarurl, weChat_name);
}

weChatUser = getWechat();
User = getUser();
var _para = location.href.split('?');
$().ready(function () {
    var winWidth = $(window).width();
    if (winWidth > 767 && winWidth <= 1100) {
        if (_para.length > 1) {
            location.href = "ipad.html?" + _para[1];
        } else {
            location.href = "ipad.html";
        }
    } else if (winWidth > 1100) {
        if (_para.length > 1) {
            location.href = "pc.html?" + _para[1];
        } else {
            location.href = "pc.html";
        }
    }
    if(getUser() && location.href.indexOf("login")==-1){
        //获取我的最新状态 (话题笔记评论是否有更新)
        Request.status_basic(function(resultData){
            if(resultData.status){
                //有相关更新
                $(".user-head").append("<i class='red-circle'></i>")
            }
        })
    }

});
if (!isEighteen() && location.href.indexOf("enter.html") == -1) {
    if (_para.length > 1) {
        location.href = "enter.html?" + _para[1];
    } else {
        location.href = "enter.html";
    }
}
function loadingShow() {
    $('.loading-pop').show();
}
function loadingHide() {
    $('.loading-pop').hide();
}

function resize() {
    var extraFooterHeight = 0;
    if ($(".footer").hasClass("fix")) {
        extraFooterHeight = 460
    }
    var height = $(".main-wrap").height() + 100 + extraFooterHeight;//100 = header.height,640 = footer.height
    if (height < $(window).height()) {
        $(".footer").addClass("fix");
    } else {
        $(".footer").removeClass("fix");
    }
}

$().ready(function () {
    $(window).resize(function () {
        resize();
    });
    resize();

    //template render
    var $header = $(".header");
    if ($header.length && !$header.html()) {
        $header.html(Mustache.render(Temp_header));
    }
    var $footer = $(".footer");
    if ($footer.length && !$footer.html()) {
        $footer.html(Mustache.render(Temp_footer));
    }

    var $kvpop = $("#kv-pop");
    if ($kvpop.length) {
        $kvpop.html(Mustache.render(Temp_kvpop));
    }


    $("#footer-qr").click(function () {
        popQrcode();
    })

    if (isWechat()) {
        WeChatConfig();
    }
    var loadinghtml = '<div class="loading-pop" style="display:none"><img src="img2/loading2.gif" class="loading-icon" /></div>';
    $('body').append(loadinghtml);
    function loginStatusUpdate() {
        if (getUser()) {
            //登录状态显示
            $("#loginedBar").show().removeClass("hidden");
            $(".login").hide();
            $(".logined").show().removeClass("hidden");
            $(".logined-hidden").hide();
            if (User.avatarurl) {
                $(".header .user-head img").attr("src", User.avatarurl);
            }
        } else {
            $("#loginBar").show();
            $(".login").show();

            //popLogin();
        }
    }

    var status = getUrlParameter("status");
    if (status == "login") {
        Request.wechat_login(function (data) {
            alert("登录成功");
            location.href = "index.html";
            //TODO
            //saveUser(data.userinfo);
        }, weChatUser.openid, weChatUser.name, weChatUser.avatarurl)

    } else if (status == "bind") {
        Request.binding_wechat(function () {
            alert("微信号绑定成功");
            loginStatusUpdate();
        }, weChatUser.openid, weChatUser.name, weChatUser.avatarurl);
    } else {
        loginStatusUpdate();
    }

    //common component
    $topBtn = $(".top-btn");
    $topBtn.click(function () {
        $("body").animate({
            scrollTop: 0
        }, 600);
    });
    $document = $(document)
    if($document.scrollTop() == 0){
        $topBtn.addClass("hidden");
    }else{
        $topBtn.removeClass("hidden");
    }
    var scrollTimeOut = null;
    $document.scroll(function(){
        if(scrollTimeOut){
            clearTimeout(scrollTimeOut);
        }
        scrollTimeOut = setTimeout(function(){
            if($document.scrollTop()>0){
                $topBtn.removeClass("hidden");
            }else{
                $topBtn.addClass("hidden");
            }
            scrollTimeOut = null;
        },100);
    })

    $(".header .title").click(function () {
        location.href = "index.html";
    });

    $(".share").click(function (e) {
        var title = $(this).attr("title");
        title && (CurrentTitle = $(this).attr("title"));
        var ShareImage = [VHost + 'images/share1.jpg', VHost + 'images/share2.jpg', VHost + 'images/share3.jpg'];
        var index = parseInt($(this).attr("image"));
        index && (CurrentShareImage = ShareImage[index])
        if (isWechat()) {
            WeChatConfig();
            popShare();
        } else {
            datapush(gaTrackingData[15]);
            window.open('http://service.weibo.com/share/share.php?appkey=&title=' + CurrentTitle + '&url=' + location.href + '&pic=' + CurrentShareImage + '&searchPic=false&style=simple')
        }
        e.stopPropagation();
    });

    var NavShow = false;
    var LeftNav = '<div class="left-nav-wrap"><a href="index.html"><div class="left-nav-title letter-space"></div></a>' +
        '<ul class="left-nav-list">' +
            //'<a href="index.html" data-ga="10"><li>首页</li></a> '+
        '<a href="courses.html" data-ga="73"><li class="nav-lesson">课程</li></a> ' +
        '<a href="topic.html" data-ga="74"><li class="nav-topic">话题</li></a> ' +
        '<a href="note.html" data-ga="75"><li class="nav-note">笔记</li></a> ' +
        '<a href="account.html" data-ga="76"><li class="nav-person">个人中心</li></a> ' +
            //'<a href="help.html" data-ga="12"><li>我的积分</li></a>'+
        '<li class="nav-bar-li" id="focusBtn" data-ga="77">关注杰卡斯官方微信</li><a data-ga="14" href="http://www.wemart.cn/v2/weimao/index.html?disableCache=true&amp;shopId=shop000201508069955&amp;from=singlemessage&amp;isappinstalled=0#mad/shop000201508069955/214">' +
        '<li class="nav-bar-li" data-ga="78">杰卡斯官方微商城</li></a></ul></div>';
    $("body").append(LeftNav);
    $(".nav,.menu-icon").click(function () {
        if (!NavShow) {
            $(".main-wrap").velocity({
                left: '425px'
            }, {
                duration: 500,
                complete: function () {
                }
            })
            $(".left-nav-wrap").velocity({
                left: '0px'
            }, {
                duration: 500
            })
            $(".main-wrap-cover").show();
            NavShow = true;
            $(this).addClass("showed");
        } else {
            NavShow = false;
            $(this).removeClass("showed");
            $(".main-wrap").velocity({
                left: '0px'
            }, {
                duration: 500
            })

            $(".left-nav-wrap").velocity({
                left: '-425px'
            }, {
                duration: 500
            })
            $(".main-wrap-cover").hide();
        }
    });
    $(".main-wrap-cover").click(function () {
        NavShow = false;
        $(".main-wrap").velocity({
            left: '0px'
        }, {
            duration: 500
        });
        $(".left-nav-wrap").velocity({
            left: '-425px'
        }, {
            duration: 500
        })
        $(".main-wrap-cover").hide();
        $(".nav,.menu-icon").removeClass("showed")
    });

    $("#kv-pop").click(function () {
        $(this).hide();
        $("body").css({
            overflow: "auto"
        });

        $(".main-wrap").css({
            overflow: 'hidden'
        });
    });

    $("#focusBtn").click(function () {
        popQrcode();
    })

})

//function saveUser(userinfo) {
//    userinfo.id && Cookie.setCookie("digiwine_id", userinfo.id);
//    userinfo.mobile && Cookie.setCookie("digiwine_mobile", userinfo.mobile);
//    userinfo.avatarurl ? Cookie.setCookie("digiwine_avatarurl", userinfo.avatarurl) : Cookie.delCookie("digiwine_avatarurl");
//    if (!userinfo.name && !userinfo.mobile) {
//        popNickName();
//    } else if (!userinfo.name) {
//        popNickName();
//    } else if (!userinfo.mobile) {
//        popMobile();
//    }
//    userinfo.name ? Cookie.setCookie("digiwine_name", userinfo.name) : Cookie.setCookie("digiwine_name", "匿名用户");
//    userinfo.openid ? Cookie.setCookie("digiwine_openid", userinfo.openid) : Cookie.delCookie("digiwine_openid");
//    User = getUser();
//}

function clearUser() {
    Cookie.delCookie("digiwine_avatarurl");
    Cookie.delCookie("digiwine_mobile");
    Cookie.delCookie("digiwine_name");
    Cookie.delCookie("digiwine_openid");
    Cookie.delCookie("digiwine_wechat");
    Cookie.delCookie("digiwine_login");
    User = null;
}

function getUser() {
    //var id = Cookie.getCookie("digiwine_id");
    var avatarurl = Cookie.getCookie("digiwine_avatarurl") && decodeURIComponent(Cookie.getCookie("digiwine_avatarurl"));
    if (Cookie.getCookie("digiwine_login") && avatarurl) {
        //TODO 登录后判断是否绑定手机或微信,提示响应浮层
        //        if (!userinfo.name && !userinfo.mobile) {
        //    popNickName();
        //} else if (!userinfo.name) {
        //    popNickName();
        //} else if (!userinfo.mobile) {
        //    popMobile();
        //}
        User = {
            avatarurl: avatarurl,
            mobile: parseInt(Cookie.getCookie("digiwine_mobile")),
            wechat: parseInt(Cookie.getCookie("digiwine_wechat"))
        }
        if (!User.mobile) {
            //popMobile();
        } else if (!User.wechat) {
            //TODO
        }
        return User;
    } else {
        return null;
    }

    //var mobile = Cookie.getCookie("digiwine_mobile");
    //var name = Cookie.getCookie("digiwine_name");
    //var openid = Cookie.getCookie("digiwine_openid");
}
function updateUserAvatar(url) {
    Cookie.setCookie("digiwine_avatarurl", url);
    User = getUser();
}
function updateUserName(name) {
    Cookie.setCookie("digiwine_name", name);
    User = getUser();
}
function updateUserOpenid(openid) {
    Cookie.setCookie("digiwine_openid", openid);
    User = getUser();
}
function updateUserMobile(mobile) {
    Cookie.setCookie("digiwine_mobile", mobile);
    User = getUser();
}
function saveWechat(openid, avatarurl, name) {
    openid && Cookie.setCookie("digiwine_weChat_openid", openid)
    avatarurl && Cookie.setCookie("digiwine_weChat_avatarurl", avatarurl)
    name && Cookie.setCookie("digiwine_weChat_name", name);
    weChatUser = getWechat();
}
function clearWechar() {
    Cookie.delCookie("digiwine_weChat_openid")
    Cookie.delCookie("digiwine_weChat_avatarurl")
    Cookie.delCookie("digiwine_weChat_name");
}

function saveLessonHistory(lid) {
    var history = getLessonHistroy();
    if (history) {
        var exist = -1;
        for (var i = 0; i < history.length; i++) {
            if (lid == history[i]) {
                exist = i;
            }
        }
        if (exist != -1) {
            history.splice(exist, 1);
        }
        history.unshift(lid);

    } else {
        history = [lid];
    }
    Cookie.setCookie("digiwine_lessonhHistory", encodeURI(JSON.stringify(history)))
}
function saveLoginType(type) {
    Cookie.setCookie("digiwine_loginType", type);
}
function getLoginType() {
    return Cookie.getCookie("digiwine_loginType");
}

function getLessonHistroy() {
    var cookiestr = Cookie.getCookie("digiwine_lessonhHistory");
    if (cookiestr) {
        return JSON.parse(decodeURI(cookiestr));
    } else {
        return null;
    }
}
function clearLessonHistory() {
    Cookie.delCookie("digiwine_lessonhHistory");
}

function addAgreement() {
    Cookie.setCookie("digiwine_is18", "true");
}
function isEighteen() {
    return Cookie.getCookie("digiwine_is18");
}
function clearEighteen() {
    Cookie.delCookie("digiwine_is18");
}

function getOpenid() {
    return Cookie.getCookie("digiwine_openid");
}
function getWechat() {
    var openid = Cookie.getCookie("digiwine_weChat_openid");
    var avatarurl = Cookie.getCookie("digiwine_weChat_avatarurl");
    var name = Cookie.getCookie("digiwine_weChat_name");

    if (openid) {
        return {
            openid: openid,
            avatarurl: avatarurl,
            name: name
        }
    } else {
        return null;
    }
}

function toLogin() {
    if (!getUser()) {
        //alert("请先登录!");
        location.href = "login.html"
    }
}

function WeChatConfig() {
    $.ajax({
        'url': 'http://glp.nurunci.com/wc/get_signature.php?signurl=' + encodeURIComponent(location.href),
        'type': 'GET',
        'success': function (data) {
            var jdata = $.parseJSON(data);
            if (jdata.appId) {
                var conObj = {
                    debug: true,
                    appId: jdata.appId,
                    timestamp: jdata.timestamp,
                    nonceStr: jdata.nonceStr,
                    signature: jdata.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                }

                var WXtitle = CurrentTitle || "葡萄酒微课堂，开课啦！",
                    WXLink = ShareUrl || location.href,
                    WXimgUrl = CurrentShareImage || VHost + 'images/share1.jpg';
                WXdesc = '';

                wx.config(conObj);

                //alert(WXtitle+" "+WXimgUrl)
                wx.ready(function () {

                    wx.onMenuShareTimeline({
                        title: WXtitle,
                        link: WXLink,
                        imgUrl: WXimgUrl,
                        success: function () {
                            //alert("朋友圈分享成功");
                            //Request.add_score(4, User.id, "");
                            if (User) {
                                Request.share(function () {
                                    console.log("用户分享成功");
                                })
                            }
                            datapush(gaTrackingData[16]);
                        },
                        cancel: function () {

                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: WXtitle,
                        desc: WXdesc,
                        link: WXLink,
                        imgUrl: WXimgUrl,
                        type: '',
                        dataUrl: '',
                        success: function () {
                            //alert("成功分享给朋友");
                            //Request.add_score(4, User.id, "");
                            if (User) {
                                Request.share(function () {
                                    console.log("课程分享成功");
                                })
                            }
                            datapush(gaTrackingData[16]);
                        },
                        cancel: function () {

                        }
                    });
                });

                wx.error(function (res) {
                    //alert(res);
                });

            }
        }
    });
}

function drawVideo($wraper, source, poster, play_track, end_track) {
    var mp4 = source;
    var html = [];
    var width = $wraper.width();
    var height = $wraper.height();
    html.push('<video id="really-cool-video" class="video-js vjs-default-skin" controls preload="auto" width =' + width + ' height=' + height + ' poster="' + poster + '" data-setup="{}">');
    html.push('<source src="' + mp4 + '" type="video/mp4">');
    html.push('<p class="vjs-no-js">');
    html.push(' To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>');
    html.push('</p></video>');
    $wraper.html(html.join(""));
    //SimplePreloading.hide();
    return Video = videojs('really-cool-video', {"controls": true}, function () {
        //his.play(); // if you don't trust autoplay for some reason
        // How about an event listener?
        Video.on("play", function () {
            play_track && play_track();
        });

        Video.on('ended', function () {
            end_track && end_track();
        })
    });
}

function popShare() {
    var $share = $("#popShare");
    if ($share.length) {
        $share.show();
    } else {
        $share = $("<div id='popShare' class='pop-wrap'><img src='images/other/share.png'></div>");
        $("body").append($share);
    }
    $share.unbind("click").click(function () {
        $(this).hide();
    })
}

function popBind(mobile) {
    var $bind = $("#bind-pop");
    var accountName = "手机账户";
    if (mobile) {
        accountName = "微信账户"
    }
    if ($bind.length) {
        $bind.removeClass("hidden");
    } else {
        $bind = $('<div id="bind-pop" class="pop-wrap hidden"><div class="bind-pane">' +
            '<div class="bind-tit">您绑定' + accountName + '有更高的积分<br>建议您切换至该账号</div>' +
            '<div class="bind-btn-wrap">' +
            '<div id="mergeChange" class="active" data-ga="41">切换</div>' +
            '<div id="noMergeChange" data-ga="42">不切换</div>' +
            '</div>' +
            '<div class="footer" style="width:100%;height:55px;text-align: center;line-height:55px;font-size:18px;color:#000;background:#ecebeb;position: absolute;bottom:0;">*所有用户行为以切换账号为主</div>' +
            '</div>' +
            '</div>');
        $("body").append($bind);
        $("#bind-pop").removeClass("hidden");
        $("#mergeChange").click(function () {
            if (mobile) {
                Request.binding_mobile_merge(function () {
                    alert("帐号绑定成功");
                    $bind.addClass("hidden");
                    location.href = "account.html";
                }, 1)
            } else {
                Request.binding_wechat_merge(function () {
                    alert("帐号绑定成功");
                    $bind.addClass("hidden");
                    location.href = "account.html";
                }, 1)

            }

        })
        $("#noMergeChange").click(function () {
            if (mobile) {
                Request.binding_mobile_merge(function () {
                    alert("帐号绑定成功");
                    $bind.addClass("hidden");
                    location.href = "account.html";
                }, 2)
            } else {
                Request.binding_wechat_merge(function () {
                    alert("帐号绑定成功");
                    $bind.addClass("hidden");
                    location.href = "account.html";
                }, 2)
            }
        })
    }
}

function popQrcode() {
    $("#kv-pop img").css({
        "padding-top": ($("html").height() - 400) / 2
    });
    $("#kv-pop").show();
    $("body").css({
        overflow: "hidden"
    });
    $(".main-wrap").css({
        overflow: 'auto'
    });
}

function popLogin() {
    var cookieName = "digiwine_loginstatus";
    if (location.href.indexOf("index.html") != -1 || location.href.indexOf("lesson") != -1) {
        if (!Cookie.getCookie(cookieName)) {
            setTimeout(function () {
                var $loginPop = $("#login-pop");
                if (!$loginPop.length) {
                    $loginPop = $('<div id="login-pop" class="pop-wrap hidden"><img src="images/other/new-login-pop.png"><a href="login.html" class="new-login-btn"></a><div class="new-login-closeBtn"></div></div>');
                    $("body").append($loginPop);
                }

                $loginPop.show();
                $(".new-login-closeBtn").unbind("click").bind("click", function () {
                    $loginPop.hide();
                    Cookie.setCookie(cookieName, "1", 1);
                });
            }, 10 * 1000);
        }
    }
}

function popNickName() {
    var cookieName = "digiwine-nicknamepop";
    if (location.href.indexOf("index.html") != -1 || location.href.indexOf("lesson") != -1) {
        if (!Cookie.getCookie(cookieName)) {
            setTimeout(function () {
                var $nicknamePop = $("#nickname-pop");
                if (!$nicknamePop.length) {
                    $nicknamePop = $('<div id="nickname-pop" class="pop-wrap hidden"><img src="images/other/new-nickname-pop.png"><a href="setting_person.html" class="new-nickname-btn"></a><div class="new-nickname-closeBtn"></div></div>');
                    $("body").append($nicknamePop);
                }
                $nicknamePop.show();
                $(".new-nickname-closeBtn").unbind("click").bind("click", function () {
                    $nicknamePop.hide();
                    Cookie.setCookie(cookieName, "1", 1);
                });
            }, 10 * 1000);
        }
    }
}

function popMobile() {
    var cookieName = "digiwine-mobilepop";
    if (location.href.indexOf("index.html") != -1 || location.href.indexOf("lesson") != -1) {
        if (!Cookie.getCookie(cookieName)) {
            setTimeout(function () {
                var $mobilePop = $("#nickname-pop");
                if (!$mobilePop.length) {
                    $mobilePop = $('<div id="mobile-pop" class="pop-wrap hidden">' +
                        '<img src="images/other/bind-mobile.png">' +
                        '<a href="setting_mobile.html" class="new-mobile-btn"></a>' +
                        '<div class="new-mobile-closeBtn"></div></div>');
                    $("body").append($mobilePop);
                }
                $mobilePop.show();
                $(".new-mobile-closeBtn").unbind("click").bind("click", function () {
                    $mobilePop.hide();
                    Cookie.setCookie(cookieName, "1", 1);
                });
            }, 10 * 1000);
        }
    }
}