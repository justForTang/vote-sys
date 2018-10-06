var voteStats = {};
$(function () {
    getVoteStats();
})
/**
 * 获取投票状态
 * */
function getVoteStats() {
    $.ajax({
        url:"/statistics/stats",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                voteStats = res.data;
                renderStatisticsPage(res.data);
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
        }
    });
}
/**
 * 设置页面显示
 * */
function renderStatisticsPage() {

}

/**
 * 自动关闭式提示
 * */
function autoCloseAlert(color,msg, time,callback) {
    $.alert({
        title: '系统提示',
        content: msg,
        icon: 'fa fa-comment',
        type: color,
        autoClose: '好的|'+time,
        escapeKey: '好的',
        buttons: {
            "好的": {
                btnClass: 'btn-success',
                action: function() {
                    if(callback != null){
                        return callback();
                    }
                }
            }
        }
    });
}
/**
 * 系统提示框
 * */
function systemAlert(color,msg,callback){
    $.alert({
        title: '系统提示',
        content: msg,
        icon: 'fa fa-comment',
        type: color,
        buttons: {
            "我知道了": {
                btnClass: 'btn-success',
                action:function (){
                    if(callback != null){
                        return callback();
                    }
                }
            }
        }
    });
}
/**
 * 确认提示框
 * */
function systemConfirm(msg,yesCallback,noCallback){
    $.alert({
        title: '系统提示',
        content: msg,
        icon: 'fa fa-question-circle-o',
        type: 'green',
        buttons: {
            "取消":function () {
                if(noCallback != null){
                    return noCallback();
                }
            },
            "确定": {
                btnClass: 'btn-success',
                action:function() {
                    if (yesCallback != null) {
                        return yesCallback();
                    }
                }
            }

        }
    });
}