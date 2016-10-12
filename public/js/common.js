//移动端版本兼容
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth / 640;
var ua = navigator.userAgent;
var cookieDomain = ".nurunci.com";

if (/Android (\d+\.\d+)/.test(ua)) {
    var version = parseFloat(RegExp.$1);
    if (version > 2.3) {
        document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
    } else {
        document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
    }
} else {
    document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}

/* 获取url parameter*/
function getUrlParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

function g(n) {
    return ((new Number(n).toFixed(2)));
}

/* 验证 */
var Validate = {
    isPhone: function (v) {
        var patrnPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        return patrnPhone.test(v)
    },
    isEmpty: function (v) {
        if (v && v.length != 0 || v === 0) {
            return false;
        } else {
            return true;
        }
    },
    isEmail: function (v) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    isCodeNumber: function (v) {
        var reg = /^\d{4}$/;
        if (reg.test(v)) {
            return true;
        } else {
            return false;
        }
    }
}

//写cookies
var Cookie = {
    setCookie: function (name, value, days) {
        var Days = days || 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Cookie.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}


/* 屏幕翻滚监控 */
var deviceType = '';
var viewport = $('meta[name=viewport]');

if (ua.indexOf('iPhone') > 0) {
    deviceType = 'isIphone';
} else if (ua.indexOf('Android') > 0) {
    deviceType = 'isAndroid';
}
if (deviceType === 'isAndroid' && Math.abs(window.orientation) === 90) {
    viewport.attr('content', 'width=1000, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=yes');
}

var TagMap = {
    999: "热门",
    1: "价格",
    2: "品鉴",
    3: "餐酒搭配",
    4: "器具",
    5: "其他"
}

var colorMap = {
    1: "柠檬黄",
    2: "金黄色",
    3: "琥珀色",
    4: "紫色",
    5: "宝石红",
    6: "石榴红",
    7: "棕色",
    8: "桃红色",
    9: "三文鱼色",
    10: "橙色",
}

var aroMap = {
    1: "柠檬",
    2: "葡萄柚",
    3: '橙子',
    4: '菠萝',
    5: '香蕉',
    6: '荔枝',
    7: '香瓜',
    8: '麝香葡萄',
    9: '苹果',
    10: '水梨',
    11: '榲桲',
    12: '草莓',
    13: '覆盆子',
    14: '红醋栗',
    15: '黑醋栗',
    16: '蓝圆莓',
    17: '黑莓',
    18: '樱桃',
    19: '杏子',
    20: '水蜜桃',
    21: '杏仁',
    22: '李子干',
    23: '核桃',
    24: '山楂花',
    25: '洋槐花',
    26: '椴花',
    27: '蜂蜜',
    28: '玫瑰',
    29: '紫罗兰',
    30: '青椒',
    31: '蘑菇',
    32: '松露',
    33: '酵母',
    34: '雪松',
    35: '松树',
    36: '甘草',
    37: '黑醋栗芽苞',
    38: '干牧草',
    39: '百里香',
    40: '香草',
    41: '桂皮',
    42: '丁子香花蕾',
    43: '胡椒',
    44: '藏红花',
    45: '皮革',
    46: '麝香',
    47: '黄油',
    48: '烤面包',
    49: '烤杏仁',
    50: '烤榛子',
    51: '焦糖',
    52: '咖啡',
    53: '黑巧克力',
    54: '烟熏味',
    55: '橡木',
    56: '新木材<br>（未风干）',//ft16
    57: '椰子',
    58: '香草荚',
    59: '橡木辛香',
    60: '药物',
    61: '新皮革',
    62: '糠醛',
    63: '烂苹果',
    64: '醋',
    65: '胶水',
    66: '肥皂',
    67: '硫磺',
    68: '蔬菜',
    69: '臭鸡蛋',
    70: '洋葱',
    71: '花椰菜',
    72: '马臭',
    73: '霉土',
    74: '软木塞'
}

var interestMap = {
    14001: '阅读/图书馆',
    14002: '旅行',
    14003: '电影',
    14004: '演唱会',
    14005: '派对',
    14006: '摄影',
    14007: '画画',
    14008: '唱歌',
    14009: '逛街',
    14010: '社交',
    14011: '博物馆/画廊',
    14012: '烹饪',
    14013: '其他'
}

var professionMap = {
    13001: '其他',
    13002: '总监/总经理',
    13003: '部门主管/副总经理',
    13004: '经理/主管',
    13005: '普通员工'
}

/*
 * 智能机浏览器版本信息:
 *
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

$(window).on('orientationchange', function () {
    if (deviceType === 'isIphone') {
        if (Math.abs(window.orientation) === 90) {
            $('.backdrop-orientation, .modal-orientation').show();
        }
        else {
            $('.backdrop-orientation, .modal-orientation').hide();
        }
    }
    else if (deviceType === 'isAndroid') {
        if (Math.abs(window.orientation) === 90) {
            viewport.attr('content', 'width=1000, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=yes');
            $('.backdrop-orientation, .modal-orientation').show();
        }
        else {
            viewport.attr('content', 'width=640, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=yes');
            $('.backdrop-orientation, .modal-orientation').hide();
        }
    }
});

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function readyToUploadImg(callback, imgWidth, imgHeight) {
    var imgWidth = imgWidth || 640,
        imgHeight = imgHeight || 470,
        screenHeight = $(window).height(),
        scaleHeight = imgHeight / imgWidth * 640;

    if (!$("#uploadView").length) {
        var html = '<div id="uploadView" class="upload-wrapper" style="height:' +
            screenHeight + 'px;display:none;"><canvas id="p3-canvas" width="' +
            imgWidth + '" height="' +
            imgHeight + '" style="height:' + scaleHeight + 'px;margin-top:' + (640 - scaleHeight) + 'px"></canvas><div class="resImage-zoom hidden"><img id="resImg" src="" class="hidden animal"></div>' +
            '<div class="p3-bg">' +
            '<div class="rel-full" id="upload-bar" style="display: block;">' +
            '<div class="p3-tip"></div>' +
            '<div class="p3-cancel"></div>' +
            '<div class="p3-ok"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $("body").append(html);
    } else {
        $("#uploadView").show();
        return;
    }


    $("#upload-bar .p3-ok").click(function () {
        submitCanvas(function (data) {
            $("#uploadView").hide();
            callback && callback(data);
        });
    });

    $("#upload-bar .p3-cancel").click(function () {
        $("#uploadView").hide();
        cancelCanvas();
    });

    var currentFile = null;
    var canvas = document.getElementById("p3-canvas");
    var stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true;
    createjs.Ticker.setFPS(24);
    createjs.Ticker.on("tick", function () {
        stage.update();
    });

    var cameraPhoto = new createjs.Container();
    stage.addChild(cameraPhoto);

    var cancelCanvas = function () {
        cameraPhoto.removeAllChildren();
    }

    var submitCanvas = function (cb) {
        var data = canvas.toDataURL();
        cb && cb(data);

    }

    var addScaleAction = function (bmp) {
        var scale = 0.5;
        var defscale = 0.5;
        var isgesture = 0;

        cameraPhoto.on("mousedown", function (evt) {
            // this.parent.addChild(this);
            if (isgesture == 0) {
                this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
            }
            scale = cameraPhoto.scaleY;
        });

        cameraPhoto.on("pressmove", function (evt) {
            if (isgesture == 0) {
                this.x = evt.stageX + this.offset.x;
                this.y = evt.stageY + this.offset.y;
                update = true;
            }
        });


        if (!browser.versions.iPhone) {
            var mc = new Hammer(canvas, {touchAction: "pan-y"});
            // mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            // mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({enable: true});
            mc.on("pan swipe rotate pinch", function (ev) {
                // el.textContent = ev.type +" "+ el.textContent;
                //$("#numberText").html(ev.scale);
                isgesture = 1;
                if (ev.scale != 1) {
                    s = ev.scale - 1;
                    cameraPhoto.scaleX = cameraPhoto.scaleY = scale + s;
                } else {
                    isgesture = 0;
                }

                //test
                $gesture.html("!ios gesture:" + isgesture);
                $scale.html("!ios scale:" + scale);
            });
        } else {
            var gesturestart = function (event) {
                isgesture = 1;
                //test
                $gesture.html("gesturechange:" + isgesture);
            }
            var gesturechange = function (event) {
                s = event.scale - 1;
                defscale = cameraPhoto.scaleX = cameraPhoto.scaleY = scale + s;
                //test
                $scale.html("gesturechange:" + defscale);
            }
            var gestureend = function (event) {
                setTimeout(function () {
                    scale = defscale;
                    isgesture = 0;
                    //test
                    $gesture.html("gestured:" + isgesture);
                    $scale.html("gestured:" + scale);
                }, 10)
            }
        }

        var $gesture = $("#isgesture"), $scale = $("#scale");

        canvas.addEventListener("gesturestart", gesturestart, true);
        canvas.addEventListener("gesturechange", gesturechange, true);
        canvas.addEventListener("gestureend", gestureend, true);
    }


    window.addImg = function (bigUrl) {
        var bmp = new createjs.Bitmap(bigUrl);
        var img = new Image();
        img.onload = function () {
            var w = img.width;
            var h = img.height;
            if (w < h) {
                var y = (h - imgHeight) / 2;
                cameraPhoto.y = -1 * y;
                //cameraPhoto.x = -310;
            } else {
                var x = (w - imgWidth) / 2;
                cameraPhoto.x = -x;
                //cameraPhoto.y = -310;
            }
            cameraPhoto.regX = cameraPhoto.regY = 0;
            // bmp.scaleX = bmp.scaleY = 0.5;

        }
        img.src = bigUrl;
        cameraPhoto.removeAllChildren();
        cameraPhoto.addChild(bmp);

        var URL = window.URL || window.webkitURL;
        URL.revokeObjectURL(bigUrl);

        addScaleAction(bmp);

        $("#uploadView").show();
    }

    var createImg = function (imgURL, rot) {
        var file = currentFile;
        var mpImg = new MegaPixImage(file);
        var sw = imgWidth, sh = imgHeight;
        var img = new Image();
        img.onload = function () {
            var w = img.width, h = img.height;

            if (rot < 5) {
                y = sh;
                x = parseInt(sh / h * w);
                setTimeout(function () {
                    mpImg.render(resImg, {width: x, height: y, orientation: rot});
                }, 200)
            } else {
                y = sw;
                x = parseInt(sw / h * w);
                setTimeout(function () {
                    mpImg.render(resImg, {width: x, height: y, orientation: rot});
                }, 200)
            }
        }
        img.src = imgURL;
    }

    var filePicture = $(".takepicture");

    filePicture.bind("change", function (e) {
        var files = e.target.files,
            file;

        if (files && files.length > 0) {

            file = files[0];
            currentFile = file;
            fr = new FileReader;
            fr.onloadend = function () {
                var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
                var rot = exif.Orientation;
                try {
                    var URL = window.URL || window.webkitURL;
                    var imgURL = URL.createObjectURL(file);
                    createImg(imgURL, rot);

                }
                catch (e) {
                    try {
                        fr.onload = function (e) {
                            createImg(event.target.result, rot);
                        };
                        fr.readAsDataURL(file);
                    }
                    catch (e) {
                        throw(new Error("Neither createObjectURL or FileReader are supported"));
                    }
                }

            };
            fr.readAsBinaryString(file);
        }
    });
}



function ifScroll(target) {
    if (target[0].scrollWidth > target.width()) {
        return true;
    } else {
        false;
    }
}

function leftScroll(target) {
    if (ifScroll(target)) {
        target.scrollLeft(0);
        target.parent(".scroll-wrapper").find(".toRight").removeClass("hidden");
        target.parent(".scroll-wrapper").find(".toLeft").addClass("hidden");
        target.unbind("scroll").bind("scroll", function () {
            var left = target.scrollLeft();
            if (left == 0) {
                target.parent(".scroll-wrapper").find(".toLeft").addClass("hidden");
                target.parent(".scroll-wrapper").find(".toRight").removeClass("hidden");
            } else if (left + target.width() == target[0].scrollWidth) {
                target.parent(".scroll-wrapper").find(".toLeft").removeClass("hidden");
                target.parent(".scroll-wrapper").find(".toRight").addClass("hidden");
            } else {
                target.parent(".scroll-wrapper").find(".toLeft").removeClass("hidden");
                target.parent(".scroll-wrapper").find(".toRight").removeClass("hidden");
            }
        });
        target.parent(".scroll-wrapper").find(".toLeft").unbind("click").bind("click",function(){
            var left = target.scrollLeft();
            target.animate({"scrollLeft":left-580},200);
        });
        target.parent(".scroll-wrapper").find(".toRight").unbind("click").bind("click",function(){
            var left = target.scrollLeft();
            target.animate({"scrollLeft":left+580},200);

        });
    } else {
        target.parent(".scroll-wrapper").find(".toRight").addClass("hidden");
        target.parent(".scroll-wrapper").find(".toLeft").addClass("hidden");
    }
}

function splitWords(w,l){
    if(w.length>l){
        return (w.slice(0,l)+"...");
    }else{
        return w;
    }
}