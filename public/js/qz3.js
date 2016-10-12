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
        var documentHeight = $("body").height();
        if (documentHeight < 970) {
            var heightScale = documentHeight / 970;
            $(".q1-main").css({
                height: 85 * heightScale + "%"
            })
        }

        var $cubs = $(".q1-cube");
        $cubs.click(function () {
            $cubs.unbind("click");
            var $this = $(this);
            if ($this.hasClass("right")) {
                Score += 30;
                rightToScore();
                $this.find(".word").attr("src", "images/qz3/q1-right.png");
                $(".q1-right-bg").show().velocity({
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
                $this.find(".word").attr("src", "images/qz3/q1-wrong.png");
                $this.find(".cube").attr("src", "images/qz3/q1-" + $this.attr("type") + "w.png");
                _this._showNext();
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

        var $cube = $(".q2-cube");
        var $r = $(".q2-wr"),
            $l = $(".q2-wl"),
            $bottle = $(".q2-bottle-wrap");
        $cube.click(function () {
            var $this = $(this), pos = JSON.parse($this.attr("b"));
            var bottleLeft = pos[0], bottleHeight = pos[1];
            $bottle.show().css({left: bottleLeft}).velocity({
                height: [bottleHeight, 250]
            }, {
                duration: 300,
                complete: function () {
                    if ($this.hasClass("right")) {
                        Score += 30;
                        rightToScore();
                        $(".q2-right").show().velocity({
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
                        var wr = JSON.parse($this.attr("wr"));
                        var wl = JSON.parse($this.attr("wl"));
                        $r.show();
                        $l.show();
                        $r.css({
                            'left': wr[0],
                            'margin-top': wr[1]
                        });
                        $l.css({
                            'left': wl[0],
                            'margin-top': wl[1]
                        });
                        var w = JSON.parse($this.attr("w"));
                        $(".q2-wrong").css({
                            'margin-top': w[0] + "px",
                            "left": w[1] + "px"
                        }).show();
                        _this._showNext();
                    }
                    ;
                }
            })
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
        })
    },
    init: function () {
        var _this = this;
        var $cubes = $(".q3-cube");
        $cubes.click(function () {
            var $this = $(this);
            var selected = $this.find(".q3-select");
            if (selected.hasClass("hidden")) {
                selected.removeClass("hidden");
            } else {
                selected.addClass("hidden");
            }
        });

        $(".q3-submit").click(function () {
            var a = $(".q3-a").find(".q3-select.hidden").length;
            var b = $(".q3-b").find(".q3-select.hidden").length;
            var c = $(".q3-c").find(".q3-select.hidden").length;

            var number = $cubes.find(".q3-select.hidden").length;
            if (number == 5) {
                return;
            } else if (number == 2 && !a && !b && !c) {
                $(".q3-a").velocity({
                    width: "92px",
                    height: "92px",
                    left: '122px',
                    top: '25%'
                }, {
                    duration: 400,
                });
                $(".q3-b").velocity({
                    width: "104px",
                    height: "104px",
                    left: '254px',
                    top: '16%'
                }, {
                    duration: 400,
                })
                $(".q3-c").velocity({
                    width: "77px",
                    height: "77px",
                    left: '474px',
                    top: '28%'
                }, {
                    duration: 400,
                });
                $(".q3-a").find(".q3-circle").attr("src", "images/qz3/q3-ar.png");
                $(".q3-b").find(".q3-circle").attr("src", "images/qz3/q3-br.png");
                $(".q3-c").find(".q3-circle").attr("src", "images/qz3/q3-cr.png");
                $(".q3-border").hide();
                $(".q3-d").hide();
                $(".q3-e").hide();
                $(".q3-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring'
                });
                Score += 30;
                rightToScore();
                _this._showNext();
            } else {
                $(".q3-select:not(.hidden)").parent().find(".q3-wrong").show();
                $(".q3-select:not(.hidden)").parent().find(".q3-circle").hide();
                _this._showNext();
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

        var documentHeight = $("body").height();
        var moveBottom = 0
        if (documentHeight < 970) {
            moveBottom = documentHeight - 970;
            $(".q4-main").css({
                'margin-bottom': moveBottom + 'px'
            })
        }

        var position = $(".q4-pan").position();
        var r = 150 / 2;
        var center = {x: r, y: r};
        var origin = {x: position.left + r, y: (position.top - moveBottom + 120 + r)};
        var currentAngle = 180;
        $(".q4-pan").bind("touchmove", function (e) {
            //console.log("top="+(position.top+120)+" left="+position.left);
            var touch = e.originalEvent.touches[0]
            //console.log("originX=" + origin.x + " pageX=" + touch.pageX + " originY=" + origin.y + " pageY=" + touch.pageY);
            var angle = 360 - (getAngel(touch.pageX, touch.pageY, origin.x, origin.y));
            if (angle > 40 && angle < 340) {
                currentAngle = angle;
                var opacity = 1 - (currentAngle) / 360;
                $(".q4-shen").css({
                    opacity: opacity
                })
                $(".q4-point").css({
                    "transform": "rotateZ(" + angle + "deg)"
                })
            }
        });

        $(".q4-pan").bind("touchend", function (e) {
            if (currentAngle > 220) {
                //alert("RIGHT");
                $(".q4-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring'
                });
                $(".q4-right-word").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    delay: 100,
                    easing: "spring",
                    complete: function () {
                        Score += 30;
                        rightToScore();
                        _this._showNext();
                    }
                })
            } else {
                //alert("WRONG");
                $(".q4-wrong").show().velocity({
                    opacity: 1,
                    scale: [1, .7],
                    bottom: ["680px", "640px"]
                }, {
                    duration: 700,
                    easing: 'spring'
                });
                $(".q4-wrong-text").show().velocity({
                    opacity: 1,
                    scale: [1, .7],
                    bottom: ["550px", "510px"]
                }, {
                    duration: 700,
                    delay: 100,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                })

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
        var $cubes = $(".q5-cube");
        $cubes.click(function () {
            var $this = $(this);
            if ($this.hasClass("right")) {
                $cubes.hide();
                $(".q5-w").hide();
                $(".q5-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
                        Score += 30;
                        rightToScore();
                        _this._showNext();
                    }
                });
                $(".q5-wrong-cup").show();
            } else {
                $this.find(".q5-wrong").show();
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

Controler.show(Q1);
CurrentLesson = 3;