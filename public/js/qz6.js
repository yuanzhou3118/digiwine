/**
 * Created by Cloud on 2015/11/10.
 */
var Score = 0;
CurrentTitle = "葡萄酒微课堂 - 我的品酒师资质正向前迈进分！";
CurrentShareImage = VHost+"images/share2.jpg";
ShareUrl = VHost+"index.html";
var Q1 = new View({
    id: 'q1',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
            Controler.show(Q2);
        })
    },
    init: function () {
        var _this = this;
    },
    _toLeft: function () {
        var _this = this;
        Score += 30;
        rightToScore();
        _this._hideStep1();
        $("#q1-yes").hide();
        $("#q1-no").hide();
        $("#q1-left").velocity({
            right: "20%"
        }, {
            duration: 700,
        });
        $("#q1-right").velocity({
            left: "100%",
            duration: 700
        });
        $("#q1-right-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q1-score").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500,
            complete:function(){
                _this._showNext()
            }
        });


    },
    _toRight: function () {
        var _this = this;
        _this._hideStep1();
        $("#q1-right").velocity({
            left: "25%",
            bottom: "35%",

        },{
            duration: 700
        });
        $("#q1-left").velocity({
            right: "100%"
        }, {
            duration: 700
        });

        $("#q1-wrong-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q1-wrong").show().velocity({
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
        $("#q1-yes").hide();
        $("#q1-no").hide();
        $("#q1-phone").hide();
        $("#q1-tip").hide();
    },
    show: function () {
        var _this = this;
        Delay(function(){
            $('.q1-main').parallax({
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
            },300);
        })
    }
})

var Q2 = new View({
    id: 'q2',
    showStyle: 'slideLeft',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
            Controler.show(Q3);
        })
    },
    init:function(){
        var _this = this;
        $(".q2-cube").click(function(){
            if($(this).hasClass("right")){
                //right
                Score+=30;
                rightToScore();
                $(".q2-cube").hide();
                $(".q2-right").show().velocity({
                    opacity:1,
                    scale:[1,.7]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                })
            }else{
                //wrong
                $(this).find(".q2-w").show();
                $(this).find(".q2-word").hide();
                _this._showNext();
            }
        })
    },
    show: function () {
        var _this = this;
    }
})

var Q3 = new View({
    id: 'q3',
    showStyle: 'slideLeft',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
                Controler.show(Q4);
                $(".q3-bg").unbind("touchend");
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
        var position = $(".q3-bg").position();
        var r = 200;
        var center = {x: r, y: r};
        var origin = {x: position.left + 270, y: (position.top + 316 + moveBottom)};
        var currentAngle = 0;
        $(".q3-bg").bind("touchmove", function (e) {
            var touch = e.originalEvent.touches[0]
            currentAngle =  angle = 360 - (getAngel(touch.pageX, touch.pageY, origin.x, origin.y));
            console.log(currentAngle)
            $(".q3-point").css({
                "transform": "rotateZ(" + angle + "deg)"
            });
            e.preventDefault();
            e.stopPropagation();
        });

        $(".q3-bg").bind("touchend", function (e) {
            if(currentAngle>=172 && currentAngle<=321){
                return;
            }
            if (currentAngle > 321 && currentAngle<360) {
                //alert("RIGHT");
                Score+=30;
                rightToScore();
                $(".q3-right").show().velocity({
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
                $(".q3-wrong").show().velocity({
                    opacity: 1,
                    scale: [1, .7],
                    bottom: ["680px", "640px"]
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

        $(".q4-cube").click(function () {
            $(this).unbind("click");
            if($(this).hasClass("right")){
                Score += 30;
                rightToScore();
                $(".q4-cube.wrong").hide();
                $(".q4-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                });
                $(".q4-b").velocity({
                    left: 250,
                    top: "27%"
                },{
                    duration: 700,
                    easing: "spring",
                })
            }else{
                $(".q4-cube").hide();
                $(".q4-bg").hide();
                $(".q4-wrong-bg").show();
                $(".q4-wrong").show();
                _this._showNext();
            }
            $(".q4-word").hide();
        })
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
        });
    },
    init: function () {
        var _this = this;
        $(".q5-cube").click(function(){
           var _ = $(this);
            if(_.hasClass("right")){
                //right
                Score+=30;
                rightToScore();
                $(".q5-r-zoom").show().velocity({
                    opacity:1,
                    height:564
                },{
                    duration:400,
                    complete:function(){
                        $(".q5-g2").show().velocity({
                            opacity:1
                        },{
                            duration:500
                        })
                        $(".q5-right").show().velocity({
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
                });

                $(".q5-cube").hide();
            }else{
                //wrong
                _.find(".q5-word").hide();
                _.find(".q5-w").show();
                _this._showNext();
            }
        });
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

CurrentLesson = 6;
Controler.show(Q1);