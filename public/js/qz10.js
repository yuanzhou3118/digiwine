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
                $(".q1-container").hide();
                if(answer!=4){
                    //to wrong
                    $(".q1-wrong").show().velocity({
                        opacity:1,
                        scale:[1,.5],
                        rotateZ:[2,2]
                    },{
                        duration:700,
                        easing:"spring",
                        complete:function(){
                            _this._showNext();
                        }
                    });

                }else{
                    //to right
                    Score+=30;
                    rightToScore();
                    $(".q1-right").show().velocity({
                        opacity:1,
                        scale:[1,.5],
                        rotateZ:[2,2]
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

        $(".q2-cube").click(function(){
            var $_this = $(this);
            if($_this.hasClass("right")){
                Score+=30;
                rightToScore();
                $(".q2-cube").hide();
                $(".q2-right").show().velocity({
                    opacity:1,
                    scale:[1,.5]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                })
            }else{
                $_this.find(".q2-content").hide();
                $_this.find(".q2-wrong").show();
                _this._showNext();
            }
        })
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

        Score += 30;
        rightToScore();

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
    _toRight: function () {
        var _this = this;

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
                $this.find(".word").attr("src", "images/qz3/q1-right.png");
                $(".q4-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring',
                    complete: function () {
                        _this._showNext();
                    }
                })
            } else {
                $this.find(".icon").velocity({
                    top: '38%',
                    rotateZ: '-60deg'
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                })
                $this.find(".animal").velocity({
                    bottom: '37%',
                    rotateZ: '86deg'
                },{
                    duration:700,
                    easing:"spring",
                })
                $this.find(".word").attr("src", "images/qz3/q1-wrong.png");
                //$this.find(".cube").attr("src", "images/qz3/q1-" + $this.attr("type") + "w.png");
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
            }
        )
    },
    init: function () {
        var _this = this;
        var documentHeight = $("body").height();

        $(".q5-cube").click(function(){
            var $_ = $(this);
            if(!$_.hasClass("selected")){
                $_.addClass("selected");
            }else{
                $_.removeClass("selected");
            }
        });

        $(".q5-submit").click(function(){
            var selected = $(".q5-cube.selected");
            var $right = $(".q5-cube.selected.right");
            if(selected.length == 2 && $right.length == 2 ){
                Score+=30;
                rightToScore();
                $(".q5-cube").hide();
                $(".q5-right").show().velocity({
                    opacity:1,
                    scale:[1,.5]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                });
                $(".q5-bottle").velocity({
                    scale:.7
                },{
                    duration:700,
                    easing:"spring"
                })
                $(this).hide();
            }else{
                selected.addClass("wrong");
                selected.find(".q5-wrong").show();
                _this._showNext();
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

CurrentLesson = 10;
Controler.show(Q1);
