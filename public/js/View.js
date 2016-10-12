var Controler = (function () {
    var _ = {};
    var ViewList = [];

    _.push = function (view) {
        ViewList.push(view);
    }

    _.show = function (view) {
        var currentView = getCurrentView();
        if (!view.equals(currentView)) {
            currentView && currentView.hide();
            view.show();
        }
    }

    function getCurrentView() {
        for (var i = 0; i < ViewList.length; i++) {
            var v = ViewList[i];
            if (v.visible) {
                return v;
            }
        }
        return null;
    }

    return _;
}());

var View = function (options) {
    var _ = {}
    _.id = options.id;
    _.visible = false;
    var inited = false;
    var $wrap = $("#" + _.id);
    if (!$wrap.length) {
        throw error("view init wrong:name=" + name);
    }
    _.init = function (cb) {
        if (!inited) {
            inited = true;
            //TODO common init function

            options.init && options.init();

            cb && cb();
        }

    }

    _.show = function () {
        if (inited) {
            //common
            $wrap.find(".q-score").html(Score);
            _.visible = true;
            switch (options.showStyle) {
                case "slideLeft":
                    $wrap.css({'z-index': 9});
                    $wrap.velocity({
                        marginLeft: ['0%', '100%']
                    }, {
                        duration: 800,
                        complete: function () {
                            options.show && options.show();
                        }
                    })
                    break;
                default:
                    $wrap.fadeIn(500, function () {
                        options.show && options.show();
                    });
                    options.fontshow && options.fontshow();
            }

        } else {
            _.init(_.show);
        }
    };

    _.hide = function () {
        switch (options.hideStyle) {
            case "slideLeft":
                $wrap.css({'z-index': 1});
                $wrap.velocity({
                    marginLeft: ['-100%', '0%']
                }, {
                    duration: 800,
                    complete: function () {
                        hideDone();
                    }
                })
                break;
            default:
                $wrap.fadeIn(500, function () {
                    hideDone();
                });
        }
        function hideDone() {
            _.visible = false;
            options.hide && options.hide();
        }

    }

    _.equals = function (v) {
        if (v && _.id == v.id) {
            return true;
        } else {
            return false;
        }
    }

    //add view into controler;
    Controler.push(_);

    _.param = options;
    return _;
}
