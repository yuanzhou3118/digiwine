/**
 * Created by 孙明 on 2015/11/20.
 */

var Ajax = function (api, type, success, data, resultCallback) {
    loadingShow();
    $.ajax({
        'url': VHost + api,
        'type': type || "GET",
        'dataType': 'json',
        'data': data,
        'cache': false,
        "xhrFields": {
            withCredentials: true
        },
        "crossDomain": true,
        'success': function (data) {
            loadingHide();
            if (data.result == 99) {
                if(!(location.href.indexOf("login.html")!=-1)){
                    alert("请先登录");
                    location.href = "login.html";
                }
                return;
            }
            if (resultCallback) {
                resultCallback(data);
            } else {
                if (data.result == 1) {
                    success && success(data);
                } else if (data.result == 0) {
                    alert("请求失败");
                } else if (data.result == 2) {
                    alert("参数错误");
                } else if (data.result == 3) {
                    //alert("没有数据");
                    success && success(data);
                } else {
                    alert("响应异常 result="+data.result);
                }
            }
        },
        'error': function (msg) {
            alert("请求错误:"+api);
            loadingHide();
        },
        'timeout': 10*1000 ,//设置10秒超时
        'complete' : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                loadingHide();
                alert("请求超时,请重试");
            }
        }
    });
}

var Request = {
    wechat_redirect: function (url) {
        var url = url;
        var lastUrl = 'http://glp.nurunci.com/wc/skip.php?type=userinfo&reurl=' + encodeURIComponent(url);
        location.href = lastUrl;
    },
    /** 首页模块 **/

    /**
     *  热门话题
     **/
    topic_home: function (cb) {
        Ajax("/api-topic-home", 'GET', cb);
    },

    /* 热门笔记接口 */
    note_home: function (cb) {
        Ajax("/api-note-home", 'GET', cb)
    },

    /** 话题模块 **/

    /**
     * 查询所有话题接口
     * page_index:int类型，页码，默认从1开始
     * page_size:int类型，分页显示数
     * tag:int类型,标签，热门（999）其他标签分别为1，2，3，4..
     **/
    topic_all: function (cb, page_index, page_size, tag) {
        var data = {
            page_index: page_index,
            page_size: page_size,
            tag: tag
        }

        if (mockTest) {
            cb({
                "result": 1, "data": [
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "aaaaaa",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "aaaaaa",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "aaaaaa",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "aaaaaa",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "aaaaaa",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                ], "total_count": 70
            });
        } else {
            Ajax("/api-topic-all", 'GET', cb, data);
        }
    },
    /**
     * 查询话题接口
     * @param cb
     * @param topic_id:int类型，是话题的id
     */
    topic_view: function (cb, topic_id) {

        if (mockTest) {
            cb({
                "result": 1,
                "topic": [{
                    "question": "话题一",
                    "tag": 1,
                    "favorite": 2,
                    "created_at": "0000-00-00 00:00:00",
                    "comment_count": 4
                }]
            });
        } else {
            Ajax("/api-topic-view", 'GET', cb, {
                topic_id: topic_id
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询话题失败");
                }
            });
        }
    },
    /**
     * 查询话题评论接口（带分页
     * @param cb
     * @param topic_id:int类型，是话题的id
     * @param page_index:int类型，页码，默认从1开始
     * @param page_size:int类型，分页显示数
     */
    topic_query_comment: function (cb, topic_id, page_index, page_size) {
        if (mockTest) {
            cb({
                "result": 1, "commentData": [
                    {
                        "id": 1,
                        "user_id": 1,
                        "content": "话题一评论二",
                        "comment_bang": 20,
                        "head_url": "1号头像",
                        "nick_name": "评论话题一",
                        "kol": 10
                    },
                    {
                        "id": 2,
                        "user_id": 1,
                        "content": "话题一评论二",
                        "comment_bang": 20,
                        "head_url": "1号头像",
                        "nick_name": "评论话题一",
                        "kol": 10
                    },
                    {
                        "id": 3,
                        "user_id": 1,
                        "content": "话题一评论二",
                        "comment_bang": 20,
                        "head_url": "1号头像",
                        "nick_name": "评论话题一",
                        "kol": 10
                    }
                ], total_count: 20
            })
        } else {
            Ajax("/api-topic-query-comment", 'GET', cb, {
                topic_id: topic_id,
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询话题评论失败");
                }
            })
        }
    },

    /**
     * 创建话题接口
     * @param cb
     * @param tag:int类型,标签编号
     * @param question:话题内容
     */
    topic_create: function (cb, tag, question,resultCallback) {
        if (mockTest) {
            cb({"result": 1});
        } else {
            Ajax("/api-topic-create", "POST", cb, {
                tag: tag,
                question: question
            },resultCallback)
        }
    },

    /**
     * 收藏话题接口
     * @param cb
     * @param topic_id:int类型，是话题的id
     */
    topic_favorite: function (cb, topic_id) {
        if (mockTest) {
            cb({"result": 1});
        } else {
            Ajax("/api-topic-favorite", 'GET', cb, {
                topic_id: topic_id
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("收藏话题失败");
                } else if (data.result == 2) {
                    alert("重复收藏");
                } else if (data.result == 3) {
                    alert("话题id错误");
                }
            })
        }
    },

    /**
     * 评论话题接口
     * @param cb
     * @param topic_id:int类型，是话题的id
     * @param content::string类型（不超过150字），评论内容
     */
    topi_comment: function (cb, topic_id, content) {
        if (mockTest) {
            cb({"result": 1});
        } else {
            Ajax("/api-topic-comment", "POST", cb, {
                topic_id: topic_id,
                content: content
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("评论话题失败");
                } else if (data.result == 2) {
                    alert("评论内容超限12~150");
                }
            })
        }
    },
    /**
     * 评论话题点赞接口
     * @param cb
     * @param comment_id:int类型，是评论的id
     */
    topic_comment_like: function (cb, comment_id) {
        if (mockTest) {
            cb({"result": 1});
        } else {
            Ajax("/api-topic-comment-like", "POST", cb, {
                comment_id: comment_id
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("话题点赞失败");
                } else if (data.result == 2) {
                    alert("已经点过赞了");
                }
            })
        }
    },

    /**
     * 查看是否已收藏话题接口
     * @param cb
     * @param topic_id
     */
    topic_favorite_status: function (cb, topic_id) {
        if (mockTest) {
            cb({"result": 2});
        } else {
            Ajax("/api-topic-favorite-status", "GET", cb, {
                topic_id: topic_id
            })
        }
    },

    /**
     * 查看是否已点赞话题评论接口
     * @param cb
     * @param comment_id_array
     */
    comment_bang_status: function (cb, comment_id_array) {
        if (mockTest) {
            cb({"status_array": [{"2": 1, "3": 1, "10": 0, "23": 1}], "result": 1});
        } else {
            Ajax("/api-comment-bang-status", "GET", cb, {
                comment_id_array: comment_id_array
            })
        }
    },
    /** 笔记模块 **/

    /**所有笔记接口
     *
     * @param cb
     * @param sort:int类型，0：最热排序，1:最新排序
     * @param page_index:int类型，页码
     * @param page_size:int类型，分页显示数
     */
    note_all: function (cb, page_index, page_size, sort) {
        if (mockTest) {
            cb && cb({
                "result": 1, "data": [
                    {
                        "note_id": 1,
                        "user_id": 1,
                        "head_url": "1号头像",
                        "content": "sdfsdf",
                        "imga": '/images/other/lesson1banner.png',
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 32,
                        "note_favorite": 2,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 1,
                        "user_id": 1,
                        "head_url": "1号头像",
                        "content": "sdfsdf",
                        "imga": '/images/other/lesson1banner.png',
                        "imgb": '/images/other/lesson1banner.png',
                        "imgc": null,
                        "note_likes": 32,
                        "note_favorite": 2,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 1,
                        "user_id": 1,
                        "head_url": "1号头像",
                        "content": "sdfsdf",
                        "imga": '/images/other/lesson1banner.png',
                        "imgb": '/images/other/lesson1banner.png',
                        "imgc": '/images/other/lesson1banner.png',
                        "note_likes": 32,
                        "note_favorite": 2,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 1,
                        "user_id": 1,
                        "head_url": "1号头像",
                        "content": "sdfsdf",
                        "imga": '/images/other/lesson1banner.png',
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 32,
                        "note_favorite": 2,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 1,
                        "user_id": 1,
                        "head_url": "1号头像",
                        "content": "sdfsdf",
                        "imga": '/images/other/lesson1banner.png',
                        "imgb": '/images/other/lesson1banner.png',
                        "imgc": '/images/other/lesson1banner.png',
                        "note_likes": 32,
                        "note_favorite": 2,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 1,
                        "user_id": 1,
                        "head_url": "1号头像",
                        "content": "sdfsdf",
                        "imga": '/images/other/lesson1banner.png',
                        "imgb": '/images/other/lesson1banner.png',
                        "imgc": null,
                        "note_likes": 32,
                        "note_favorite": 2,
                        "created_at": "1990/04/01"
                    }
                ], "total_count": 50
            })
        } else {
            Ajax("/api-note-all", "GET", cb, {
                sort: sort,
                page_index: page_index,
                page_size: page_size
            })
        }

    },
    /**
     * 查看笔记接口
     * @param cb
     * @param sort:int类型，0：最热排序，1:最新排序
     * @param page_index:int类型，页码
     * @param page_size:int类型，分页显示数
     */
    note_view: function (cb, note_id) {
        if (mockTest) {
            cb && cb({
                "result": 1,
                "data": [{
                    "note_id": 1,
                    "content": "ddddddddddddd1 test1",
                    "imga": 'images/other/kv1.jpg',
                    "imgb": 'images/other/kv2.jpg',
                    "imgc": 'images/other/kv3.jpg',
                    "note_likes": 1,
                    "created_at": "0000-00-00 00:00:00",
                    "wine_name": "杰卡斯西拉干红葡萄酒 test1",
                    "grape_varieties": "西拉 test1",
                    "country": "澳大利亚 test1",
                    "place_of_origin": "东南奥 test1",
                    "price": "RMB 324 test1",
                    "years": "2015 test1",
                    "score": 3,
                    "color": "1",
                    "aroma_characteristics": "10-20-30",
                    "flavor_characteristics": "20-21-31",
                    "acid": 2,
                    "tannic": 2,
                    "texture": 3,
                    "wine_body": 1,
                    "sweetness": 2,
                    "aftertaste": 2,
                    "head_url": "1号头像",
                    "note_favorite": 2
                }]
            })
        } else {
            Ajax("/api-note-view", "GET", cb, {
                note_id: note_id
            });
        }

    },

    /**
     * 创建笔记接口
     * @param cb
     * @param content：笔记内容
     * @param imga：base64,图片A的url
     * @param imgb：base64,图片B的url
     * @param imgc：base64,图片C的url
     * @param wine_name：酒名
     * @param grape_varieties：葡萄品种
     * @param country：国家
     * @param place_of_origin：产区
     * @param price：价格
     * @param years：年份
     * @param score：评分（1-5），默认为1分
     * @param color：int类型，外观
     * @param aroma_characteristics：香气特征，例如：10-20-30表示：柠檬-菠萝-麝香葡萄
     * @param flavor_characteristics：风味特征，例如：20-21-31表示：菠萝-香蕉-苹果
     * @param acid：int类型，范围是（1-3）
     * @param tannic：int类型，范围是（1-3）
     * @param texture：int类型，范围是（1-3）
     * @param wine_body：int类型，范围是（1-3）
     * @param sweetness：int类型，范围是（1-4）
     * @param aftertaste：int类型，范围是（1-3）
     */
    note_create: function (cb, content, imga, imgb, imgc, wine_name, grape_varieties, country, place_of_origin, price, years, score, color, aroma_characteristics, flavor_characteristics, acid, tannic, texture, wine_body, sweetness, aftertaste,resultCallback) {
        if (mockTest) {
            cb && cb({"reuslt": 1})
        } else {
            Ajax("/api-note-create", "POST", cb, {
                content: content,
                imga: imga,
                imgb: imgb,
                imgc: imgc,
                wine_name: wine_name,
                grape_varieties: grape_varieties,
                country: country,
                place_of_origin: place_of_origin,
                price: price,
                years: years,
                score: score,
                color: color,
                aroma_characteristics: aroma_characteristics,
                flavor_characteristics: flavor_characteristics,
                acid: acid,
                tannic: tannic,
                texture: texture,
                wine_body: wine_body,
                sweetness: sweetness,
                aftertaste: aftertaste
            },resultCallback)
        }
    },
    /**
     * 收藏笔记接口
     * @param cb
     * @param note_id:int类型，是笔记的id
     */
    note_favorite: function (cb, note_id) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-note-favorite", "POST", cb, {
                note_id: note_id
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("收藏笔记错误");
                } else if (data.result == 2) {
                    alert("重复收藏");
                }
            })
        }
    },

    /**
     * 查看笔记的收藏点赞状态
     * @param cb
     * @param note_id
     */
    note_status: function (cb, note_id) {
        if (mockTest) {
            cb && cb({"note_like_status": 1, "note_favorite_status": 1})
        } else {
            Ajax("/api-note-status", "GET", cb, {
                note_id: note_id
            })
        }
    },
    /**
     * 点赞笔记接口
     * @param cb
     * @param note_id:int类型，是笔记的id
     */
    note_like: function (cb, note_id) {
        if (mockTest) {
            cb && cb({"result": 1})
        } else {
            Ajax("/api-note-like", "POST", cb, {
                note_id: note_id
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("点赞笔记失败");
                } else if (data.result == 2) {
                    alert("重复点赞");
                } else if (data.result == 3) {
                    alert("笔记id错误");
                }
            })
        }
    },

    /** 用户登陆模块 **/
    /**
     * 用户登陆接口
     * @param cb
     * @param mobile：手机号，正则匹配（^1[34578]\d{9}$）
     * @param captcha：验证码，4位数字
     */
    mb_login: function (cb, mobile, captcha) {
        Ajax("/api-mb-login", "POST", cb, {
            mobile: mobile,
            captcha: captcha
        }, function (data) {
            if (data.result == 1) {
                cb && cb(data);
            } else if (data.result == 0) {
                alert("登录失败");
            } else if (data.result == 2) {
                alert("验证码错误");
            } else if (data.result == -1) {
                alert("参数不合法");
            }
        })
    },
    /**
     * 发送验证码
     * @param cb
     * @param mobile
     */
    captcha: function (cb, mobile) {
        Ajax("/api-captcha", "POST", cb, {
            mobile: mobile
        })
    },

    /**
     * 微信登陆接口
     * @param cb
     * @param openid：微信openid
     * @param nick_name：微信昵称
     * @param head_url：微信头像
     */
    wechat_login: function (cb, openid, nick_name, head_url) {
        Ajax("/api-wechat-login", "POST", cb, {
            openid: openid,
            nick_name: nick_name,
            head_url: head_url
        })
    },

    logout: function (cb) {
        Ajax("/api-logout", "POST", cb)
    },

    /** 课程模块 **/

    /**
     * 评论课程接口
     * @param cb
     * @param lesson_id：课程的id
     * @param comment：课程的评论内容
     */
    lesson_comment: function (cb, lesson_id, comment) {
        Ajax("/api-lesson-comment", "POST", cb, {
            lesson_id: lesson_id,
            comment: comment
        }, function (data) {
            cb && cb(data);
        })
    },
    /**
     * 分享课程加分接口[弃用]
     * @param cb
     * @param lesson_id:课程的id
     */
    lesson_share: function (cb, lesson_id) {
        Ajax("/api-lesson-share", "POST", cb, {
            lesson_id: lesson_id
        }, function (data) {
            if (data.result == 1) {
                cb && cb(data);
            } else if (data.result == 0) {
                alert("课程分享失败");
            } else if (data.result == 2) {
                alert("课程不存在");
            }
        })
    },

    /**
     * 提交看视频加分接口
     * @param cb
     * @param lesson_id：课程的id
     */
    video_point: function (cb, lesson_id) {
        Ajax("/api-video-point", "POST", cb, {
            lesson_id: lesson_id
        }, function (data) {
            if (data.result == 1) {
                cb && cb(data);
            } else if (data.result == 0) {
                alert("评论课程查询失败");
            } else if (data.result == 2) {
                alert("课程不存在");
            }
        })
    },
    /**
     * 完成课程加分接口
     * @param cb
     * @param lesson_id：课程的id
     */
    lesson_point: function (cb, lesson_id) {
        Ajax("/api-lesson-point", "POST", cb, {
            lesson_id: lesson_id
        }, function (data) {
            if (data.result == 1) {
                cb && cb(data);
            } else if (data.result == 0) {
                alert("课程加分失败")
            } else if (data.result == 2) {
                alert("课程不存在");
            }
        })
    },

    /**
     * 个人模块
     */

    /**
     * 绑定手机号接口
     * @param cb
     * @param mobile
     * @param captcha
     */
    binding_mobile: function (cb, mobile, captcha) {
        if (mockTest) {
            cb({"result": 1});
        } else {
            Ajax("/api-binding-mobile", "POST", cb, {
                mobile: mobile,
                captcha: captcha
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("手机号绑定失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                } else if (data.result == 2) {
                    alert("验证码错误")
                } else if (data.result == 3) {
                    alert("您已绑定过手机号")
                } else if (data == 4) {
                    alert("该手机号被别的用户绑定了")
                } else if (data.result == 5) {
                    popBind(true);
                }
            })
        }
    },

    /**
     * 绑定高积分账号接口（mobile）
     * @param merge_type
     */
    binding_mobile_merge: function (cb, merge_type) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-binding-mobile-merge", "POST", cb, {
                merge_type: merge_type
            })
        }
    },
    /**
     * 绑定微信接口
     * @param cb
     * @param openid
     * @param nick_name
     * @param head_url
     */
    binding_wechat: function (cb, openid, nick_name, head_url) {
        if (mockTest) {
            cb({"result": 1});
        } else {
            Ajax("/api-binding-wechat", "POST", cb, {
                openid: openid,
                nick_name: nick_name,
                head_url: head_url
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("微信绑定失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                } else if (data.result == 2) {
                    alert("验证码错误")
                } else if (data.result == 3) {
                    alert("您已绑定过微信号")
                } else if (data == 4) {
                    alert("该该微信号被别的用户绑定了")
                } else if (data.result == 5) {
                    popBind();
                }
            })
        }
    },

    /**
     * 绑定高积分账号接口（wechat）
     * @param merge_type
     */
    binding_wechat_merge: function (cb, merge_type) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-binding-wechat-merge", "POST", cb, {
                merge_type: merge_type
            })
        }
    },

    /**
     * 获取个人中心信息接口
     * @param cb
     */
    profile_basic: function (cb) {
        if (mockTest) {
            cb && cb({
                "result": 1,
                "nick_name": "mock测试",
                "topic_status": 1,
                "note_status": 0,
                "points": 1110,
                "level": 2
            })
        } else {
            Ajax("/api-profile-basic", "GET", cb, null, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("获取个人信息失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                }

            })
        }
    },

    /**
     * 获取个人基本信息接口
     * @param cb
     */
    profile_detail: function (cb) {
        if (mockTest) {
            cb && cb({
                "result": 1,
                "data": {
                    "nick_name": "mock测试",
                    "binding_mobile_status": 0,
                    "binding_wechat_status": 0,
                    "mobile": "123123213",
                    "area": "上海",
                    "gender": 1,
                    "birthday": "1980-10-10",
                    "interest": "14009,14012,14013",
                    "profession": "13005"
                }
            })
        } else {
            Ajax("/api-profile-detail", "GET", cb, null, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("获取个人基本信息失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                }
            })
        }
    },

    /**
     * 更新个人基本信息接口
     * @param cb
     * @param nick_name
     * @param area
     * @param interest
     * @param profession
     * @param gender
     * @param birthday
     */
    profile_update: function (cb, nick_name, area, interest, profession, gender, birthday) {
        if (mockTest) {
            cb && cb({"result": 1})
        } else {
            Ajax("/api-profile-update", "POST", cb, {
                nick_name: nick_name,
                area: area,
                interest: interest,
                profession: profession,
                gender: gender,
                birthday: birthday
            }, function (data) {
                cb && cb(data);
            })
        }
    },

    /**
     * 更换头像接口
     * @param cb
     * @param head_url
     */
    profile_head: function (cb, head_url) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-profile-head", "POST", cb, {
                head_url: head_url
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("更换头像失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                }
            })
        }
    },

    /**
     * 用户访问我的话题接口
     * @param cb
     */
    profile_topic_access: function (cb) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-profile-topic-access", "POST", cb)
        }
    },

    /**
     * 用户访问我的品酒笔记接口
     * @param cb
     */
    profile_note_access: function (cb) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-profile-note-access", "POST", cb)
        }
    },

    /**
     * 用户分享接口
     * @param cb
     */
    share: function (cb) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-share", "POST", cb, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("分享失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                }
            })
        }
    },
    /**
     * 获取我的积分基本信息接口
     * @param cb
     */
    profile_point_basic: function (cb) {
        if (mockTest) {
            cb && cb({"result": 1, "points": 1110, "level": 2})
        } else {
            Ajax("/api-profile-point-basic", "GET", cb, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("获取用户积分信息失败");
                } else if (data.result == -1) {
                    alert("参数不合法");
                }
            })
        }
    },
    /**
     * 获取我的积分明细接口
     * @param cb
     * @param page_index
     * @param page_size
     */
    profile_point_detail: function (cb, page_index, page_size) {
        if (mockTest) {
            cb && cb({
                "result": 1, "data": [
                    {"content": "完成LESSON1", "created_at": 2014 / 10 / 21, "point": "+50"},
                    {"content": "完成LESSON2", "created_at": 2014 / 10 / 21, "point": "+50"},
                    {"content": "完成LESSON3", "created_at": 2014 / 10 / 21, "point": "+50"},
                    {"content": "完成LESSON4", "created_at": 2014 / 10 / 21, "point": "+50"},
                    {"content": "完成LESSON5", "created_at": 2014 / 10 / 21, "point": "+50"},
                ], "total_count": 40
            })
        } else {
            Ajax("/api-profile-point-detail", "GET", cb, {
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    cb && cb(data);
                } else if (data.result == -1) {
                    alert("参数不合法");
                } else if (data.result == 3) {
                    alert("超出分页数");
                }
            })
        }
    },
    /**
     * 查询我的话题接口
     * @param cb
     * @param page_index
     * @param page_size
     */
    profile_topic: function (cb, page_index, page_size) {
        if (mockTest) {
            cb && cb({
                "result": 1, "data": [
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "question1",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "question2",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "question3",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "question4",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "question5",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    }
                ], "total_count": 50
            })
        } else {
            Ajax("/api-profile-topic", "GET", cb, {
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询我的话题失败")
                } else if (data.result == -1) {
                    alert("参数错误");
                } else if (data.result == 3) {
                    cb && cb(data);
                }
            })
        }
    },
    /**
     * 查询我收藏的话题接口
     * @param cb
     * @param page_index
     * @param page_size
     */
    profile_topic_favorite: function (cb, page_index, page_size) {
        if (mockTest) {
            cb && cb({
                "result": 1, "data": [
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "fav_topic1",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "fav_topic2",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "fav_topic3",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "fav_topic4",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    },
                    {
                        "topic_id": 12,
                        "tag": 1,
                        "question": "fav_topic5",
                        "favorite": 0,
                        "created_at": "2016-07-15 14:34:49",
                        "comment_count": 0,
                        "comment_bang": null,
                        "comment_user_id": null,
                        "content": null,
                        "head_url": null,
                        "kol": null
                    }
                ], "total_count": 50
            })
        } else {
            Ajax("/api-profile-topic-favorite", "GET", cb, {
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询我收藏的话题失败")
                } else if (data.result == 2) {
                    alert("参数错误");
                } else if (data.result == 3) {
                    cb && cb(data);
                }
            })
        }
    },
    /**
     * 删除我收藏的话题接口
     * @param cb
     * @param topic_favorite_id
     */
    profile_topic_delete: function (cb, topic_favorite_id) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-profile-topic-delete", "POST", cb, {
                topic_favorite_id: topic_favorite_id
            })
        }
    },
    /**
     * 查询我的笔记接口
     * @param cb
     * @param page_index
     * @param page_size
     */
    profile_note: function (cb, page_index, page_size) {
        if (mockTest) {
            cb && cb({
                "result": 1, "data": [
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "笔记内容1",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": "uploads\/notes\/3_1468555111a.jpg",
                        "imgc": "uploads\/notes\/3_1468555111a.jpg",
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "笔记内容2",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": "uploads\/notes\/3_1468555111a.jpg",
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "笔记内容3",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "笔记内容4",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "笔记内容5",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                ], "total_count": 50
            })
        } else {
            Ajax("/api-profile-note", "GET", cb, {
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询我的笔记失败")
                } else if (data.result == 2) {
                    alert("参数错误");
                } else if (data.result == 3) {
                    cb && cb(data);
                }
            })
        }
    },
    /**
     * 查询我收藏的笔记接口
     * @param cb
     * @param page_index
     * @param page_size
     */
    profile_note_favorite: function (cb, page_index, page_size) {
        if (mockTest) {
            cb && cb({
                "result": 1, "data": [
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "收藏笔记内容1",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": "uploads\/notes\/3_1468555111a.jpg",
                        "imgc": "uploads\/notes\/3_1468555111a.jpg",
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "收藏笔记内容2",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": "uploads\/notes\/3_1468555111a.jpg",
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "收藏笔记内容3",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "收藏笔记内容4",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                    {
                        "note_id": 4,
                        "user_id": 3,
                        "head_url": "",
                        "content": "收藏笔记内容5",
                        "imga": "uploads\/notes\/3_1468555111a.jpg",
                        "imgb": null,
                        "imgc": null,
                        "note_likes": 0,
                        "note_favorite": 0,
                        "created_at": "1990/04/01"
                    },
                ], "total_count": 50
            })
        } else {
            Ajax("/api-profile-note-favorite", "GET", cb, {
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询我收藏的笔记失败")
                } else if (data.result == 2) {
                    alert("参数错误");
                } else if (data.result == 3) {
                    cb && cb(data);
                }
            })
        }
    },

    /**
     * 删除我收藏的笔记接口
     * @param cb
     * @param note_favorite_id
     */
    profile_note_delete: function (cb, note_favorite_id) {
        if (mockTest) {
            cb && cb({"result": 1});
        } else {
            Ajax("/api-profile-note-delete", "POST", cb, {
                note_favorite_id: note_favorite_id
            })
        }
    },


    /* 课程模块 */

    /**
     * 评论课程接口
     * @param cb
     * @param lesson_id
     * @param comment
     */
    lesson_comment: function (cb, lesson_id, comment) {
        if (mockTest) {
            cb && cb({"result": 1})
        } else {
            Ajax("/api-lesson-comment", "POST", cb, {
                lesson_id: lesson_id,
                comment: comment
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("评论课程失败")
                } else if (data.result == 2) {
                    alert("课程不存在");
                } else if (data.result == -1) {
                    alert("字数超限")
                }
            })
        }
    },
    /**
     * 查询课程评论接口（带分页）
     * @param cb
     * @param lesson_id
     * @param page_index
     * @param page_size
     */
    lesson_query_comment: function (cb, page_size, page_index, lesson_id) {
        if (mockTest) {
            cb && cb({
                "result": 1, "share_count": 10, "data": [
                    {
                        "comment": "话题1",
                        "created_at": "0000-00-00 00:00:00",
                        "nick_name": 2,
                        "head_url": "uploads/heads/1.jpg"
                    },
                    {
                        "comment": "话题2",
                        "created_at": "0000-00-00 00:00:00",
                        "nick_name": 2,
                        "head_url": "uploads/heads/1.jpg"
                    },
                    {
                        "comment": "话题3",
                        "created_at": "0000-00-00 00:00:00",
                        "nick_name": 2,
                        "head_url": "uploads/heads/1.jpg"
                    },
                    {
                        "comment": "话题4",
                        "created_at": "0000-00-00 00:00:00",
                        "nick_name": 2,
                        "head_url": "uploads/heads/1.jpg"
                    },
                    {
                        "comment": "话题5",
                        "created_at": "0000-00-00 00:00:00",
                        "nick_name": 2,
                        "head_url": "uploads/heads/1.jpg"
                    },
                ], "total_count": 20
            })
        } else {
            Ajax("/api-lesson-query-comment", "GET", cb, {
                lesson_id: lesson_id,
                page_index: page_index,
                page_size: page_size
            }, function (data) {
                if (data.result == 1) {
                    cb && cb(data);
                } else if (data.result == 0) {
                    alert("查询课程评论失败")
                } else if (data.result == 2) {
                    alert("课程不存在");
                } else if (data.result == 3) {
                    alert("超出分页数")
                }
            })
        }
    },
    status_basic: function (cb) {
        if (mockTest) {
            cb && cb({"result": 1, "status": 1})
        } else {
            Ajax("/api-status-basic", "GET", cb)
        }
    },

    // mobile_login: function (mobile, code, cb) {
    //    var data = {
    //        'action': 'loginbymobile',
    //        'mobile': mobile,
    //        'code': code
    //    }
    //    if (Cookie.getCookie("digiwine-utm_source")) {
    //        data.source = (Cookie.getCookie("digiwine-utm_source") + "_" + Cookie.getCookie("digiwine-utm_medium"));
    //    }
    //    $.ajax({
    //        'url': VHost + 'api/index.php',
    //        'type': 'POST',
    //        'dataType': 'json',
    //        'data': data,
    //        'success': function (data) {
    //            cb && cb.success && cb.success(data);
    //        }
    //    });
    //},
    //mobile_register: function (mobile, code, cb) {
    //    var data = {
    //        'action': 'registbymobile',
    //        'mobile': mobile,
    //        'code': code
    //    };
    //    if (Cookie.getCookie("digiwine-utm_source")) {
    //        data.source = (Cookie.getCookie("digiwine-utm_source") + "_" + Cookie.getCookie("digiwine-utm_medium"));
    //    }
    //    $.ajax({
    //        'url': VHost + 'api/index.php',
    //        'type': 'POST',
    //        'dataType': 'json',
    //        'data': data,
    //        'success': function (data) {
    //            cb && cb.success && cb.success(data);
    //        }
    //    });
    //},
    //wechat_login: function (openid, cb) {
    //    var data = {
    //        'action': 'loginbywc',
    //        'openid': openid
    //    }
    //    if (Cookie.getCookie("digiwine-utm_source")) {
    //        data.source = (Cookie.getCookie("digiwine-utm_source") + "_" + Cookie.getCookie("digiwine-utm_medium"));
    //    }
    //    $.ajax({
    //        'url': VHost + 'api/index.php',
    //        'type': 'POST',
    //        'dataType': 'json',
    //        'data': data,
    //        'success': function (data) {
    //            cb && cb.success && cb.success(data);
    //        }
    //    });
    //},
    //wechat_register: function (name, avatarurl, mobile, openid, code, cb) {
    //wechat_register: function (name, avatarurl, openid, cb) {
    //
    //    var data = {
    //        'action': 'registbywc',
    //        'name': name,
    //        'avatarurl': avatarurl,
    //        'openid': openid,
    //    };
    //    if (Cookie.getCookie("digiwine-utm_source")) {
    //        data.source = (Cookie.getCookie("digiwine-utm_source") + "_" + Cookie.getCookie("digiwine-utm_medium"));
    //    }
    //
    //    $.ajax({
    //        'url': VHost + 'api/index.php',
    //        'type': 'POST',
    //        'dataType': 'json',
    //        'data': data,
    //        'success': function (data) {
    //            cb && cb.success && cb.success(data);
    //        }
    //    });
    //},
    update_name: function (id, name, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'updateusername',
                'name': name,
                'id': id
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    update_avatar: function (data, id, cb) {
        //var data = $('#canvas1')[0].toDataURL();
        data = data.split(',')[1];
        data = window.atob(data);
        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        }
        //var blob = new Blob([ia], {type: "image/png"});
        var blob;
        try {
            blob = new Blob([ia], {type: "image/jpeg"});
        }
        catch (e) {
            // TypeError old chrome and FF
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (e.name == 'TypeError' && window.BlobBuilder) {
                var bb = new BlobBuilder();
                bb.append(data);
                blob = bb.getBlob("image/jpeg");
            }
            else if (e.name == "InvalidStateError") {
                // InvalidStateError (tested on FF13 WinXP)
                blob = new Blob([ia.buffer], {type: "image/jpeg"});
            }
            else {
                //alert("We're screwed, blob constructor unsupported entirely");
            }
        }

        var fd = new FormData();
        fd.append('action', 'updateuseravatar');
        fd.append('file', blob);
        fd.append('id', id);

        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'enctype': 'multipart/form-data',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
            'data': fd,
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    update_password: function (old_pwd, new_pwd, id, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'updateuserpassword',
                'oldpassword': old_pwd,
                'newpassword': new_pwd,
                'id': id
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    get_code: function (mobile, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'getvalicode',
                'mobile': mobile
            },
            'success': function (data) {
                cb.success && cb.success();
            }
        });
    },
    update_mobile: function (mobile, code, id, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'updateusermobile',
                'mobile': mobile,
                'code': code,
                'id': id
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        })
    },
    /**
     * 已废弃
     win_medal: function (lid, uid, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'winmedal',
                'lid': lid,
                'id': uid
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
     */
    get_user: function (id, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'getuserinfo',
                'id': id
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    add_viewNum: function (lid, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'addview',
                'lid': lid
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    get_lessonInfo: function (lid, cb) {
        var data = {};
        data.action = 'getlessoninfos';
        lid && (data.lid = lid);
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': data,
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    get_comment: function (lid, page, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'getcomments',
                'lid': lid,
                'page': page || 0 //every page list 5 comments, start from 0
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    add_score: function (type, uid, lid, cb) {
        /*
         add score type 1='lesson', 2='video',3='comment', 4='share', and lesson/video need lid
         */
        var data = {}
        data.action = 'addscore';
        data.type = type;
        data.uid = uid;
        lid && (data.lid = lid)
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': data,
            'success': function (data) {
                cb && cb.success && cb.success();
            }
        });
    },
    get_ranking: function (type, page, cb) {
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': {
                'action': 'getuserranking',
                'page': page, //every page list 10 users, start from 0
                'type': type // 1 = all ranking, 2 = ranking by week
            },
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    },
    bind_weChat: function (uid, name, avatarurl, openid, cb) {
        var data = {
            'action': 'bindwc',
            'uid': uid,
            'name': name,
            'avatarurl': avatarurl,
            'openid': openid
        }
        $.ajax({
            'url': VHost + 'api/index.php',
            'type': 'POST',
            'dataType': 'json',
            'data': data,
            'success': function (data) {
                cb && cb.success && cb.success(data);
            }
        });
    }
}



