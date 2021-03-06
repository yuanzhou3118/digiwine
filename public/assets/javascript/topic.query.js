/**
 * Created by xinkui.huang on 2016-05-25.
 */

function go(p) {
    $.ajax({
        type: 'GET',
        url: window.queryUrl + p,
        data: {
            tag: $.trim($('#tag').val()),
            sort: $.trim($('#sort').val()),
            status: $.trim($('#status').val())
        },
        dataType: 'json',
        cache: false,
        beforeSend: function () {
            $('#info').block({
                message: '<img src="' + window.loadImgUrl + '" alt="Loading..." />',
                css: {
                    border: '0px',
                    textAlign: 'center',
                    width: '32px',
                    top: '50%',
                    left: '50%'
                },
                overlayCSS: {
                    backgroundColor: '#FFF',
                    opacity: 0.6
                }
            });
        },
        success: function (data) {
            if (data.result == 0) {
                $('#info').html('no data！');
                $('#pager').html('');

                if (p != 1)
                    go(1);

                return false;
            }

            var jsondata = eval(data.data);

            var myhtml = '<table class="table table-striped table-hover table-condensed">'
                + '<thead>'
                + '<tr class="success row">'
                + '<th class="col-sm-1">Id</th>'
                //+ '<th class="col-sm-1">User_Id</th>'
                + '<th class="col-sm-1">Tag</th>'
                + '<th class="col-sm-4">Question</th>'
                + '<th class="col-sm-1">Sort</th>'
                + '<th class="col-sm-1">Edit</th>'
                + '<th class="col-sm-1">Status</th>'
                + '<th class="col-sm-2">Approval</th>'
                + '<th class="col-sm-1">Comment</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>';

            $.each(jsondata, function (i, item) {
                myhtml += '<tr class="row">'
                    + '<td class="col-sm-1">' + item.id + '</td>'
                    //+ '<td class="col-sm-1">' + item.user_id + '</td>'
                    + '<td class="col-sm-1">' + item.tag + '</td>'
                    + '<td class="col-sm-4">' + item.question + '</td>'
                    + '<td class="col-sm-1">' + item.sort + '</td>'
                    + '<td class="col-sm-1">';
                myhtml += '<a href="' + window.eidtTopic + item.id + '" class="btn btn-success" id="sort">编辑排序</a>';
                myhtml += '</td>'
                    + '<td class="col-sm-1">' + item.status + '</td>'
                    + '<td class="col-sm-2">';
                if (item.status == 1) {
                    myhtml += '<a href="javascript:;" onclick="approval(' + item.id + ', ' + p + ', ' + 0 + ')"' + ' class="btn btn-danger" id="status">审核不通过</a>';
                }else{
                    myhtml += '<a href="javascript:;" onclick="approval(' + item.id + ', ' + p + ', ' + 1 + ')"' + ' class="btn btn-success" id="status">审核通过</a>';
                }
                myhtml += '</td>'

                    + '<td class="col-sm-1">';
                if (item.status == 1) {
                    myhtml += '<a href="' + window.topicCommentUrl + item.id + '" class="btn btn-success">Comment</a>';
                } else {
                    myhtml += '话题审核未通过';
                }
                myhtml += '</td></tr>';
            });

            myhtml += '</tbody></table>';

            $('#info').html(myhtml);

            $("#pager").pager({
                listnum: 3,
                totalrecords: data.count,
                pagesize: 10,
                pageindex: p,
                callback: go
            });
        },
        complete: function () {
            $('#info').unblock();
        }
    });
}

function approval(id, p, status) {
    $.ajax({
        type: 'POST',
        url: window.approvalUrl + id,
        data: {
            status: status
        },
        dataType: 'json',
        beforeSend: function () {
            $('#info').block({
                message: '<img src="' + window.loadImgUrl + '" alt="Loading..." />',
                css: {
                    border: '0px',
                    textAlign: 'center',
                    width: '32px',
                    top: '50%',
                    left: '50%'
                },
                overlayCSS: {
                    backgroundColor: '#FFF',
                    opacity: 0.6
                }
            });
        },
        success: function (data) {
            if (data.result == 0) {
                alert('fail!');
            }
            else {
                alert('success!');
            }
        },
        complete: function () {
            $('#info').unblock();

            go(p);
        }
    });
}

$(function () {
    $("#query_btn").click(function () {
        go(1);
    });

});

