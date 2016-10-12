var preloadimg = function(arr,comp){
	var n = 0;
	var loadImg = function(src){
		var img = new Image();
		img.onload = function(){
			n++;
			var t = Math.round(n/l*100);
			$("#loadingText").html(t+" %");
			if(n == l){
				comp();
			}
		}
		img.src = src;
	}
	if(typeof(arr) == "string"){
		var l = 1;
		var w = new loadImg(arr);
	}else{
		var l = arr.length;
		for(var i=0;i<l;i++){
			var w = new loadImg(arr[i]);
		}
	}
}

var createRule = function(){
	$("<div>").attr("id","mask2").appendTo($("body"));
	var ruleBlock = $("<div>").attr("id","ruleBlock").appendTo($("body"));
	$("<h2>").html("活动规则").appendTo(ruleBlock);
	$("<p>").addClass("stepTitle").html("<span>Step1</span>").appendTo(ruleBlock);
	$("<p>").html("上传/拍摄一张不经意的精彩瞬间照片<br />并留下你的真情感言吧；").appendTo(ruleBlock);
	$("<p>").addClass("stepTitle").html("<span>Step2</span>").appendTo(ruleBlock);
	$("<p>").html("将照片分享至朋友圈/好友微信，<br />叫上小伙伴一起上传他们的精彩瞬间；").appendTo(ruleBlock);
	$("<p>").addClass("stepTitle").html("<span>Step3</span>").appendTo(ruleBlock);
	$("<p>").html("留下你的手机号码，<br />坐等荣耀6提供的荣耀大奖（奖项TBC）来砸你；").appendTo(ruleBlock);
	$("<p>").addClass("stepTitle").html("<span>Step4</span>").appendTo(ruleBlock);
	$("<p>").html("PS：想查阅自己或他们的精彩瞬间？<br />别忘了登录活动WAP Site/Minisite哦！<br />活动时间：2014年8月27日－2014年9月24日").appendTo(ruleBlock);
	$("<p>").addClass("text-center mt20 mb20").html("<a id='closeRule'>返回</a>").appendTo(ruleBlock);

	$("#closeRule").click(function(){
		$("#mask2, #ruleBlock").remove();
		return false;
	})

	return false;
}

$(document).ready(function(){

function orientationChange(){ 
  switch(window.orientation) { 
    case 0:
      $("#tishi").fadeOut();
      break;
    case 180:
      $("#tishi").fadeOut();
      break;
    case -90:
      $("#tishi").fadeIn();
      break;
    case 90:
      $("#tishi").fadeIn();
      break;
  } 
} 
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false); 

$("<div>").attr("id","tishi").appendTo($("body"));


})

