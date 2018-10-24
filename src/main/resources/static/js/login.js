$(function () {
    // getSysConf();
    showMsg();
})
/**
 * 获取系统配置并更新
 * */
function getSysConf(){
    $.ajax({
        url:"/system/getSysConf",
        type:"get",
        dataType:"json",
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                $("title").text("登录——"+res.data.singleTitle);
                $("#systemTitle").text(res.data.singleTitle);
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
 * 检查表单
 * */
function checkForm() {
    var formData = $("#loginForm").serializeJson();
    if(navigator.cookieEnabled){
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
    }else{
        var msg = "您当前浏览器<b>已关闭cookie</b>或正处于<b>无痕模式</b>,请前往浏览器设置并允许cookie使用或关闭无痕模式。";
        systemAlert('red',msg);
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
                location.href = encodeURI("index.html?uid="+res.data.id+"&realName="+res.data.realName+"&role="+res.data.role);
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
 * 注意事项
 * */
function showMsg(){
    var msg = "您好！在使用该系统前您需知：<br>" +
        "<b>1、</b>请先打开<b>浏览器cookie允许</b>（默认是打开的）并且关闭<b>无痕浏览模式</b>；<br>" +
        "<b>2、</b>该系统仅限在<b>同一设备</b>、<b>同一浏览器</b>登录，不可在<b>多处登录</b>；<br>" +
        "<b>3、</b>评委登录请勾选<b>评委</b>选项，评委账号由管理员分发；<br>" +
        "<b>4、</b>在管理员开放投票之后才能进行投票；<br>" +
        "<b>5、</b>您的所有操作会被系统记录，请谨慎操作。<br>" +
        "在使用过程中遇到任何问题请及时联系管理员。";
    systemAlert('green',msg);
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