/**
 * Created by Cloud on 2015/11/29.
 */
var gaTrackingData = {
    1: ['Login_head'],
    2: ['KV-1'],
    3: ['KV-2'],
    4: ['KV-3'],
    5: ['All lessons'],
    6: ['Back-Top'],
    7: ['Login_footer'],
    8: ['Micro Store'],

    9: ['Menu', 'Menu'],
    10: ['Menu', 'Homepage'],
    11: ['Menu', 'lessons'],
    12: ['Menu', 'Integral rules'],
    13: ['Menu', 'Official Wechat'],
    14: ['Menu', 'Micro Store'],
    15: ['Sharing', 'Weibo'],
    16: ['Sharing', 'Wechat'],

    17: ['Register_head'],
    18: ['Wechat_login'],
    19: ['Mobile_login'],

    20: ['Wechat_register'],
    21: ['SMS_code'],
    22: ['Mobile_register'],

    23: ['Account', 'Mechanism info'],
    24: ['Account', 'Personal info'],
    25: ['Account', 'Exit'],

    26: ['Account', 'Back up'],
    27: ['Account', 'Update head portrait'],
    28: ['Account', 'Update name'],

    29: ['Total Rank'],
    30: ['Weekly Rank'],
    31: ['Explore More'],
    32: ['Wechat Follow'],

    41: ['SwitchAccount', 'YES'],
    42: ['SwitchAccount', 'NO'],
    43: ['BindMobile', 'GetSMSCode'],
    44: ['BindMobile', 'PNRegiste'],
    45: ['ModifyProfile', 'Save'],
    46: ['Profile', 'LogOut'],
    47: ['gotoWechat', 'Wechat'],
    48: ['gotoWemart', 'Wemart'],
    49: ['MyNote', 'Tab-Self'],
    50: ['MyNote', 'Tab-collection'],
    51: ['MyNote', 'CreatNote'],
    52: ['MyNote', 'Top'],
    53: ['MyTopic', 'Tab-Self'],
    54: ['MyTopic', 'Tab-Collection'],
    55: ['MyTopic', 'CreatTopic'],
    56: ['MyTopic', 'Top'],
    57: ['Homepage', 'LogIn'],
    58: ['Homepage', 'MORE'],
    59: ['Homepage', 'Course'],
    60: ['Homepage', 'Topic'],
    61: ['Homepage', 'Note'],
    62: ['Homepage', 'ProfileCenter'],
    63: ['Homepage', '?'],
    64: ['Homepage', '?'],
    65: ['Homepage', 'MoreHotCourse'],
    66: ['Homepage', 'MoreHotTopic'],
    67: ['Homepage', 'Top'],
    68: ['Homepage', 'MoreHotNote'],
    69: ['LogIn', 'GetSMSCode'],
    70: ['LogIn', 'LogByMobile'],
    71: ['LogIn', 'LogByWechat'],
    72: ['Navigation', 'LogIn'],
    73: ['Navigation', 'Course'],
    74: ['Navigation', 'Topic'],
    75: ['Navigation', 'Note'],
    76: ['Navigation', 'ProfileCenter'],
    77: ['Navigation', 'gotoWechat'],
    78: ['Navigation', 'gotoWemart'],
    79: ['AllTopics', 'Hot'],
    80: ['AllTopics', 'Price'],
    81: ['AllTopics', 'Taste'],
    82: ['AllTopics', 'Match'],
    83: ['AllTopics', 'Utensil'],
    833: ['AllTopics', 'Other'],
    84: ['AllTopics', 'CreatTopic'],
    85: ['AllTopics', 'Top'],
    86: ['AnswerTopic', 'Submit'],
    87: ['CreateTopic', 'Submit'],
    88: ['TopicDetail', 'Like'],
    89: ['TopicDetail', 'Collect'],
    90: ['TopicDetail', 'Share'],
    911: ['TopicDetail', 'Answer'],
    91: ['FragranceAnimal', 'Submit'],
    92: ['FragranceBaking', 'Submit'],
    93: ['FragranceFlower', 'Submit'],
    94: ['FragranceFruit', 'Submit'],
    95: ['FragranceMuddy', 'Submit'],
    96: ['FragranceOak', 'Submit'],
    97: ['FragrancePlant', 'Submit'],
    98: ['CreateNote', 'Submit'],
    99: ['NoteDetail', 'Collect'],
    100: ['NoteDetail', 'Like'],
    101: ['NoteDetail', 'Share'],
    102: ['NoteDetail', 'CreatNote'],
    103: ['NoteList', 'RankbyTime'],
    104: ['NoteList', 'RankbyHot'],
    105: ['NoteList', 'CreatNote'],
    106: ['NoteList', 'Top']
}

$(function () {
    eventTracking();
});

function eventTracking() {
    $(document).off("click").on("click", "[data-ga]", function () {
        var index = $(this).attr("data-ga");
        datapush(gaTrackingData[index], index);
    });

    //external
    $(document).off("click").on("click", "#loginBar", function () {
        if(location.href.indexOf("index")!=-1 && $(this).parents(".header").find(".nav.showed").length){
            datapush(gaTrackingData[72], 72);
        }else if(location.href.indexOf("index")!=-1){
            datapush(gaTrackingData[57], 57);
        }

    });

}

function datapush(action, index) {
    if (window.console) console.log(action);
    //ga tracking
    try {
        if (typeof ga) {
            if (index < 40) {
                action.length == 1 && (ga('send', 'event', 'Mini Class', $.trim(action[0])));
                action.length == 2 && (ga('send', 'event', 'Mini Class', $.trim(action[0]), $.trim(action[1])));
                window._CiQ11462 = window._CiQ11462 || [];
                window._CiQ11462.push(['_trackEvent', {
                    type: 1,
                    labels: [
                        {'按钮名称': (action.length == 2) ? $.trim(action[1]) : $.trim(action[0])}
                    ],
                    values: [
                        {'数量': 1}
                    ]
                }]);
                window.CClickiV3 && window.CClickiV3[11462] && window.CClickiV3[11462]._flushObserver(function () {
                });
            } else {
                ga('send', 'event', $.trim(action[0]), $.trim(action[1]));
            }
        }
    } catch (Ex) {

    }
    //Gridsum tracking
    //if (window._gsTracker) {
    //    _gsTracker.trackEvent("April2014EffC", $.trim(action), "Mobile");
    //}
}
