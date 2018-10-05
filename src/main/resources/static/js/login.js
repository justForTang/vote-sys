$(function () {
    var msg = "您好！该系统仅限在<b>同一设备</b>、<b>同一浏览器</b>登录，不可在<b>多处登录</b>，并且在使用过程中您的操作可能会被记录。如有疑问请联系管理员。";
    systemAlert('green',msg);
})
/**
 * 检查表单
 * */
function checkForm() {
    var formData = $("#loginForm").serializeJson();
    if(formData.username.trim()==""){
        autoCloseAlert('red',"用户名不能为空",3000)
    }else if(formData.password.trim() ==""){
        autoCloseAlert('red',"密码不能为空",3000)
    }else{
        if(formData.role == "user"){
            loginByUser(formData.username,formData.password);
        }else{
            loginByAdmin(formData.username,formData.password);
        }
    }

}
/**
 * 用户登录
 * */
function loginByUser(username, password) {
    $.ajax({
        url:"/user/login",
        type:"post",
        data:{
            username:username,
            password:password
        },
        dataType:"json",
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                location.href = "index.html";
            }else{
                systemAlert('red',res.msg);
            }
        },
        error:function (res) {
            systemAlert('red',"出错啦，code："+res.status);
        }
    })
}
/**
 * 管理员登录
 * */
function loginByAdmin(username, password){
    $.ajax({
        url:"/admin/login",
        type:"post",
        data:{
            username:username,
            password:password
        },
        dataType:"json",
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                location.href = "admin/index.html";
            }else{
                systemAlert('red',res.msg);
            }
        },
        error:function (res) {
            systemAlert('red',"出错啦，code："+res.status);
        }
    })
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
            "我知道了": function (){
                if(callback != null){
                    return callback();
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