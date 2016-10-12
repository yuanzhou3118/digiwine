function clip() {
    this.sizeW = parseInt($('#showCase').outerWidth()); // 裁切宽高
    this.sizeH = parseInt($('#showCase').outerHeight()); // 裁切宽高
    this.init();
    this.posX = 0;
    this.posY = 0;
    this.lastPosX = 0;
    this.lastPosY = 0;
    this.scale = 1;
    this.last_scale = 1;
    this.min = 1;
    this.r_w = 1 / 2; //视口中心点到左端与总宽度比率
    this.r_h = 1 / 2;
}
clip.prototype = {
    init: function () {
        var _this = this;
        var $file = $('#files2');
        $file.makeThumb({
            width: 2000,
            height: 2000,
            //mark: {padding: 5, src: 'mark.png', width: 30, height: 30},
            success: function (dataURL, tSize, file, sSize, fEvt) {
                var thumb = new Image();
                thumb.src = dataURL;
                // 可以得到图片名, 高度等信息, 用来做一些判断, 比如图片大小是否符合要求等..
                var zloading = _this.dialog('', { buttons: false, show_close_button: false, modal: false, custom_class: 'ZebraDialog_loading' });
                var img = new Image(), scale;
                img.src = dataURL;
                img.alt = file.name;
                img.id = 'clip_img';

                img.addEventListener('load', setupCanvases, false);
                function setupCanvases() {
                    _this.reset();
                    zloading.close();
                    var w1 = _this.w1 = parseInt(img.width),
                        h1 = _this.h1 = parseInt(img.height),
                        w = _this.w = parseInt($('#frame').outerWidth()),
                        h = _this.h = parseInt($('#frame').outerHeight());
                    if($('#clip_img').length==0){
                        document.getElementById('preview').appendChild(img);
                    }else{
                        $('#clip_img')[0].src=dataURL;
                    }
                    // 以高度为放缩基点
                    if (w1 / h1 < w / h) {
                        scale = _this.scale = w / w1;
                        _this.posX = _this.lastPosX = (w - w1 * scale) / 2;
                        _this.min = _this.sizeW / w1;
                    } else {
                        scale = _this.scale = h / h1;
                        _this.posY = _this.lastPosY = (h - h1 * scale) / 2;
                        _this.min = _this.sizeH / h1;
                    }
                    _this.show('transformend');
                    _this.multitouch();
                    $('#files2').val('');
                }
                var title = file.name;
            }
        });

        //保存
        $('#clip').bind('click', function () {
            hidePop($('.pop_upload'));
            _this.draw();
            _this.reset();
        })
        //取消
        $('#cancel').click(function () {
            _this.reset();
        })
        function bind(object, fun, args) {
            var args = Array.prototype.slice.call(arguments).slice(2);
            return function () {
                return fun.call(object, this);
            }
        }
    },
    draw: function () {
        var img = document.querySelector('#clip_img'),
            scale = this.scale;
        if (!img) { return false }
        var w = this.w, h = this.h, w1 = this.w1, h1 = this.h1,
            pos = this.getViewPortPos(),
            x1 = pos.x,
            y1 = pos.y,
            x2 = 0,
            y2 = 0;
            //Zsize = size / scale;
        var canvas;
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.width = this.sizeW/scale;
            canvas.height = this.sizeH/scale;
        }
        if(x1<0){
            x2 = -x1*scale;
            x1 = 0;
        }
        if(y1<0){
            y2 = -y1*scale;
            y1 =0;
        }
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.sizeW, this.sizeH);

        ctx.drawImage(img, x1, y1, this.sizeW/scale, this.sizeH/scale, x2, y2, this.sizeW/scale, this.sizeH/scale);
        var imgData = canvas.toDataURL();

        document.querySelector('#btn_pop_upload').src = imgData
        var b64 = imgData.substring(imgData.indexOf(",") + 1);
    },
    multitouch: function () {
        var _this = this;
        if(this.hammertime!=null){
            return this.hammertime
        }

        var hammertime = this.hammertime = Hammer(document.getElementById('frame'), {
            transform_always_block: true,
            drag_block_horizontal: true,
            drag_block_vertical: true,
            drag_min_distance: 0
        });
        hammertime.on('touch drag dragend transform transformend', function (ev) {
            manageMultitouch(ev);
        });

        function manageMultitouch(ev) {
            switch (ev.type) {
                case 'drag':
                    _this.posX = ev.gesture.deltaX + _this.lastPosX;
                    _this.posY = ev.gesture.deltaY + _this.lastPosY;
                    break;

                case 'transform':
                    _this.scale = Math.max(_this.min, Math.min(_this.last_scale * ev.gesture.scale, 10));
                    //以容器为中心点,放大后左半边的位移等于(中心点坐标-放大后左边大小)
                    var getPos = _this.getPosTransform();
                    _this.posX = getPos.x;
                    _this.posY = getPos.y;
                    break;
            }
            _this.show(ev.type);
        }
    },
    show: function (type) {
        var matrix = 'matrix(' + this.scale + ',0,0,' + this.scale + ',' + this.posX + ',' + this.posY + ')';
        document.querySelector('#preview').style.webkitTransform = matrix;
        if (type == "dragend" || type == "transformend") {
            this.lastPosX = this.posX;
            this.lastPosY = this.posY;
            this.last_scale = this.scale;

            // r_w,r_h 以视口中心点为基点,计算左侧占比
            var r = this.getPosRatio(this.scale);
            this.r_w = r.r_w;
            this.r_h = r.r_h;
        }
    },
    // 裁切框左上角x,y
    getViewPortPos: function () {
        // 视口中心点的左侧占比*总长度 等于 视口中心x,y
        return {
            x: this.w1 * this.r_w - this.sizeW / 2 / this.scale,
            y: this.h1 * this.r_h - this.sizeH / 2 / this.scale
        }
    },
    // img位移x,y
    getPosTransform: function () {
        var w1 = this.w1,
            h1 = this.h1,
            w = this.w,
            h = this.h,
            scale = this.scale;
        return {
            x: (w / 2 - w1 * this.r_w * scale),
            y: (h / 2 - h1 * this.r_h * scale)
        }
    },
    // 获取位移比率,以容器中心点为基点,放大后左半边的占比(中心点+左位移 除以 总大小)
    getPosRatio: function () {
        var w1 = this.w1,
            h1 = this.h1,
            w = this.w,
            h = this.h,
            scale = this.scale;
        return {
            r_w: (w / 2 - this.posX) / (w1 * scale),
            r_h: (h / 2 - this.posY) / (h1 * scale)
        }
    },
    // 重置
    reset: function () {
        this.posX = 0;
        this.posY = 0;
        this.lastPosX = 0;
        this.lastPosY = 0;
        $('#preview').empty();
        $('#preview').css({ '-webkit-transform': 'none' });
    },
    // 消息提示
    dialog: function (str, json) {
        return new $.Zebra_Dialog(str, json);
    }
}
