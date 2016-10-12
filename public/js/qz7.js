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
        $(".q1-cube").click(function () {
            var $this = $(this);
            if ($this.hasClass("selected")) {
                $this.removeClass("selected");
            } else {
                $this.addClass("selected");
            }
        });

        $(".q1-submit").click(function () {
            var $selected = $(".q1-cube.selected");
            var length = $selected.length
            if (length) {
                $(".q1-cube").hide();
                $(this).hide();
                if (length == 3) {
                    //right
                    Score += 30;
                    rightToScore();
                    $(".q1-right").show().velocity({
                        opacity: 1,
                        scale: [1, .7]
                    }, {
                        duration: 700,
                        easing: "spring",
                        complete: function () {
                            _this._showNext();
                        }
                    })
                } else {
                    //wrong
                    for (var i = 0; i < length; i++) {
                        var t = $selected.eq(i);
                        $(".q1-wrong-" + t.attr("tag")).show();
                        _this._showNext();
                    }
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
    init: function () {
        var _this = this;
    },
    _toLeft: function () {
        var _this = this;
        Score += 30;
        rightToScore();
        _this._hideStep1();
        $("#q2-yes").hide();
        $("#q2-no").hide();
        $("#q2-left").velocity({
            right: "20%"
        }, {
            duration: 700,
        });
        $("#q2-right").velocity({
            left: "100%",
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
            complete: function () {
                _this._showNext()
            }
        });
    },
    _toRight: function () {
        var _this = this;
        _this._hideStep1();
        $("#q2-right").velocity({
            left: "25%",
            bottom: "35%",

        }, {
            duration: 700
        });
        $("#q2-left").velocity({
            right: "100%"
        }, {
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
    _hideStep1: function () {
        $("#q2-yes").hide();
        $("#q2-no").hide();
        $("#q2-phone").hide();
        $("#q2-tip").hide();
    },
    show: function () {
        var _this = this;
        Delay(function () {
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
            }, 300);
        })
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
        $(".q3-cube").click(function () {
            var $this = $(this);
            $(".q3-cube").hide();
            $(".q3-word").hide();
            if ($this.hasClass("right")) {
                Score += 30;
                rightToScore();
                $(".q3-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                })
            } else {
                $(".q3-wrong").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
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
            var $this = $(this);
            var tag = $this.attr("tag");
            $(".q4-cube").hide();
            $(".q4-flower").velocity({
                opacity: 0
            }, {
                duartion: 300
            });
            $(".q4-b" + tag).addClass("selected");
            if ($this.hasClass("right")) {
                Score += 30;
                rightToScore();

                $(".q4-flower-right").show().velocity({
                    opacity: 1
                }, {
                    duartion: 300
                });
                $(".q4-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    delay: 1000,
                    duartion: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                })
                dao();
            } else {
                $(".q4-flower-wrong").show().velocity({
                    opacity: 1
                }, {
                    duartion: 300
                });
                $(".q4-wrong").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    delay: 1000,
                    duartion: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                })
                dao();
            }

            function dao(cb) {
                $(".q4-bottle.selected").velocity({
                    left: 317,
                    rotateZ: -106,
                    marginBottom: -80
                }, {
                    duration: 800,
                    complete: function () {
                        $(".q4-liu").velocity({
                            height: 101
                        }, {
                            duration: 300
                        })
                    }
                })

            }

            $(".q4-bottle:not('.selected')").hide();

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
        $(".q5-cube").click(function () {
            var _ = $(this);
            if (_.hasClass("right")) {
                //right
                $(".q5-cube").hide();
                Score += 30;
                rightToScore();
                $(".q5-right").show().velocity({
                    opacity:1,
                    scale:[1,.7]
                },{
                    duartion:700,
                    easing:"spring",
                    complete:function(){
                        _this._showNext();
                    }
                })
            } else {
                _.find(".q5-w").show();
                _.find(".q5-word").hide();
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

CurrentLesson = 7;
Controler.show(Q1);