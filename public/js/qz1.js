/**
 * Created by Cloud on 2015/11/10.
 */
var Score = 0;
var RIGHT = 'RIGHT', WRONG = 'WRONG';
CurrentTitle = "葡萄酒微课堂 - 我的品酒师资质正向前迈进！";
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
        var documentHeight = $("body").height();
        if(documentHeight<1080){
            var width = documentHeight/1080*90
            $(".q1-main").css({
                width:width+"%",
                left:(100-width)/2 +"%"
            })
        }

        $('.q1-cube').click(function () {
            var $ans = $(this).find(".q1-ans");
            $(this).unbind("click");
            $ans.show();
            if ($ans.hasClass('right')) {
                Score += 30;
                rightToScore();
            }
            _this._showNext();
        })
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
        var currentY = null;
        var currentTarget = null
        $(".q2-cube .bottle").bind("touchstart", function (e) {
            var touch = e.originalEvent.touches[0];
            currentTarget = $(this);
            currentY = touch.clientY;
            e.stopPropagation();
            e.preventDefault();
        }).bind("touchmove", function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!currentY || !currentTarget) {
                return;
            }
            var touch = e.originalEvent.touches[0];
            var dis = touch.clientY - currentY;
            if (Math.abs(dis) > 10) {
                if (dis < 0) {
                    //move top
                    $parent = currentTarget.parent();
                    $parent.find(".cap").velocity('stop').velocity({
                        marginTop: "-20px"
                    }, {
                        duration: 500,
                        complete: function () {
                            $parent.addClass("q2-right");
                        }
                    });
                    $parent.addClass("q2-right");
                    
                    var $tip = $("#q2-tip"),
                        $submit = $("#q2-submit");
                    $tip.hide();
                    $submit.show();
                } else {
                    //move down
                    $parent = currentTarget.parent();
                    $parent.find(".cap").velocity('stop').velocity({
                        marginTop: '0px'
                    }, {
                        duration: 500,
                        complete: function () {

                        }
                    });

                    $parent.removeClass("q2-right");
                }
            }

        }).bind("touchend", function (e) {
            e.stopPropagation();
            e.preventDefault();
            var touch = e.originalEvent.touches[0];
            currentY = null;
            currentTarget = null;
        }).bind("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
        })

        $("#q2-submit").click(function () {

            if (!$(".q2-right").length) {
                return;
            }
            $(this).unbind("click");
            if ($(".q2-right").length == 4) {
                _this._winEffect();

            } else {
                //wrong
                $wrong = $(".q2-right");
                $wrong.find(".cap").hide();
                $wrong.find(".wrong").show();
                _this._showNext();
            }
        });

    },
    _winEffect: function () {
        var _this = this;
        _this._winEffect = function () {
        };
        Score += 30;
        rightToScore();
        var $A = $("#q2-A"),
            $B = $("#q2-B"),
            $C = $("#q2-C"),
            $D = $("#q2-D"),
            $caps = $(".q2-cube .cap");
        var moveDuration = 700;
        $caps.hide();
        $A.velocity({
            left: "40px",
            scale: .9
        }, {
            duration: moveDuration
        });
        $B.velocity({
            left: "115px"
        }, {
            duration: moveDuration
        });
        $C.velocity({
            left: "205px",
            bottom: "22%"
        }, {
            duration: moveDuration
        });
        $D.velocity({
            left: "292px",
            scale: .8
        }, {
            duration: moveDuration
        });

        $("#q2-right-cup").velocity({
            left: "465px"
        }, {
            duration: moveDuration,
            complete: function () {
                $("#q2-right-bg").velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 500,
                    easing: "spring",
                });
                $("#q2-right-score").velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 500,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                });


            }
        })
    },
    show: function () {

    }
})

var Q3 = new View({
    id: 'q3',
    showStyle: 'slideLeft',
    hideStyle: 'slideLeft',
    _showNext: function () {
        Delay(function () {
            Controler.show(Q4);
        })
    },
    init: function () {
        var _this = this;

        $(".q3-cube").click(function () {
            $(this).unbind("click");
            if ($(this).hasClass("right")) {
                Score += 30;
                rightToScore();
                var effectDur = 700;
                $("#q3-right-bg").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 500,
                    easing: "spring"
                });
                $("#q3-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: effectDur,
                    easing: "spring"
                });

                $(".q3-cube.wrong").find(".border").hide();
                $(".q3-cube.wrong").find(".circle").hide();

                $("#q3-C").velocity({
                    width: '60px',
                    height: '60px',
                    left: '93px',
                    bottom: '34%'
                }, {
                    duration: effectDur,
                    easing: "spring"
                });

                $("#q3-B").velocity({
                    width: '75px',
                    height: '75px',
                    left: '420px',
                    bottom: '50%'
                }, {
                    duration: effectDur,
                    easing: "spring"
                });
                $("#q3-D").velocity({
                    width: '40px',
                    height: '40px',
                    left: '506px',
                    bottom: '64%'
                }, {
                    duration: effectDur,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                });

            } else {
                $(this).find(".circle").hide();
                $(this).find(".wrong").show();
                $(".q3-cube").unbind("click");
                _this._showNext();
            }
        })

    },
    show: function () {
        var _this = this;
        $("#q3-glass").velocity({
            left: ['472px', '500px'],
            opacity: [1, 0]
        }, {
            duration: 500
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

        $(".q4-cube").click(function () {
            var $_ = $(this);
            if ($_.hasClass("active")) {
                $_.removeClass("active");
            } else {
                $_.addClass("active");
            }
        });

        $("#q4-submit").click(function(){
            getResult();
        })

        function getResult() {
            if($(".q4-cube.active").length !=4){
                $(".q4-cube.active").find(".wrong").show();
                _this._showNext();
                return;
            }

            if ($(".q4-cube.active").length == 4) {
                Score += 30;
                rightToScore();
                var effectDuring = 700,
                    effectEasing = 'spring',
                    commonOption = {
                        duration: effectDuring,
                        easing: effectEasing
                    };
                $(".q4-cube .word").hide();
                $(".q4-cube.active").removeClass("active");
                $("#q4-A .smile").velocity({
                    bottom: '15px',
                    right: '16px',
                    width: '60%'
                }, commonOption);
                $("#q4-A").velocity({
                    width: '90px',
                    height: '90px',
                    left: '130px',
                    top: '33%'
                }, commonOption);

                $("#q4-B .smile").velocity({
                    bottom: '20px',
                    right: '14px',
                    width: '70%'
                }, commonOption);
                $("#q4-B").velocity({
                    width: '100px',
                    height: '100px',
                    left: '265px',
                    top: '15%'
                }, commonOption);

                $("#q4-C .smile").velocity({
                    bottom: '20px',
                    right: '15px',
                    width: '80%'
                }, commonOption);
                $("#q4-C").velocity({
                    width: '105px',
                    height: '105px',
                    left: '340px',
                    bottom: '44%%'
                }, commonOption);

                $("#q4-D .smile").velocity({
                    bottom: '19px',
                    right: '8px',
                    width: '75%'
                }, commonOption);
                $("#q4-D").velocity({
                    width: '75px',
                    height: '75px',
                    left: '440px',
                    top: '30%'
                }, commonOption);

                $("#q4-bg").hide();

                $("#q4-right-bg").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, commonOption)

                $("#q4-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: effectDuring,
                    easing: effectEasing,
                    complete: function () {
                        _this._showNext();
                    }
                })
            }
            $("#q4-submit").unbind("click");


        }
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
        Delay(function(){
            Controler.show(Result);
        });
    },
    init: function () {
        var _this = this;

    },
    _toLeft: function () {
        var _this = this;
        Score += 30;
        rightToScore();
        _this._hideStep1();
        $("#q5-yes").hide();
        $("#q5-no").hide();
        $("#q5-left").velocity({
            right: "20%"
        }, {
            duration: 700,
        });
        $("#q5-right").velocity({
            left: "100%",
            duration: 700
        });
        $("#q5-right-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q5-score").show().velocity({
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
        $("#q5-right").velocity({
            left: "25%",
            bottom: "35%",

        },{
            duration: 700
        });
        $("#q5-left").velocity({
            right: "100%"
        }, {
            duration: 700
        });

        $("#q5-wrong-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q5-wrong").show().velocity({
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
        $("#q5-yes").hide();
        $("#q5-no").hide();
        $("#q5-phone").hide();
        $("#q5-tip").hide();
    },
    show: function () {
        var _this = this;
        Delay(function(){
            $('.q5-main').parallax({
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
});

var Result = new View({
    id: 'result',
    init: function () {
        var _this = this;
    },
    show: function () {
        var _this = this;
        var popShow = {
            opacity:1,
            scale:[1,.7]
        },
            popOption={
                duration:700,
                easing:'spring'
            }

        if(Score == 150){
            $("#result-badage").show().velocity(popShow,popOption);
            //User && User.id && Request.win_medal(CurrentLesson, User.id);
        }else{
            $("#result-badage-grew").show().velocity(popShow,popOption);
        }

        $("#result-bg").show().velocity(popShow,popOption);
        $("#result-word").show().velocity(popShow,popOption);

        $(".result-score").show();
        $("#result-share").show();
        $("#result-back").show();
    }
})

CurrentLesson = 1;
Controler.show(Q1);
