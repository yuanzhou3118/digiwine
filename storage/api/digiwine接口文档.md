# digiwine接口文档 

----------

## 首页模块

> 
**热门话题接口**

----------

- **url：**

    `/api-topic-home`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"topic_id":12,"tag":1,"question":"afafafa","favorite":0,"created_at":"2016-07-15 14:34:49","comment_count":0,"comment_bang":null,"comment_user_id":null,"content":null,"head_url":null,"kol":null}],"total_count":7}`

    
- **返回值说明：**

	`result：1（成功）；0（失败）；2(参数错误)；3（没有数据）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

	`user_id：该用户的id`

    `head_url：用户头像`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

    `note_favorite：笔记收藏数`
	
	`total_count：总条数`

----------


**热门笔记接口**

----------

- **url：**

    `/api-note-home

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"note_id":1,"user_id":1,"head_url":"1号头像","content":"sdfsdf","imga":null,"imgb":null,"imgc":null,"note_likes":32,"note_favorite":2}],"total_count":1}`
    
- **返回值说明：**

    `result：1（成功）；0（失败）;2(参数错误)；3（没有数据）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

	`user_id：用户的id`

    `head_url：用户头像`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

    `note_favorite：笔记收藏数`
	
	`total_count：总条数`

----------

## 话题模块

> 
**查询所有话题接口**

----------

- **url：**

    `/api-topic-all`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index:int类型，页码，默认从1开始`

	`page_size:int类型，分页显示数`

	`tag:int类型,标签，热门（999）其它标签分别为1，2，3，4..`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"topic_id":12,"tag":1,"question":"afafafa","favorite":0,"created_at":"2016-07-15 14:34:49","comment_count":0,"comment_bang":null,"comment_user_id":null,"content":null,"head_url":null,"kol":null}],"total_count":7}`

    
- **返回值说明：**

	`result：1（成功）；0（失败）；2(参数错误)；3（没有数据）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

	`user_id：该用户的id`

    `head_url：用户头像`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

    `note_favorite：笔记收藏数`
	
	`total_count：总条数`

----------
> 
**查询话题接口**

----------

- **url：**

    `/api-topic-view`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`topic_id:int类型，是话题的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"topic":[{"question":"话题一","tag":1,"favorite":2,"created_at":"0000-00-00 00:00:00","comment_count":4}]}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）`

    `topic：话题数组3条数据`

    `question：话题的内容`

    `favorite：收藏数`

    `created_at：话题创建时间`

    `comment_count：评论数量`


----------

> 
**查询话题评论接口（带分页）**

----------

- **url：**

    `/api-topic-query-comment`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `topic_id:int类型，是话题的id`

	`page_index:int类型，页码，默认从1开始`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"commentData":[{"comment_id":3,"user_id":1,"content":"话题一评论二","comment_bang":20,"head_url":"1号头像","nick_name":"评论话题一","kol":10}]}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）`

    `commentData：话题数组3条数据`

    `comment_id：评论的id`

    `user_id：评论者头像url`

    `content:评论内容`

    `comment_bang:评论的点赞数`

    `head_url:用户的头像`

    `nick_name:用户的名字`

    `kol:用户是否是专家`

----------

>
**创建话题接口**

----------

- **url：**

    `/api-topic-create`

- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`tag:int类型,标签编号`

    `question:话题内容`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`


- **返回值说明：**

    `result：1（成功）；0（失败）；2（话题内容字数超限15~150）`

----------

>
**收藏话题接口**

----------

- **url：**

    `/api-topic-favorite`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `topic_id:int类型，是话题的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`


- **返回值说明：**

    `result：1（成功）；0（失败）；2（重复收藏）；3（话题id错误）`

----------

>
**评论话题接口**

----------

- **url：**

    `/api-topic-comment`

- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `topic_id:int类型，是话题的id`

	`content:string类型（不超过150字），评论内容`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`


- **返回值说明：**

    `result：1（成功）；0（失败）；2（评论内容超限15~150）`

----------

>
**评论话题点赞接口**

----------

- **url：**

    `/api-topic-comment-like`

- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `comment_id:int类型，是评论的id`

    `topic_id:int类型，是评论话题的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`


- **返回值说明：**

    `result：1（成功）；0（失败）；2（已经点过赞了）`

----------

>
**查看是否已收藏话题接口**

----------

- **url：**

    `/api-topic-favorite-status`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `topic_id:int类型，是评论话题的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"status":1,"result":1}`


- **返回值说明：**

    `status：1（已收藏）；0（未收藏）；`

	`result：1（成功）；0（失败）；`


----------

>
**查看是否已点赞话题评论接口**

----------

- **url：**

    `/api-comment-bang-status`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `comment_id_array:评论id的列表，例如：2-3-10-23`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"status_array":[{"2":1,"3":1,"10":0,"23":1}],"result":1}`


- **返回值说明：**

    `status_array：数组中2，3，10，23分别代表评论id，后边跟的数字1（已点赞）0（未点赞）；`

	`result：1（成功）；0（失败）；`

----------

## 笔记模块

>  
**所有笔记接口**

----------

- **url：**

    `/api-note-all`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `sort:int类型，0：最热排序，1:最新排序`

	`page_index:int类型，页码`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"note_id":1,"user_id":1,"head_url":"1号头像","content":"sdfsdf","imga":null,"imgb":null,"imgc":null,"note_likes":32,"note_favorite":2}],"total_count":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）;2(参数错误)；3（没有数据）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

	`user_id：用户的id`

    `head_url：用户头像`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

    `note_favorite：笔记收藏数`
	
	`total_count：总条数`

----------

>  
**查看笔记接口**

----------

- **url：**

    `/api-note-view`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `sort:int类型，0：最热排序，1:最新排序`

	`page_index:int类型，页码`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"note_id":1,"content":"dfsf","imga":null,"imgb":null,"imgc":null,"note_likes":1,"created_at":"0000-00-00 00:00:00","wine_name":"杰卡斯西拉干红葡萄酒","grape_varieties":"西拉","country":"澳大利亚","place_of_origin":"东南奥","price":"RMB 324","years":"2015","score":1,"color":"1","aroma_characteristics":"10-20-30","flavor_characteristics":"20-21-31","acid":1,"tannic":2,"texture":3,"wine_body":1,"sweetness":2,"aftertaste":1,"head_url":"1号头像","note_favorite":2,"nickname":'dfsd'}]}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

	`created_at：创建时间（y-M-d h:m:s）`

	`wine_name：酒名`

	`grape_varieties：葡萄品种`

	`country：国家`

	`place_of_origin：产区`

	`price：价格`

	`years：年份`

	`score：评分（1-5），默认为1分`

	`color：int类型，外观`

	`aroma_characteristics：香气特征，例如：10-20-30表示：柠檬-菠萝-麝香葡萄`

	`flavor_characteristics：风味特征，例如：20-21-31表示：菠萝-香蕉-苹果`

	`acid：int类型，范围是（1-3）`

	`tannic：int类型，范围是（1-3）`

	`texture：int类型，范围是（1-3）`

	`wine_body：int类型，范围是（1-3）`

	`sweetness：int类型，范围是（1-4）`

	`aftertaste：int类型，范围是（1-3）`

 	`head_url：用户头像`
	
    `note_favorite：笔记收藏数`

	`nickname:用户昵称`

----------

>  
**创建笔记接口**

----------

- **url：**

    `/api-note-create`

- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `content：笔记内容`

    `imga：base64,图片A的url`

	`imgb：base64,图片B的url`

	`imgc：base64,图片C的url`

	`wine_name：酒名`

	`grape_varieties：葡萄品种`

	`country：国家`

	`place_of_origin：产区`

	`price：价格`

	`years：年份`

	`score：评分（1-5），默认为1分`

	`color：int类型，外观`

	`aroma_characteristics：香气特征，例如：10-20-30表示：柠檬-菠萝-麝香葡萄`

	`flavor_characteristics：风味特征，例如：20-21-31表示：菠萝-香蕉-苹果`

	`acid：int类型，范围是（1-3）酸度`

	`tannic：int类型，范围是（1-3）单宁`

	`texture：int类型，范围是（1-3）质感`

	`wine_body：int类型，范围是（1-3）酒体`

	`sweetness：int类型，范围是（1-4）甜度`

	`aftertaste：int类型，范围是（1-3）回味`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；2（图片上传失败）；3（数字超出范围）;4(笔记内容字数超限15~150)`


----------

>
**收藏笔记接口**

----------

- **url：**

    `/api-note-favorite`

- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `note_id:int类型，是笔记的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`


- **返回值说明：**

    `result：1（成功）；0（错误）；2（重复收藏）`

----------

>
**点赞笔记接口**

----------

- **url：**

    `/api-note-like`

- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `note_id:int类型，是笔记的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`


- **返回值说明：**

    `result：1（成功）；0（失败）；2（已经点过赞了）`

----------

>
**查看笔记的收藏点赞状态接口**

----------

- **url：**

    `/api-note-status`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

    `note_id:int类型，是笔记的id`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"note_like_status":1,"note_favorite_status":1}`


- **返回值说明：**

    `note_like_status：1（已点赞）；0（未点赞）；`

    `note_favorite_status：1（已收藏）；0（未收藏）；`

----------


## 用户模块

> 
**获取验证码接口**

----------

- **url：**

    `/api-captcha`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `mobile：手机号，正则匹配（^1[34578]\d{9}$）`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）`

----------

> 
**用户登陆接口**

----------

- **url：**

    `/api-mb-login`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `mobile：手机号，正则匹配（^1[34578]\d{9}$）`

    `captcha：验证码，4位数字`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；2（验证码不对）；-1（参数不合法）`

----------

> 
**微信登陆接口**

----------

- **url：**

    `/api-wechat-login`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `openid：微信openid`

    `nick_name：微信昵称`

    `head_url：微信头像`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）`

----------

> 
**退出登录接口**

----------

- **url：**

    `/api-logout`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）`

----------

> 
**用户分享接口**

----------

- **url：**

    `/api-share`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）`

----------

## 个人中心模块

> 
**绑定手机号接口**

----------

- **url：**

    `/api-binding-mobile`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`mobile：手机号，正则匹配（^1[34578]\d{9}$）`

    `captcha：验证码，4位数字`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）；2（验证码不对）；3（用户已经绑定过手机号了）；4（手机号被别的用户绑定了）；5（提示用户是否要绑定高积分账号）`

----------

> 
**绑定高积分账号接口（mobile）**

----------

- **url：**

    `/api-binding-mobile-merge`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`merge_type：是否绑定高积分账号，1：切换；2：不切换`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）`

----------

> 
**绑定微信账号接口**

----------

- **url：**

    `/api-binding-wechat`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`openid：微信openid`

    `nick_name：微信昵称`

    `head_url：微信头像`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；2（验证码不对）；-1（参数不合法）；3（用户已经绑定过微信账号了）；4（微信账号被别的用户绑定了）；5（提示用户是否要绑定高积分账号）`

----------

> 
**绑定高积分账号接口（微信账号）**

----------

- **url：**

    `/api-binding-wechat-merge`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`merge_type：是否绑定高积分账号，1：切换；2：不切换`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）`

----------

> 
**获取个人中心信息接口**

----------

- **url：**

    `/api-profile-basic`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"nick_name":"名字","topic_status"：1,"note_status":1,"points":10,"level":1}`

- **返回值说明：**

    `result：1（成功）`

	`nick_name： 用户昵称`

	`topic_status：我的话题是否有更新，1：有，0：无`

	`note_status: 我的品酒笔记是否有更新，1：有，0：无`

	`points: 我的积分总数`

	`level: 积分等级，1-4`

----------

> 
**获取个人基本信息接口**

----------

- **url：**

    `/api-profile-detail`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":{"nick_name":"名字","binding_mobile_status"：1,"binding_wechat_status":1,"area":"上海","gender":0,"birthday":"1980-10-10","interest":"14005,14006","profession":"13002","mobile":"13636367264"}}`

    
- **返回值说明：**

    `result：1（成功）`

	`data：用户个人信息数据`

	`nick_name：用户昵称`

	`binding_mobile_status：绑定手机状态，1（已绑定），0（未绑定）`

	`binding_wechat_status:绑定微信账号状态，1（已绑定），0（未绑定）`

    `mobile：绑定的手机号，未绑定时为空`

	`area：地区`

	`gender：性别，0（男）；1（女）`

	`birthday：生日，格式（Y-m-d），没有时为空`

	`interest：兴趣，可以多选，中间用逗号(英文)隔开
          14001	阅读/图书馆
          14002	旅行
          14003	电影 
          14004	演唱会
          14005	派对
          14006	摄影
          14007	画画
          14008	唱歌
          14009	逛街
          14010	社交
          14011	博物馆/画廊
          14012	烹饪
          14013	其他
          `

	`profession：职业，为空时提示请选择，
        13001	其他
        13002	总监/总经理
        13003	部门主管/副总经理
        13004	经理/主管
        13005	普通员工 
        `

----------

> 
**更新个人基本信息接口**

----------

- **url：**

    `/api-profile-update`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`nick_name：用户昵称，必选，最大长度100`

	`area：地区，必填，最大长度20`

	`interest：兴趣，必选，可以多选，中间用逗号(英文)隔开
          14001	阅读/图书馆
          14002	旅行
          14003	电影 
          14004	演唱会
          14005	派对
          14006	摄影
          14007	画画
          14008	唱歌
          14009	逛街
          14010	社交
          14011	博物馆/画廊
          14012	烹饪
          14013	其他
          `

	`profession:职业，必选，
        13001	其他
        13002	总监/总经理
        13003	部门主管/副总经理
        13004	经理/主管
        13005	普通员工
        `

	`gender:性别，必选,0（男），1（女）`

	`birthday：生日，必选，格式（Y-m-d），如1980-01-16`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）`

----------

> 
**更换头像接口**

----------

- **url：**

    `/api-profile-head`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`head_url：上传的头像，base64格式`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；-1（参数不合法）`

----------

> 
**用户访问我的话题接口**

----------

- **url：**

    `/api-profile-topic-access`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）`

----------

> 
**用户访问我的品酒笔记接口**

----------

- **url：**

    `/api-profile-note-access`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）`

----------

> 
**获取我的积分基本信息接口**

----------

- **url：**

    `/api-profile-point-basic`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"points":1000,"level":1}`

    
- **返回值说明：**

    `result：1（成功）`

	`points:我的积分总数`

	`level:积分等级，1-4`

----------

> 
**获取我的积分明细接口**

----------

- **url：**

    `/api-profile-point-detail`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index：int类型，页码，默认从1开始`

	`page_size：int类型，每页显示条数，默认`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"content":"完成LESSON3","created_at":2014/10/21,"point":"+50"}],"total_count":7}`

    
- **返回值说明：**

    `result：1（成功）；0（没有数据）；-1（参数不合法）；3（超出分页数）`

    `data：话题数组11条数据`

	`content：获得积分项目内容`

    `created_at：时间`

    `point：获得积分`

	`total_count：信息总条数`

----------

> 
**查询我的话题接口**

----------

- **url：**

    `/api-profile-topic`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index:int类型，页码，默认从1开始`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"topic_id":12,"tag":1,"question":"afafafa","favorite":0,"created_at":"2016-07-15 14:34:49","comment_count":0,"comment_bang":null,"comment_user_id":null,"content":null,"head_url":null,"kol":null}],"total_count":7}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）;2(参数错误)；3（没有数据）`

    `data：话题数组11条数据`

	`topic_id：话题的id`

    `tag：标签`

    `question：话题的内容`

    `favorite：收藏数`

    `created_at：话题创建时间`

	`comment_count：评论总数`

    `comment_bang：评论的点赞数`

    `comment_user_id：评论的用户id`

    `content：评论内容`

    `head_url：用户头像`

    `kol：用户是否是专家`

	`total_count：信息总条数`

----------

> 
**查询我收藏的话题接口**

----------

- **url：**

    `/api-profile-topic-favorite`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index:int类型，页码，默认从1开始`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"topic_id":12,"tag":1,"question":"afafafa","favorite":0,"created_at":"2016-07-15 14:34:49","comment_count":0,"comment_bang":null,"comment_user_id":null,"content":null,"head_url":null,"kol":null}],"total_count":7}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）;2(参数错误)；3（没有数据）`

    `data：话题数组11条数据`

	`topic_id：话题的id`

	`topic_favorite_id：收藏该话题的id`

    `tag：标签`

    `question：话题的内容`

    `favorite：收藏数`

    `created_at：话题创建时间`

	`comment_count：评论总数`

    `comment_bang：评论的点赞数`

    `comment_user_id：评论的用户id`

    `content：评论内容`

    `head_url：用户头像`

    `kol：用户是否是专家`

	`total_count：信息总条数`

----------

> 
**删除我收藏的话题接口**

----------

- **url：**

    `/api-profile-topic-delete`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	`topic_favorite_id：（要删除的收藏话题的id）`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）`

----------

> 
**查询我的笔记接口**

----------

- **url：**

    `/api-profile-note`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index:int类型，页码`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"note_id":4,"user_id":3,"head_url":"","content":"笔记内容","imga":"uploads\/notes\/3_1468555111a.jpg","imgb":null,"imgc":null,"note_likes":0,"note_favorite":0}],"total_count":4}`

    
- **返回值说明：**

	`result：1（成功）；0（失败）;2(参数错误)；3（没有数据）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

	`user_id：该用户的id`

    `head_url：用户头像`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

    `note_favorite：笔记收藏数`
	
	`total_count：总条数`

----------

> 
**查询我收藏的笔记接口**

----------

- **url：**

    `/api-profile-note-favorite`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index:int类型，页码`

	`page_size:int类型，分页显示数`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"note_id":4,"user_id":3,"head_url":"","content":"笔记内容","imga":"uploads\/notes\/3_1468555111a.jpg","imgb":null,"imgc":null,"note_likes":0,"note_favorite":0}],"total_count":4}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）;2(参数错误)；3（没有数据）`

    `data：笔记数组9条数据`

    `note_id：笔记的id`

	`user_id：该用户的id`

    `head_url：用户头像`

    `content：笔记内容`

    `imga：图片A的url`

	`imgb：图片B的url`

	`imgc：图片C的url`

    `note_likes：笔记点赞数`

    `note_favorite：笔记收藏数`
	
	`total_count：总条数`

----------

> 
**删除我收藏的笔记接口**

----------

- **url：**

    `/api-profile-note-delete`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

	``note_favorite_id：（要删除的收藏笔记的id）``

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）`

----------

> 
**查询当前用户的话题和笔记的状态**

----------

- **url：**

    `/api-status-basic`


- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`无`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"status":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）`

	`status: 1 (话题和笔记状态有更新)；0（无更新）`

----------

## 课程模块

> 
**查询课程评论接口**

----------

- **url：**

    `/api-lesson-query-comment`

- **请求方式：**

    `http + ajax + GET`

- **请求参数：**

	`page_index:数字，页码，从1开始`

	`page_size:数字，每页显示的条数，默认为5`

    `lesson_id：数字，课程的id，1-10`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1,"data":[{"comment":"话题一","created_at":"05-01 12:14","nick_name":2,"head_url":"/uploads/heads/1.jpg"}],"total_count":20}`

    
- **返回值说明：**

    `result：1（成功，有评论数据）；0（没有评论数据）；2（课程不存在）；3(超出分页数)`

    `total_count：评论总条数`

	`data:评论数据格式的数组，数据结构为下面四个属性：`

    `comment：评论内容`

    `created_at：创建时间，格式为05-01 12:14`

    `nick_name:用户的昵称`

    `head_url:用户的头像url`

----------

> 
**添加评论课程接口**

----------

- **url：**

    `/api-lesson-comment`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `lesson_id：数字，课程的id，1-10`

    `comment：课程的评论内容，必填，最大长度250`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；2（课程不存在）；-1（参数不合法）`

----------

> 
**分享课程加分接口（弃用）**

----------

- **url：**

    `/api-lesson-share`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `lesson_id：课程的id`


- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；0（失败）；2（课程不存在）`

----------

> 
**添加看课程视频接口**

----------

- **url：**

    `/api-video-point`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `lesson_id：数字，课程的id，1-10`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；2（课程不存在）`

----------

> 
**添加回答课程问题接口**

----------

- **url：**

    `/api-lesson-point`


- **请求方式：**

    `http + ajax + POST`

- **请求参数：**

    `lesson_id：数字，课程的id，1-10`

- **响应类型：**

    `application/json;charset=utf-8`

- **返回值:**

    `{"result":1}`

    
- **返回值说明：**

    `result：1（成功）；2（课程不存在）`

----------