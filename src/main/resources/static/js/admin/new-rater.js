var screenPassword;
var timeOutLock; // 无操作多久后锁屏，单位分钟，可以有一位小数;
window.onload = function (){
    (function($){
        funObj = {
            timeUserFun:'timeUserFun',
        }
        $[funObj.timeUserFun] = function(time){
            var time = time || 2;
            var userTime = time*60;
            var objTime = {
                init:0,
                time:function(){
                    objTime.init += 1;
                    if(objTime.init == userTime){
                        lockScreen();  // 用户到达未操作事件 做一些处理
                    }
                },
                eventFun:function(){
                    clearInterval(testUser);
                    objTime.init = 0;
                    testUser = setInterval(objTime.time,1000);
                }
            }

            var testUser = setInterval(objTime.time,1000);

            var body = document.querySelector('html');
            body.addEventListener("click",objTime.eventFun);
            body.addEventListener("keydown",objTime.eventFun);
            body.addEventListener("mousemove",objTime.eventFun);
            body.addEventListener("mousewheel",objTime.eventFun);
        }
    })(window)

//     直接调用 参数代表分钟数,可以有一位小数;
    timeUserFun(timeOutLock);
}
$(function () {
    init();
})
/**
 * 初始化函数
 * */
function init(){
    getSystemConfig();
    if(checkSaveStatus()){
        layui.use(['form','layer'],function () {
            var form = layui.form
                ,layer = layui.layer;
            form.on('submit(insertRater)', function(data){
                console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.3
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定新增','取消']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div class="confirm-style">' +
                        '<div class="layui-form-item">\n' +
                        '                <label class="layui-form-label">用户名：</label>\n' +
                        '                <div class="layui-input-block">'+data.field.username+'</div>\n' +
                        '            </div>\n' +
                        '            <div class="layui-form-item">\n' +
                        '                <label class="layui-form-label">真实姓名：</label>\n' +
                        '                <div class="layui-input-block">'+data.field.realName+'</div>\n' +
                        '            </div>\n' +
                        '            <div class="layui-form-item">\n' +
                        '                <label class="layui-form-label">学/工号：</label>\n' +
                        '                <div class="layui-input-block">'+data.field.sicauId+'</div>\n' +
                        '            </div>\n' +
                        '            <div class="layui-form-item">\n' +
                        '                <label class="layui-form-label">密码：</label>\n' +
                        '                <div class="layui-input-block">\n' +
                        '                    *******\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div class="layui-form-item">\n' +
                        '                <label class="layui-form-label">校区：</label>\n' +
                        '                <div class="layui-input-block">'+data.field.campus+'</div>\n' +
                        '            </div>' +
                        '            <div class="layui-form-item">\n' +
                        '                <label class="layui-form-label">角色：</label>\n' +
                        '                <div class="layui-input-block">'+data.field.role+'</div>\n' +
                        '            </div>' +
                        '</div>'
                    ,yes: function(index){
                        layer.close(index);
                        insertRater(data.field);
                    }
                });
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
            form.verify({
                username: function(value, item){ //value：表单的值、item：表单的DOM对象
                    if(value.trim() == ''){
                        return '用户名不能为空';
                    }
                    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                        return '用户名不能有特殊字符';
                    }
                    if(/(^\_)|(\__)|(\_+$)/.test(value)){
                        return '用户名首尾不能出现下划线\'_\'';
                    }
                }
                ,realName: function (value) {
                    if(value.trim() == ''){
                        return '真实姓名不能为空';
                    }
                    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                        return '真实姓名不能有特殊字符';
                    }
                    if(/(^\_)|(\__)|(\_+$)/.test(value)){
                        return '真实姓名首尾不能出现下划线\'_\'';
                    }
                }
                ,sicauId:function (value) {
                    if (value.trim()!=''){
                        if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                            return '学/工号不能有特殊字符';
                        }
                    }
                }
                ,password: [
                    /^[\S]{3,16}$/
                    ,'密码必须3到16位，且不能出现空格'
                ]
            });
        })
    }
}

/**
 * 新增用户
 * */
function insertRater(data) {
    $.ajax({
        url:"/user/insertRater",
        type:"post",
        data:{
            campus:data.campus,
            username:data.username,
            password:data.password,
            realName:data.realName,
            role:data.role,
            sicauId:data.sicauId
        },
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("新增成功！",1,function () {
                    layui.use('form',function () {
                        var form = layui.form;
                        form.render();
                    })
                });
            }else{
                systemAlert(res.msg+",code："+res.code,2);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("错误code："+res.status,2);
        }
    });
}

/**
 * logOut
 * */
function logOut() {
    layui.use('layer',function () {
        layer.open({
            icon:3,
            content:"是否确定退出？",
            btn:['确定','取消'],
            yes:function (index) {
                $.ajax({
                    url:"/admin/logout",
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
                window.localStorage.setItem("vote_admin_clock","true");
                location.href = "../login.html";
            }
        })
    })
}

/**
 * 获取系统配置
 * */
function getSystemConfig() {
    $.ajax({
        url:"/system/getSysConfWithAdmin",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                window.localStorage.setItem("vote_admin_clock","false");
                screenPassword = res.data.screenPassword;
                timeOutLock = res.data.timeOutLock;
                $("#sysTitle").val(res.data.title);
                $("#sysSingleTitle").val(res.data.singleTitle);
            }else{
                systemAlert(res.msg+",code："+res.code,2);
            }
        },
        error:function (res) {
            systemAlert("错误code："+res.status,2);
        }
    });
}
/**
 * 检查安全性
 * */
function checkSaveStatus(){
    if(window.localStorage.getItem("vote_admin_clock") != "false"){
        lockScreen();
        return false;
    }else{
        layui.use('layer',function () {
            layer.closeAll();
        })
        return true;
    }
}
/**
 * 安全锁屏
 * */
function lockScreen() {
    $('body').attr("onkeydown","maskingKeyboard()");
    $('body').attr("oncontextmenu","window.event.returnValue=false" );
    $('body').attr("onselectstart","event.returnValue=false");
    window.localStorage.setItem("vote_admin_clock","true");
    layui.use('layer',function () {
        layer.open({
            type: 1
            ,title: false //不显示标题栏
            ,closeBtn: false
            ,area: '300px;'
            ,shade: 0.9
            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            ,btn: ['解锁']
            ,btnAlign: 'c'
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">屏幕已锁定，请输入解锁密码。</div>' +
                '<div class="margin-15">\n' +
                '                                                <input type="password" id="screenInput" required  lay-verify="required" placeholder="请填入解锁密码" autocomplete="off" class="layui-input">\n' +
                '                                            </div>'
            ,yes: function(index){
                if($("#screenInput").val() == screenPassword){
                    $('body').removeAttr("onkeydown");
                    $('body').removeAttr("oncontextmenu");
                    $('body').removeAttr("onselectstart");
                    window.localStorage.setItem("vote_admin_clock","false");
                    layer.close(index);
                }
            }
        });
    })
}
/**
 * layui alert
 * */
function systemAlert(msg,icon,callback){
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.alert(msg,{icon:icon,closeBtn:0},function (index) {
            layer.close(index);
            if (callback != null) {
                return callback();
            }
        });
    });
}
//屏蔽键盘的单击事件
function maskingKeyboard(){
    // 禁用回车
    if(event.keyCode == 13){
        event.keyCode = 0;
        event.returnValue = false;
    }
    // 禁用F12
    if(event.keyCode == 123){
        event.keyCode = 0;
        event.returnValue = false;
    }
    // 禁用Ctrl
    if(event.keyCode == 17){
        event.keyCode = 0;
        event.returnValue = false;
    }
    // 禁用Alt
    if(event.keyCode == 18){
        event.keyCode = 0;
        event.returnValue = false;
    }
}