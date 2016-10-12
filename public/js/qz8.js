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
            complete: function () {
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

        }, {
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
        Delay(function () {
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
            }, 300);
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
    init: function () {
        var _this = this;

        $(".q2-cube").click(function(){
            var $this = $(this);
            if($this.hasClass("selected")){
                $this.removeClass("selected");
            }else{
                $this.addClass("selected");
            }
        });

        $(".q2-submit").click(function(){
            var $selected = $(".q2-cube.selected");
            if($selected.length){
                if($selected.length ==2 && $(".q2-cube.selected.right").length==2){
                    $(".q2-right").show().velocity({
                        opacity:1,
                        scale:[1,.5]
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
                    $selected.addClass("wrong");
                    _this._showNext();
                }
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
            }
        )
    },
    init: function () {
        var _this = this;
        var numberList = [0,0,0,0];

        $(".q3-year-input").bind("focus",function(){
            var $this = $(this);
            $this.val("");
        });
        $(".q3-year-input").bind("blur",function(){
            var $this = $(this);
            if($this.val()==1953){
                Score+=30;
                rightToScore();
                $(".q3-right").show().velocity({
                    opacity:1,
                    scale:[1,.5]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                },700);
            }else{
                $(".q3-wrong").show().velocity({
                    opacity:1,
                    scale:[1,.5]
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                },700);
            }
        });
        $(".q3-year-input").bind("input",function(e){
            var $this = $(this);
            if($this.val().length>=4){
                $this.val($this.val().substring(0, 4));

            }
            var val = $this.val();
            for(var i=0;i<4;i++){
                var n = numberList[i],c = val.charAt(i);
                if(val.length>i){
                    if(n != c ){
                        _this.changeYear(n,c,i+1);
                        numberList[i] = c;
                    }
                }else{
                    if(n != 0 ){
                        _this.changeYear(n,0,i+1);
                        numberList[i] = 0;
                    }
                }

            }
            console.log(JSON.stringify(numberList));
            console.log($this.val());
        })

    },
    show: function () {
        var _this = this;
    },
    changeYear:function(from,to,target){
        var $year = $(".q3-y"+target),$clip1 = $year.find(".q3-clip1"),$clip2 = $year.find(".q3-clip2");
        var from = from,to = to,fromClass="n"+from,toClass="n"+to;
        $clip1.addClass("n"+from);
        $clip2.addClass("n"+to);

        $clip1.velocity({
            opacity:[1,1],
            rotateX:[90,180],
        },{
            duration:300,
            easing:'linear',
            complete:function(){
                $clip1.removeClass(fromClass).addClass(toClass).velocity({
                    rotateX:[0,90]
                },{
                    duration:300,
                    easing:'linear',
                    complete:function(){
                        $year.removeClass(fromClass).addClass(toClass);
                        $clip1.removeClass(toClass).attr("style","");
                        $clip2.removeClass(toClass).attr("style","");
                    }
                })
            }
        });
        $clip1.css({
            opacity:1
        })
        $clip2.css({
            opacity:1
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
                    top: '37%',
                    rotateZ: '-94deg',
                    right: '26%'
                },{
                    duration:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                })
                $this.find(".animal").velocity({
                    bottom: '24%',
                    left:'33%',
                    rotateZ: '96deg'
                },{
                    duration:700,
                    easing:"spring",
                })
                $this.find(".word").attr("src", "images/qz3/q1-wrong.png");
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
        });
    },
    init: function () {
        var _this = this;
        $(".q5-cube").click(function () {
            var _ = $(this);
            if(_.hasClass("selected")){
                _.removeClass("selected")
            }else{
                _.addClass("selected")
            }
        });

        $(".q5-submit").click(function(){
            var selected = $(".q5-cube.selected");
            if(selected.length){
                $(this).hide();
                if(selected.length == 4){
                    Score+=30;
                    rightToScore();
                    $(".q5-q").hide();
                    $(".q5-cube").removeClass("selected");
                    $(".q5-bottle").velocity({
                        top:"33%"
                    },{duration:700});
                    $(".q5-right").show().velocity({
                        opacity:1,
                        scale:[1,.5]
                    },{
                        duration:700,
                        easing:"spring",
                        complete:function(){
                            _this._showNext();
                        }
                    })

                    $(".q5-aa").velocity({
                        width: 80,
                        height: 80,
                        top: '15%',
                        left: 252
                    },{
                        duration:700,
                        easing:"spring"
                    });

                    $(".q5-bb").velocity({
                        width:92,
                        height:92,
                        left: 150,
                        top: "28%",
                    },{
                        duration:700,
                        easing:"spring"
                    });

                    $(".q5-cc").velocity({
                        left: 451,
                        top: '19%',
                        width: 77,
                        height: 77
                    },{
                        duration:700,
                        easing:"spring"
                    });

                    $(".q5-dd").velocity({
                        left: 374,
                        top: '30%',
                        width: 88,
                        height: 88
                    },{
                        duration:700,
                        easing:"spring"
                    });

                }else{
                    selected.find(".q5-wrong").show();
                    selected.find(".content").hide();
                    _this._showNext();
                }
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

CurrentLesson = 8;
Controler.show(Q1);