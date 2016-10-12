/**
 * Created by Cloud on 2015/11/28.
 */
var LessonTemp =
    '<div class="wine-detail-lesson">' +
        '<img src="images/other/lesson-{{lesson_number}}-title.png" class="lesson-title-img"/>' +
        '<div class="lesson-detail-title">{{lesson_title}}</div>' +
        '<div class="lesson-list lesson-detail-c">' +
            '<div class="lesson-item">' +
                '<div class="lesson-pic">' +
                    '<div id="video-wrap" style="width:540px;height:316px;">' +
                        '<img src="images/other/lesson{{lesson_number}}banner.png"/>' +
                    '</div>' +
                    '<div class="time-tips">' +
                        '<div class="icons video-s-icon"></div>' +
                        '<span class="time">{{video_duration}}</span>' +
                    '</div>' +
                    '<div class="play-icon"></div>' +
                '</div>' +
                '<div class="lesson-content">' +
                    '<p>{{lesson_content}}</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<a class="test-btn" href="qz{{lesson_number}}.html">' +
        '<img src="images/other/test-btn-cube.png"/>' +
        '<div>测试你的<br>品酒师潜质</div>' +
    '</a>' +
    '<div class="lesson-list lesson-detail-c">' +
        '<div class="lesson-item">' +
            '<div class="data-info detail-data-info">' +
                //'<div class="view-b fl">' +
                //    '<span class="icons view-icon"></span>' +
                //    '<span class="number">0</span>' +
                //'</div>' +
                '<div class="view-b fl">' +
                    '<span class="icons comment-icon"></span>' +
                    '<span class="number">0</span>' +
                '</div>' +
                '<div class="view-b share fr">' +
                    '<span class="icons share-icon"></span>' +
                    //'<span class="number">0</span>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<a class="ec-banner" href="{{wechat_shoplink}}"><img src="images/other/ec-banner.jpg"/></a>' +
    '<div class="comment-content">' +
        '<div class="comment-p">' +
            '<span class="comment-icon icons"></span>' +
            '<span class="comment-text">评论</span>' +
            '<span class="login comment-login fr">评论</span>' +
            '<a href="login.html" class="login comment-login fr">登录</a>' +
            '<div class="clear"></div>' +
        '</div>' +
        '<div id="myComment" class="logined publish-comment" style="display: none;">' +
            '<div class="user-head">' +
                '<img id="myCommentAvatar" src="images/other/user-head.jpg"/>' +
            '</div>' +
            '<div class="fl right-p">' +
                '<div id="myCommentName" class="user-name"></div>' +
                '<div class="comment">' +
                    '<textarea id="myCommentComment" width="435px" maxlength="300" style="text-align: left" rows="4" placeholder="请输入你的评论..."></textarea>' +
                '</div>' +
                '<span id="comment-error" class="fl form-error red"></span>' +
                '<div id="myCommentSubmit" class="submit-btn">' +
                    '<span class="submit-text">提交</span>' +
                    '<span class="icons right-arrow"></span>' +
                '</div>' +
                '<div class="clear"></div>' +
            '</div>' +
            '<div class="clear"></div>' +
        '</div>' +
        '<div class="comment-list"></div>' +
        '<div class="more-c-btn" style="display: none;">更多评论</div>' +
    '</div>' +
    '<div class="other-course">' +
        '<img src="images/other/other-lesson-title.png" class="other-lesson-title"/>' +
        '<div class="other-title-text">其他课程</div>' +
        '<p class="other-tips">学完这一课，还有其他课程可以学习哟</p>' +
        '<div id="iscroll">' +
            '<div class="other-lesson-list">' +
                '{{#lesson1}}<div class="other-lesson-item" href="lesson1.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson1banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:11</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">一分钟变身葡萄酒专家</div>' +
                    '</div>' +
                '</div>{{/lesson1}}' +
                '{{#lesson2}}<div class="other-lesson-item" href="lesson2.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson2banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:12</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">酿酒葡萄能吃吗？</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson2}}' +
                '{{#lesson3}}<div class="other-lesson-item" href="lesson3.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson3banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:12</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">如何专业有范地品酒</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson3}}' +
                '{{#lesson4}}<div class="other-lesson-item" href="lesson4.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson4banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:12</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">如何做一个葡萄酒旅游达人</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                         '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson4}}' +
                '{{#lesson5}}<div class="other-lesson-item" href="lesson5.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson5banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:18</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">不要轻信葡萄酒的包装</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson5}}' +
                '{{#lesson6}}<div class="other-lesson-item" href="lesson6.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson6banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:21</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">神马是葡萄酒</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson6}}' +
                '{{#lesson7}}<div class="other-lesson-item" href="lesson7.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson7banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                        '<span class="time fl">1:20</span>' +
                    '</div>' +
                '</div>' +
                '<div class="lesson-content">' +
                    '<div class="title ellipsis">葡萄酒与食物的恋爱</div>' +
                '</div>' +
                '<div class="corkscrew-cover logined-hidden">' +
                    '<img src="images/other/corkscrew-pic.png">' +
                    '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                '</div>' +
                '</div>{{/lesson7}}' +
                '{{#lesson8}}<div class="other-lesson-item" href="lesson8.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson8banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:19</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">盲品是真的还是骗人</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson8}}' +
                '{{#lesson9}}<div class="other-lesson-item" href="lesson9.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson9banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:18</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">如何伺候一瓶葡萄酒？</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson9}}' +
                '{{#lesson10}}<div class="other-lesson-item" href="lesson10.html">' +
                    '<div class="lesson-pic">' +
                        '<img src="images/other/lesson10banner.png"/>' +
                        '<div class="time-tips">' +
                            '<div class="icons video-s-icon"></div>' +
                            '<span class="time fl">1:18</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lesson-content">' +
                        '<div class="title ellipsis">如何快速识别酒标？</div>' +
                    '</div>' +
                    '<div class="corkscrew-cover logined-hidden">' +
                        '<img src="images/other/corkscrew-pic.png">' +
                        '<a href="login.html" class="white corkscrew-tip">登录查看更多课程</a>' +
                    '</div>' +
                '</div>{{/lesson10}}' +
                '{{#User}}<div class="other-lesson-item">' +
                    '<div class="lesson-placeholder"></div>' +
                    '<div class="corkscrew-cover">' +
                        '<div class="more">敬请期待<br>更多课程</div>' +
                    '</div>' +
                '</div>{{/User}}' +
            '</div>' +
        '</div>' +
    '</div>';
