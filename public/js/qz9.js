/**
 * Created by Cloud on 2015/11/10.
 */
var Score = 0;
CurrentTitle = "葡萄酒微课堂 - 我的品酒师资质正向前迈进分！";
CurrentShareImage = VHost + "images/share2.jpg";
ShareUrl = VHost + "index.html";

var Q1 = new View({
    id: 'q1',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
                Controler.show(Q2);
            }
        )
    },
    init: function () {
        var _this = this;

        $(".q1-cube").click(function(){
            var $_ = $(this);
            if($_.hasClass("selected")){
                $_.removeClass("selected");
            }else{
                $_.addClass("selected");
            }
        });

        $(".q1-submit").click(function(){
            var selected = $(".q1-cube.selected");
            var answer = selected.length;
            if(answer){
                if(answer!=3 || $(".q1-cube.selected.wrong").length){
                    //to wrong
                    selected.find(".q1-wrong").show();
                    selected.find(".q1-word").hide();
                    _this._showNext();
                }else{
                    //to right
                    Score+=30;
                    rightToScore();
                    $(".q1-cube").hide();
                    $(".q1-right").show().velocity({
                        opacity:1,
                        scale:[1,.5]
                    },{
                        duration:700,
                        easing:"spring",
                        complete:function(){
                            _this._showNext();
                        }
                    })


                }
            }
        })
    },
    show: function () {
        var _this = this;
    }
});

var Q2 = new View({
    id: 'q2',
    showStyle: 'slideLeft',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
            Controler.show(Q3);
        })
    },
    init: function () {
        var _this = this;

        var currentTarget  = null;
        var orPos = null,orPt = null;
        var topDis = 120,selfLeft = 0;
        var currentIndex = [0,0,0,0];
        var currentTouch = null;

        $(".q2-cube").bind("touchstart",function(e){
            currentTarget = $(this);
            var touch = e.originalEvent.touches[0]
            //console.log("originX=" + origin.x + " pageX=" + touch.pageX + " originY=" + origin.y + " pageY=" + touch.pageY);
            orPt = {left:touch.pageX, top:touch.pageY};
            orPos = currentTarget.offset();
            e.stopPropagation();
            e.preventDefault();
        }).bind("touchend",function(e){
            e.stopPropagation();
            e.preventDefault();
            var mainHeight = $(document).height()
            if(currentTarget && currentTouch){
                $(".q2-tip").hide();
                var touch = currentTouch;
                var left = touch.pageX ,top = touch.pageY;
                if(currentTarget.height()+top>=mainHeight && left>50 && left<590){
                    if(currentTarget.attr("data")=="b"){
                        $(".q2-border").hide();
                        $(".q2-cube").hide();
                        $(".q2-right").show().velocity({
                            opacity:1,
                            scale:[1,.7]
                        },{
                            delay:300,
                            duration:700,
                            easing:"spring",
                            complete:function(){
                                Score+=30;
                                rightToScore();
                                _this._showNext();
                            }
                        });
                        $(".q2-right-bg").show().velocity({
                            opacity:1,

                        },{
                            duration:300,
                        });
                        $(".q2-bag1").show().velocity({
                            opacity:0,
                            translateX:100
                        },{
                            duration:300,
                        });

                    }else{
                        currentTarget.hide();
                        $(".q2-wrong").show().velocity({
                            opacity:1,
                            scale:[1,.7]
                        },{
                            duration:700,
                            easing:"spring",
                            complete:function(){
                                _this._showNext();
                            }
                        })
                    }

                }else{
                    currentTarget.attr("style","");
                }
            }
            currentTarget  = currentTouch = null;
            orPos = null;
        }).bind("touchmove",function(e){
            e.stopPropagation();
            e.preventDefault();
            if(currentTarget) {
                var touch = currentTouch = e.originalEvent.touches[0]
                var x = orPos.left + (touch.pageX - orPt.left), y = orPos.top - topDis + (touch.pageY - orPt.top);

                currentTarget.css({
                    top: y,
                    left: x
                });
            }
        });
    },
    show: function () {
        var _this = this;

    }
});

var Q3 = new View({
    id: 'q3',
    hideStyle: 'slideLeft',
    showStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
            Controler.show(Q4);
        })
    },
    init: function () {
        var _this = this;
    },
    _toLeft: function () {
        var _this = this;
        _this._hideStep1();
        $("#q3-yes").hide();
        $("#q3-no").hide();
        $("#q3-left").velocity({
            right: "20%"
        }, {
            duration: 700,
        });
        $("#q3-right").velocity({
            left: "100%",
            duration: 700
        });

        $("#q3-wrong-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q3-wrong").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500,
            complete: function () {
                _this._showNext()
            }
        });
    },
    _toRight: function () {
        var _this = this;
        Score += 30;
        rightToScore();
        _this._hideStep1();

        $("#q3-right").velocity({
            left: "25%",
            bottom: "35%",

        }, {
            duration: 700
        });
        $("#q3-left").velocity({
            right: "100%"
        }, {
            duration: 700
        });

        $("#q3-right-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q3-score").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500,
            complete: function () {
                _this._showNext()
            }
        });

    },
    _hideStep1: function () {
        $("#q3-yes").hide();
        $("#q3-no").hide();
        $("#q3-phone").hide();
        $("#q3-tip").hide();
    },
    show: function () {
        var _this = this;
        Delay(function () {
            $('.q3-main').parallax({
                'friction-x': .1,
                'friction-y': 0,
                'scalar-x': 7,
                'scalar-y': 0,
                'limit-y': 0,
                'limit-x': 100,
                'relativeInput': false,
                'onlyX': true,
                'toLeft': function () {
                    _this._toLeft();
                },
                'toRight': function () {
                    _this._toRight();
                }
            }, 300);
        })
    }
});

var Q4 = new View({
    id: 'q4',
    showStyle: 'slideLeft',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
            Controler.show(Q5);
        })
    },
    init: function () {
        var _this = this;

        var _this = this;
        var documentHeight = $("body").height();
        if (documentHeight < 970) {
            var heightScale = documentHeight / 970;
            $(".q4-main").css({
                height: 85 * heightScale + "%"
            })
        }

        var $cubs = $(".q4-cube");
        $cubs.click(function () {
            $cubs.unbind("click");
            var $this = $(this);
            if ($this.hasClass("right")) {
                Score += 30;
                rightToScore();
                $cubs.hide();
                $(".q4-word").hide();
                $(".q4-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring',
                    complete: function () {
                        _this._showNext();
                    }
                });
            } else {
                $this.find(".q4-wrong").show();
                $this.find(".q4-content").hide();
                _this._showNext();
            }
        });

    },
    show: function () {
        var _this = this;
    }
});

var Q5 = new View({
    id: 'q5',
    showStyle: 'slideLeft',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
                Controler.show(Result);
                $(".q5-bg").unbind("touchend");
            }
        )
    },
    init: function () {
        var _this = this;
        var documentHeight = $("body").height();
        var moveBottom = 120
        //if (documentHeight < 970) {
        //    moveBottom = documentHeight - 970;
        //    $(".q3-main").css({
        //        'margin-bottom': moveBottom + 'px'
        //    })
        //}
        var position = $(".q5-bg").position();
        var r = 200;
        var center = {x: r, y: r};
        var origin = {x: position.left + 270, y: (position.top + 316 + moveBottom)};
        var currentAngle = 0;
        $(".q5-bg").bind("touchmove", function (e) {
            var touch = e.originalEvent.touches[0]
            currentAngle =  angle = 360 - (getAngel(touch.pageX, touch.pageY, origin.x, origin.y));
            console.log(currentAngle)
            $(".q5-point").css({
                "transform": "rotateZ(" + angle + "deg)"
            });
            e.preventDefault();
            e.stopPropagation();
        });

        $(".q5-bg").bind("touchend", function (e) {
            if(currentAngle>=172 && currentAngle<=321){
                return;
            }
            if (currentAngle > 317 && currentAngle<360) {
                //alert("RIGHT");
                Score+=30;
                rightToScore();
                $(".q5-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring',
                    complete:function(){
                        _this._showNext();
                    }
                });
            } else {
                //alert("WRONG");
                $(".q5-wrong").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring',
                    complete:function(){
                        _this._showNext();
                    }
                });
            }
        });

        function getAngel(x, y, ox, oy) {
            var x = x - ox, y = -( y - oy );
            var ang = Math.atan(y / x) * 180 / Math.PI;
            if (x >= 0 && y >= 0) {
                return ang
            } else if (x > 0 && y < 0) {
                return (360 + ang );
            } else if (x < 0 && y > 0) {
                return (180 + ang);
            } else if (x < 0 && y < 0) {
                return (180 + ang);
            }
        }

    },
    show: function () {
        var _this = this;
    }
});

var Result = new View({
    id: 'result',
    init: function () {
        var _this = this;
    },
    show: function () {
        var _this = this;
        var popShow = {
                opacity: 1,
                scale: [1, .7]
            },
            popOption = {
                duration: 700,
                easing: 'spring'
            }

        if (Score == 150) {
            $("#result-badage").show().velocity(popShow, popOption);
            //User && User.id && Request.win_medal(CurrentLesson, User.id);
        } else {
            $("#result-badage-grew").show().velocity(popShow, popOption);
        }

        $("#result-bg").show().velocity(popShow, popOption);
        $("#result-word").show().velocity(popShow, popOption);

        $(".result-score").show();
        $("#result-share").show();
        $("#result-back").show();
    }
})

CurrentLesson = 9;
Controler.show(Q1);
