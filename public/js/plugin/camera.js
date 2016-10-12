
// 页面中想要将上传后的照片放在左边还是右边，就把updateImg这个id挂在那个img标签上即可

$(document).ready(function(){

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
   isIphone = 1;
}else{
	isIphone = 0;
}

$("<div>").attr("id","cameraTishi").html("可单指拖动改变照片位置，或双指捏合调整照片大小").appendTo($("#canvasButtonBlock"))
$("<div>").attr("id","canvasSendLoad").html("正在上传").appendTo($(".main-wrap"));

canvas = document.getElementById("photoCanvas");

stage = new createjs.Stage(canvas);
createjs.Touch.enable(stage);
stage.enableMouseOver(10);
stage.mouseMoveOutside = true;
createjs.Ticker.setFPS(24);
createjs.Ticker.on("tick", tick);


function tick() {
    stage.update();
}

var cameraPhoto = new createjs.Container();

stage.addChild(cameraPhoto);

var createCanvas = function(){
	$("<div>").attr("id","mask").appendTo($(".main-wrap"));
	$("#photoCanvasBlock").show();
}

var cancelCanvas = function(){
	$("#photoCanvasBlock").hide();
	$("#mask").remove();
	cameraPhoto.removeAllChildren();
}

var submitCanvas = function(){
	//var content = stage.toDataURL("000000","image/png");
	var content = canvas.toDataURL();
	$("#photoCanvasBlock").hide();
	$("#canvasSendLoad").show();
	Request.update_avatar(content,User.id, {
		success: function(data){
			if(data.haserror){
				//alert(data.msg);
				$("#photoCanvasBlock").show();
				$("#canvasSendLoad").hide();
				//alert(msg.message);
			}else{
				//alert('提交成功');
				var img = new Image();
				img.onload = function(){
					$("#updateImg").attr("src",img.src);

					cancelCanvas();
					$("#canvasSendLoad").hide();
				}
				img.src =VHost+data.userinfo.avatarurl;
				var saveUrl = data.userinfo.avatarurl.replace("/api/avatars/","");
				updateUserAvatar(saveUrl);
				location.href = "account.html";
			}
		},
		error:function(){
			//alert('error');
		}
	});
}
$("#cancelPhoto").bind("click",cancelCanvas);
$('#set-p-n-btn').bind('click',function(){
	Request.update_name(User.id,$('#s-username2').val(), {
		success: function(data){
			if(data.haserror){
				//alert(data.msg);
			}else{
				//alert('提交成功');
				updateUserName($('#s-username2').val());
				location.href = "account.html";
			}
		}
	});
})
$("#submitPhoto").bind("click",submitCanvas);

var addScaleAction = function(bmp){

	var scale = 0.5;
	var defscale = 0.5;
	var isgesture = 0;

	cameraPhoto.on("mousedown", function(evt) {
        // this.parent.addChild(this);
        if(isgesture == 0){
        	this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
        }
        scale = cameraPhoto.scaleY;
    });
    
    cameraPhoto.on("pressmove", function(evt) {
    	if(isgesture == 0){
	        this.x = evt.stageX+ this.offset.x;
	        this.y = evt.stageY+ this.offset.y;
	        update = true;
	    }
    });

    if(!isIphone){
	    var mc = new Hammer(canvas,{touchAction: "pan-y"});
		// mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		// mc.get('pinch').set({ enable: true });
		mc.get('rotate').set({ enable: true });
		mc.on("pan swipe rotate pinch", function(ev) {
		    // el.textContent = ev.type +" "+ el.textContent;
		    //$("#numberText").html(ev.scale);
		    isgesture = 1;
		    if(ev.scale != 1){
		    	s = ev.scale-1;
				cameraPhoto.scaleX = cameraPhoto.scaleY = scale+s;
			}else{
				isgesture = 0;
			}
		});
	}else{
		var gesturestart = function(event){
			isgesture = 1;
		}
		var gesturechange = function(event){
			s = event.scale-1;
			defscale = cameraPhoto.scaleX = cameraPhoto.scaleY = scale+s;
		}
		var gestureend = function(event){
			setTimeout(function(){
				scale = defscale;
				isgesture = 0;
			},10)
		}
	}

	

	canvas.addEventListener("gesturestart", gesturestart, true);
	canvas.addEventListener("gesturechange", gesturechange, true);
	canvas.addEventListener("gestureend", gestureend, true);
}

window.addImg = function(bigUrl){
	var bmp = new createjs.Bitmap(bigUrl);
    var img = new Image();
    img.onload = function(){
        var w = img.width;
        var h = img.height;
        if(w < h){
            var y = (h-600)/2;
            cameraPhoto.y = -1*y;
            // cameraPhoto.x = 300;
        }else{
            var y = (w-600)/2;
            cameraPhoto.x = -1*y;
            // cameraPhoto.y = 300;
        }
        cameraPhoto.regX = cameraPhoto.regY = 300;
        // bmp.scaleX = bmp.scaleY = 0.5;
    }
    img.src = bigUrl;
    cameraPhoto.addChild(bmp);

    addScaleAction(bmp);
}

var createImg = function(imgURL,rot){
    
    var file = filePicture.files[0];
    var mpImg = new MegaPixImage(file);
    var sw = 600, sh = 600;
    var img = new Image();
    img.onload = function() {
        var w = img.width, h = img.height;

        if(rot < 5){
            y = sh;
            x = parseInt(sh/h*w);
            setTimeout(function(){
                mpImg.render(resImg, { width: x, height: y, orientation: rot });
            },200)
        }else{
            y = sw;
            x = parseInt(sw/h*w);
            setTimeout(function(){
                mpImg.render(resImg, { width: x, height: y, orientation: rot });
            },200)
        }
    }
    img.src = imgURL;
}

var filePicture = document.getElementById('takepicture');

filePicture.onchange = function(e){
	var files = e.target.files,
	    file;

	if (files && files.length > 0) {
	    file = files[0];

		createCanvas();

	    fr   = new FileReader;
	    fr.onloadend = function() {

	        var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
	        var rot = exif.Orientation;
	        try {
	            var URL = window.URL || window.webkitURL;
	            var imgURL = URL.createObjectURL(file);
				createImg(imgURL,rot);
	            URL.revokeObjectURL(imgURL);
	        }
	        catch (e) {
	            try {
	                fileReader.onload = function (e) {
	                    createImg(event.target.result,rot);
	                };
	                fileReader.readAsDataURL(file);
	            }
	            catch (e) {
	                throw(new Error("Neither createObjectURL or FileReader are supported"));
	            }
	        }

	    };
	    fr.readAsBinaryString(file);
	}
}

})