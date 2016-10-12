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
            var $_ = $(this);
            if($_.hasClass("selected")){
                $_.removeClass("selected");
            }else{
                $_.addClass("selected");
            }
        });

        $(".q1-submit").click(function(){
            var selected_length = $(".q1-cube.selected").length
            if(selected_length){
                if(selected_length == 3 && $(".q1-cube.right.selected").length==3){
                    Score += 30;
                    rightToScore();
                    //right
                    $(".q1-cup").velocity({
                        scale:.8
                    },{
                        duration:700,
                        easing:"spring"
                    });
                    $(".q1-words").hide();
                    $(".q1-a").velocity({
                        left:250
                    },{
                        duration:700,
                        easing:"spring"
                    });
                    $(".q1-b").velocity({
                        top:"22%",
                        left:"50px"
                    },{
                        duration:700,
                        easing:"spring"
                    });
                    $(".q1-c").velocity({
                        top:"28%",
                        left:"445px"
                    },{
                        duration:700,
                        easing:"spring"
                    });
                    $(".q1-d").hide();
                    $(".q1-right").show().velocity({
                        scale:[1,.7],
                        opacity:1
                    },{
                        duration:700,
                        easing:"spring",
                        complete:function(){
                            _this._showNext();
                        }
                    });

                }else{
                    //wrong
                    $(".q1-cube.selected").find(".q1-w").show();
                    $(".q1-cube.selected").find(".q1-pic").hide();
                    _this._showNext();
                }
            }
        })
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
                    _this._toLeft = function(){};
                },
                'toRight': function () {
                    _this._toRight();
                    _this._toRight = function(){};
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
        var documentHeight = $("body").height();
        if (documentHeight < 970) {
            var heightScale = documentHeight / 970;
            $(".q3-main").css({
                height: 85 * heightScale + "%"
            })
        }

        var $cubs = $(".q3-cube");
        $cubs.click(function () {
            $cubs.unbind("click");
            var $this = $(this);
            if ($this.hasClass("right")) {
                Score += 30;
                rightToScore();
                $this.find(".word").attr("src", "images/qz3/q1-right.png");
                $(".q3-right").show().velocity({
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
                    rotateZ: '-86deg'
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
               $(".q4-cube").velocity({
                   opacity:0
               },{
                   duration:300
               });
               $(".q4-p1").velocity({
                   bottom:332,
                   opacity:0
               },{
                   duration:700
               })
               $(".q4-p2").velocity({
                   bottom:362,
                   opacity:0
               },{
                   duration:600,
                   delay:100,
               });
               $(".q4-right").show().velocity({
                   opacity:1
               },{
                   duration:500,
                   delay:300
               });
               $(".q4-right-pop").show().velocity({
                   opacity:1,
                   scale:[1,.7]
               },{
                   duration:700,
                   easing:'spring',
                   delay:300,
                   complete:function(){
                       Score+=30;
                       rightToScore();
                       _this._showNext();
                   }
               });
           } else{
               $(this).find(".q4-w").show();
               $(this).find(".q4-word").hide();
               $(".q4-p1").velocity({
                    bottom:332,
                   opacity:0
               },{
                   duration:700
               })
               $(".q4-p2").velocity({
                   bottom:362,
                   opacity:0
               },{
                   duration:600,
                   delay:100,
                   complete:function(){
                       _this._showNext();
                   }
               });
               $(".q4-wrong").show().velocity({
                   opacity:1
               },{
                   duration:500,
                   delay:300
               })

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

        var currentTarget  = null;
        var orPos = null,orPt = null;
        var topDis = 100,selfLeft = 0;
        var currentIndex = [0,0,0,0];
        var currentTouch = null;

        $(".q5-submit").click(function(){
            if(currentIndex[0] == "b" && currentIndex[1]=="d" && currentIndex[2] =="a"){
                Score+=30;
                rightToScore();
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
            }else{
                $(".q5-wrong").show().velocity({
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

        $(".q5-bottle").bind("touchstart",function(e){
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
            if(currentTarget && currentTouch){
                $(".q5-tip").hide();
                var touch = currentTouch;
                var left = orPos.left + (touch.pageX - orPt.left) ,top = orPos.top + (touch.pageY - orPt.top);
                var index = getCurrentCube({top:top,left:left});
                if(index || index ==0){
                    //$(".q5-cube").removeClass("selected");
                    //$(".q5-cube").eq(index).addClass("selected");
                    currentTarget.css({
                        top:$(".q5-cube").eq(index).offset().top - topDis,
                        left:$(".q5-cube").eq(index).offset().left
                    })
                    console.log()
                    var tag = currentTarget.attr("tag");
                    if(currentIndex[index]){
                        var lastTag = currentIndex[index];
                        var lastIndex = getIndexByTag(tag);
                        currentIndex[index] = tag;
                        if(lastIndex!=-1 ){
                            $(".q5-bottle-"+lastTag).css({
                                top:$(".q5-cube").eq(lastIndex).offset().top - topDis,
                                left:$(".q5-cube").eq(lastIndex).offset().left
                            });
                            currentIndex[lastIndex] = lastTag;
                        }else{
                            $(".q5-bottle-"+lastTag).attr("style","");
                        }
                    }else{
                        var lastIndex = getIndexByTag(tag);
                        currentIndex[index] = tag;
                        if(lastTag!=-1){
                            currentIndex[lastIndex] = null;
                        }
                    }

                }else{
                    currentTarget.css({
                        top:orPos.top - topDis,
                        left:orPos.left
                    })
                }
                var allSelected = true;
                for(var i=0;i<currentIndex.length;i++){
                    if(!currentIndex[i]){
                        allSelected = false;
                    }
                }
                if(allSelected){
                    $(".q5-submit").show();
                }

                function getIndexByTag(g){
                    for(i=0;i<currentIndex.length;i++){
                        if(currentIndex[i] == g){
                            return i
                        }
                    }
                    return -1;
                }
            }
            currentTarget  = currentTouch = null;
            orPos = null;
        }).bind("touchmove",function(e){
            e.stopPropagation();
            e.preventDefault();
            if(currentTarget){
                var touch = currentTouch = e.originalEvent.touches[0]
                var x = orPos.left + (touch.pageX - orPt.left) ,y = orPos.top - topDis + (touch.pageY - orPt.top);
                currentTarget.css({
                    top:y,
                    left:x
                });
            }
        });

        function getCurrentCube(pos){
            var lDis = 50,tDis = 200;
            for(var i=0;i<_this._cubelist.length;i++){
                var p = _this._cubelist[i];
                if(Math.abs(p.top - pos.top)<tDis){
                    if(Math.abs(p.left - pos.left)<lDis){
                        return i;
                    }
                }
            }
        }

    },
    _cubelist:[],
    show: function () {
        var _this = this;
        _this._cubelist.push($(".q5-a").offset());
        _this._cubelist.push($(".q5-b").offset());
        _this._cubelist.push($(".q5-c").offset());
        _this._cubelist.push($(".q5-d").offset());
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

CurrentLesson = 5;
Controler.show(Q1);