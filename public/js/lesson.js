/**
 * Created by Cloud on 2015/11/28.
 */
$(function () {
    if (User) {
        User.avatarurl && $("#myCommentAvatar").attr("src", User.avatarurl);
        $("#myCommentName").html(User.name);
    }

    $(".other-lesson-item").click(function () {
        var _ = $(this);
        if(_.find(".corkscrew-cover").length && !User){
            return;
        }
        var href = $(this).attr("href");
        href && (location.href = href)
    })

    var myScroll;
    $('.other-lesson-list').css('width', 264 * $('.other-lesson-item').length + $('.other-lesson-item').length * 15 + 15);
    $("#iscroll").mCustomScrollbar({
        horizontalScroll: true
    });
    $("#myCommentComment").blur(function () {
        commentValidate($(this).val());
    });

    var commentSubmitFlag = true;
    $("#myCommentSubmit").click(function () {
        var comment = $("#myCommentComment").val();
        if (commentValidate(comment)) {
            if (commentSubmitFlag) {
                commentSubmitFlag = false;
                Request.lesson_comment(function(data){
                    if (data.result == 1) {
                        console.log("添加课程评论成功");
                        location.reload();
                    } else if (data.result == 0) {
                        alert("评论课程失败");
                    } else if (data.result == 2) {
                        alert("课程不存在");
                    } else if (data.result == -1) {
                        alert("字符数超限");
                    }
                    commentSubmitFlag = true;
                },CurrentLesson, $.trim(comment));
            } else {
//                    alert("请不要重复提交，稍后再试");
            }
        }
    })

    function commentValidate(v) {
        if (Validate.isEmpty(v) || $.trim(v).length<15 || $.trim(v).length>300) {
            $("#comment-error").html("请输入您的评论(15~300字)");
            return false;
        } else {
            $("#comment-error").html("");
            return true;
        }
    }

//  TODO
//    Request.get_lessonInfo(CurrentLesson, {
//        success: function (data) {
//            if (data.haserror) {
////                    alert(data.msg);
//            } else {
//                var lesson = data.lessoninfo;
//
//                $lessonNumber.eq(0).html(lesson.view);
//                $lessonNumber.eq(1).html(lesson.comment);
//                $lessonNumber.eq(2).html(lesson.share);
//            }
//        }
//    });
    var $lessonNumber = $(".lesson-item").find(".number");
    var moveBtn = $(".more-c-btn");
    var nextPage = 1,pageSize = 5,maxPage = 999;
    function loadComment() {
        Request.lesson_query_comment(function(resultData){
            if(resultData.data && resultData.data.length){
                var comments = resultData.data,maxPage = Math.ceil(resultData.total_count/pageSize);
                $lessonNumber.eq(0).html(resultData.total_count);
                if (nextPage >= maxPage) {
                    moveBtn.hide();
                } else {
                    ++nextPage;
                    moveBtn.show();
                }
                var html = "";
                for (var i = 0; i < comments.length; i++) {
                    var c = comments[i];
                    var htmlTemp = '<div class="comment-item"><div class="user-head"><img src="' +
                        c.head_url +'"/></div><div class="fl right-p"><div class="user-name">'+
                        decodeURIComponent(c.nick_name)+'<span class="time">' +
                        c.created_at + '</span>'+
                        '</div><p class="comment-t">' +
                        c.comment + '</p></div><div class="clear"></div></div>';
                    html += htmlTemp;
                }
                $(".comment-list").append(html);
            }
        },pageSize,nextPage,CurrentLesson);
    }

    loadComment();
    moveBtn.click(function () {
        loadComment();
    })
    var $viewWrap = $("#video-wrap");
    var LessonVideo = {
        1: "XMTQzOTI4OTU2OA==",
        2: "XMTQzOTI5MjUwNA==",
        3: "XMTQzOTI5MzkyMA==",
        4: "XMTQzOTI5NTE3Ng==",
        5: "XMTQzOTI5NzA1Ng==",
        6: "XMTQzOTI5ODQ5Ng==",
        7: "XMTQzOTMwMDA2MA==",
        8: "XMTQyMTQyMTM5Mg==",
        9: "XMTQyNzU4ODc5Ng==",
        10:"XMTQzNzA3Nzg3Ng=="
    }
    var LessonVidePoster = {
        1:"images/other/lesson1banner.png",
        2:"images/other/lesson2banner.png",
        3:"images/other/lesson3banner.png",
        4:"images/other/lesson4banner.png",
        5:"images/other/lesson5banner.png",
        6:"images/other/lesson6banner.png",
        7:"images/other/lesson7banner.png",
        8:"images/other/lesson8banner.png",
        9:"images/other/lesson9banner.png",
        10:"images/other/lesson10banner.png"
    }
    $.soap({
        url: "http://events.youku.com/2015/video-source/api/soap/video-files-service.php",
        method: "getVideoFiles",
        appendMethodToURL: false,
        soap12: true,
        data: {
            vid: LessonVideo[CurrentLesson],
            password:""
        },
        success: function(soapResponse){
            var response = $.xml2json(soapResponse.toString());
            var soapResult = response.Body.getVideoFilesResponse.getVideoFiles;
            var result = $.xml2json(soapResult.toString());
            if (result.status == 1){
                var url = result.data.files.mp4.segs.url;
                drawVideo($viewWrap, url, LessonVidePoster[CurrentLesson], function(){
                    //play track
                    if(User){
                        Request.video_point(function(){
                            console.log("提交看视频加分 success")
                        },CurrentLesson);
                    }
                    datapush(['Lesson_'+CurrentLesson,'Video_start']);
                },function(){
                    //end track
                    datapush(['Lesson_'+CurrentLesson,'Video_end']);
                });
            } else {
                alert("视频资源加载失败");
            }
        }
    });

    $(".test-btn").click(function(){
        datapush(['Lesson_'+CurrentLesson,'Go-to-test']);
    });

    $(".ec-banner").click(function(){
        datapush(['Lesson_'+CurrentLesson,'Micro Store']);
    })
})
