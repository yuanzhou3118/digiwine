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
        //var documentHeight = $("body").height();
        //if (documentHeight < 970) {
        //    var heightScale = documentHeight / 970;
        //    $(".q1-main").css({
        //        height: 85 * heightScale + "%"
        //    })
        //}

        $(".q1-cube").click(function(){
            if($(this).hasClass("selected")){
                $(this).removeClass("selected");
            }else{
                $(this).addClass("selected");
            }
        });

        $(".q1-submit").click(function(){
            if($(".q1-cube.selected").length){
                $(this).unbind("click");
                $(".q1-main").css({
                    background:"url(images/qz4/q1-tbg.png) no-repeat",
                    "background-position":"center bottom",
                    "background-size":"auto 100%    "
                });
                $(".q1-submit").hide();
                $(".q1-cube").hide();
                if($(".q1-cube.selected.right").length==2 && $(".q1-cube.selected").length == 2){
                    Score += 30;
                    rightToScore();
                    $(".q1-right-cube1").show().velocity({
                        opacity:1,
                        top:["36%","40%"],
                        right:["22%","40%"]
                    },{
                        duration:700,
                        easing:"spring"
                    })
                    $(".q1-right-cube2").show().velocity({
                        opacity:1,
                        top:["40%","60%"],
                        left:["22%","12%"]
                    },{
                        duration:700,
                        easing:"spring"
                    })

                    $(".q1-right").show().velocity({
                        opacity:1,
                        scale:[1,.7]
                    },{
                        duration:700,
                        easing:"spring",
                        complete:function(){
                            _this._showNext();
                        }
                    });

                }else{
                    $(".q1-wrong").show().velocity({
                        opacity:1,
                        scale:[1,.7]
                    },{
                        duration:700,
                        easing:"spring",
                        complete:function(){
                            _this._showNext();
                        }
                    });
                }
            }
        });



    },
    show: function () {
        var _this = this;





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
    _toLeft: function () {
        var _this = this;
        _this._hideStep1();

        $("#q2-left").velocity({
            right: "20%"
        }, {
            duration: 700,
        });
        $("#q2-right").velocity({
            left: "100%",
            bottom: "35%",

        },{
            duration: 700
        });

        $("#q2-wrong-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q2-wrong").show().velocity({
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
        $("#q2-right").velocity({
            left: "25%",
            bottom: "35%",

        },{
            duration: 700
        });
        $("#q2-left").velocity({
            right: "100%"
        }, {
            duration: 700
        });
        $("#q2-right-bg").show().velocity({
            opacity: 1,
            scale: [1, .7]
        }, {
            duration: 700,
            easing: 'spring',
            delay: 500
        });
        $("#q2-score").show().velocity({
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
    _hideStep1: function () {
        $("#q2-yes").hide();
        $("#q2-no").hide();
        $("#q2-phone").hide();
        $("#q2-tip").hide();
    },
    show: function () {
        var _this = this;
        Delay(function(){
            $('.q2-main').parallax({
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
        });
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
        $(".q3-cube").click(function(){
            if($(this).hasClass("selected")){
                $(this).removeClass("selected");
            }else{
                $(this).addClass("selected");
            }
        });

        $(".q3-submit").click(function(){
            if($(".q3-cube.selected").length){
                $(this).unbind("click");
                if($(".q3-cube.selected.right").length==4 &&$(".q3-cube.selected").length == 4){
                    Score += 30;
                    rightToScore();

                    var selected = $(".q3-cube.selected")
                    selected.find(".q3-right-pan").show();
                    selected.find(".q3-wd").hide();
                    $(".q3-e").fadeOut(300);
                    var a = $(".q3-a"),b = $(".q3-b"),c = $(".q3-c"),d = $(".q3-d");
                    a.velocity({
                        width:92,
                        height:92,
                        left: 120
                    },{
                        duration:700,
                        easing:"spring"
                    });
                    b.velocity({
                        width:104,
                        height:104,
                        top:'18%' ,
                        left: 250
                    },{
                        duration:700,
                        easing:"spring"
                    })
                    c.velocity({
                        width:78,
                        height:78,
                        left: 485
                    },{
                        duration:700,
                        easing:"spring"
                    })
                    d.velocity({
                        width:68,
                        height:68,
                        left: 407
                    },{
                        duration:700,
                        easing:"spring"
                    })

                    $(".q3-right").show().velocity({
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
                    var selected = $(".q3-cube.selected")
                    selected.find(".q3-wrong-word").show();
                    selected.find(".q3-wd").hide();
                    $(".q3-wbg").fadeIn(300);
                    Delay(function(){
                        _this._showNext();
                    },300);
                }
            }
        })
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
        $(".q4-cube").click(function(){
            if($(this).hasClass("right")){
                $(".q4-cube").hide();
                $(".q4-right-bg").fadeIn(300);
                $(".q4-right").show().velocity({
                    opacity:1,
                    scale:[1,.7]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        Score+=30;
                        rightToScore();
                        _this._showNext();
                    }
                })
            }else{
                $(this).find(".q4-word").hide();
                $(this).find(".q4-wrong-icon").show();
                $(".q4-wrong-bg").fadeIn(300);
                Delay(function(){
                    _this._showNext();
                },300);
            }
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
            $(this).find(".q5-word").hide();

            if($(this).hasClass("right")){
                var right = $(this).find(".q5-right");
                right.show().velocity({
                    opacity:1,
                    scale:[1,.7]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        Score+=30;
                        rightToScore();
                        _this._showNext();
                    }
                })
            }else{
                var wrong = $(this).find(".q5-wrong");
                wrong.show().velocity({
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
        })
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

CurrentLesson = 4;
Controler.show(Q1);