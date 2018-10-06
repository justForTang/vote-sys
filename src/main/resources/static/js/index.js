$(function () {
    // checkLogStats();
})
/**
 * refreshPage 刷新页面
 * */
function refreshPage(){
    location.reload();
}
/**
 * 退出登录
 * */
function logOut(){
    systemConfirm("是否确认退出登录？",function () {
        $.ajax({
            url:"/user/logout",
            type:"get",
            dataType:"json",
            async:false,
            success:function (res) {
                console.log(res);
            },
            error:function (res) {
                console.log(res.status);
            }
        });
        location.href = "login.html";
    })
}
/**
 * 检查登录状态
 * */
function checkLogStats(){
    $.ajax({
        url:"/user/check",
        type:"get",
        dataType:"json",
        success:function (res) {
            console.log(res);
            if(res.code != 0){
                var msg = res.msg + ",请重新登录。code："+res.code;
                systemAlert('red',msg,function () {
                    location.href = "login.html";
                });
            }
        },
        error:function (res) {
            systemAlert('red',"出错啦，code："+res.status);
        }
   });
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
// 序列化表单，将其转化为json格式
    $.fn.serializeJson = function() {
        var arr = this.serializeArray();
        var json = {};
        arr.forEach(function(item) {
            var name = item.name;
            var value = item.value;
            if (!json[name]) {
                json[name] = value;
            } else if ($.isArray(json[name])) {
                json[name].push(value);
            } else {
                json[name] = [json[name], value];
            }
        });
        return json;
    }