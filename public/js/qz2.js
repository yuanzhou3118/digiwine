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

        var $a = $(".q1-aw"),
            $b = $(".q1-bw"),
            $c = $(".q1-cw"),
            $d = $(".q1-dw"),
            $cubes = $(".q1-cube");
        $cubes.click(function () {
            $cubes.unbind("click");
            if ($(this).hasClass("right")) {
                Score += 30;
                rightToScore();
                //right
                $a.hide();
                $b.hide();
                $c.hide();
                var effectDuring = 700,
                    effectEasing = 'spring';

                $(".q1-r-cube").show();

                var common_opt = {duration: effectDuring, easing: effectEasing};
                $(".q1-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                });

                $(".q1-r-glass .q1-glass-resize").show().velocity({
                    height: 155
                }, {
                    duration: 500
                });

            } else {
                //wrong
                $(this).find(".q1-w-cube").show();
                $(this).find(".q1-p").hide();
                $(".q1-w-glass .q1-glass-resize").show().velocity({
                    height: 155
                }, {
                    duration: 500,
                    complete: function () {
                        _this._showNext();
                    }
                });

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
        var documentHeight = $("body").height();
        if (documentHeight < 930) {
            var bottom = documentHeight - 930;
            $(".q2-main").css({
                bottom: bottom
            })
        }
        var $cube = $(".q2-cube");
        $cube.click(function () {
            $cube.hide();
            if ($(this).hasClass("right")) {
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
                $(".q2-wrong-wrap").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: 'spring',
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
                height: 85*heightScale+"%"
            })
        }

        var $cubes = $(".q3-cube");
        $cubes.click(function () {
            var $this = $(this);
            $cubes.unbind("click");
            if ($this.hasClass("right")) {
                Score += 30;
                rightToScore()
                var cube = $this.find(".cube");
                cube.attr("src", "images/qz2/q3-right-cube.png").css({
                    marginLeft: "-145px",
                    marginBottom: "-4px"
                });
                cube.velocity({
                    opacity: [1, .7],
                    scale: [1, .9]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                })
            } else {
                var pant = $this.find(".pant")
                pant.attr("src", "images/qz2/q3-wrong-paint.png").css({
                    marginLeft: "-75px"
                });
                pant.velocity({
                    scale: [1.1, 1],
                    marginBottom: 6
                }, {
                    duration: 100,
                    complete: function () {
                        pant.velocity("reverse", {
                            duration: 100,
                            complete: function () {
                                _this._showNext();
                            }
                        })
                    }
                })
                $this.find(".word").attr("src", "images/qz2/q3-wrong.png");
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

        var $cubes = $(".q4-cube");
        $cubes.click(function () {
            var $this = $(this);
            if ($this.hasClass("right")) {
                rightToScore();
                Score += 30;
                $cubes.hide();

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
                $(".q4-right-bg").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                });

            } else {
                $this.find(".q4-word").hide();
                $this.find(".q4-wrong").show();
                _this._showNext();
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

        var $cube = $(".q5-cube");
        $cube.click(function () {
            var $this = $(this);
            if ($this.hasClass("selected")) {
                $this.removeClass("selected");
            } else {
                $this.addClass("selected");
            }
        });

        $(".q5-more-submit").click(function () {
            $(this).unbind("click");
            if ($(".q5-cube.selected").length == 3) {
                Score += 30;
                rightToScore();
                $cube.find(".q5-select").hide();
                $cube.find(".q5-selected").show();
                $cube.removeClass("selected");

                $(".q5-right").show().velocity({
                    opacity: 1,
                    scale: [1, .7]
                }, {
                    duration: 700,
                    easing: "spring",
                    complete: function () {
                        _this._showNext();
                    }
                });
            } else {
                $cube.hide();
                $(".q5-bg").hide();
                $(".q5-wrong-bg").show();
                $(".q5-wrong").show();
                _this._showNext();
            }
            $(".q5-word").hide();
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
Controler.show(Q1);
CurrentLesson = 2;