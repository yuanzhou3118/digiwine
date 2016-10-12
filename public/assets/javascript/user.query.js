/**
 * Created by xinkui.huang on 2016-05-25.
 */

function go(p) {
    $.ajax({
        type: 'GET',
        url: window.queryUrl + p,
        data: {
            mobile: $.trim($('#mobile').val()),
            kol: $.trim($('#kol').val())
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
                + '<th class="col-sm-1">Nickname</th>'
                + '<th class="col-sm-3">Mobile</th>'
                + '<th class="col-sm-3">Openid</th>'
                + '<th class="col-sm-1">Kol</th>'
                + '<th class="col-sm-3">Edit</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>';

            $.each(jsondata, function (i, item) {
                myhtml += '<tr class="row">'
                    + '<td class="col-sm-1">' + item.id + '</td>'
                    + '<td class="col-sm-1">' + decodeURIComponent(item.nick_name) + '</td>'
                    + '<td class="col-sm-1">' + item.mobile + '</td>'
                    + '<td class="col-sm-2">' + item.openid + '</td>'
                    + '<td class="col-sm-1">' + item.kol+ '</td>'
                    + '<td class="col-sm-2">';
                if (item.kol == 1) {
                    myhtml += '<a href="javascript:;" onclick="approval(' + item.id + ', ' + p + ', ' + 0 + ')"' + ' class="btn btn-danger" id="kol">设为非专家</a>';;
                } else {
                    myhtml += '<a href="javascript:;" onclick="approval(' + item.id + ', ' + p + ', ' + 1 + ')"' + ' class="btn btn-success" id="kol">设为专家</a>';
                }
                //myhtml += '<a href="javascript:;" onclick="approval(' + item.id + ', ' + p + ', ' + 1 + ')"' + ' class="btn btn-success" id="kol">专家</a>';
                //myhtml += '<a href="javascript:;" onclick="approval(' + item.id + ', ' + p + ', ' + 0 + ')"' + ' class="btn btn-danger" id="kol">非专家</a>';
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

function approval(id, p, kol) {
    $.ajax({
        type: 'POST',
        url: window.eidtUser + id,
        data: {
            kol: kol
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

