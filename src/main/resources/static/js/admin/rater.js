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
        renderTable();
    }
}
/**
 * 渲染表格
 * */
function renderTable(){
    layui.use('table', function(){
        var table = layui.table;

        //执行一个 table 实例
        table.render({
            elem: '#userTable'
            ,id:'userTable'
            ,height: 560
            ,url: '/user/getAllUserList' //数据接口
            ,method:'get'
            ,title: '用户表'
            ,page: true //开启分页
            ,toolbar: 'true' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,totalRow: false //开启合计行
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'id', title: 'ID', sort: true, fixed: 'left'}
                ,{field: 'realName', title: '真实姓名',fixed: 'left', sort: true}
                ,{field: 'username', title: '用户名'}
                ,{field: 'sicauId', title: '学/工号'}
                ,{field: 'role', title: '角色',sort: true}
                ,{field: 'hasLog', title: '首次登录', sort: true}
                ,{fixed: 'right', title: '用户操作',width:180, align:'center', toolbar: '#barDemo'}
            ]]
            ,request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            }
            ,parseData: function(res){ //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.count, //解析数据长度
                    "data": res.data.items //解析数据列表
                };
            }
        });
        //监听行工具事件
        table.on('tool(userTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'detail'){
                initUserByUsername(data.username);
            } else if(layEvent === 'del'){
                layer.confirm('确定删除'+data.realName+"?", function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    console.log(data);
                    layer.close(index);
                    delUserByUsername(data.username);
                });
            }
        });
    });
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
 * 删除某一个用户
 * */
function delUserByUsername(username){
    $.ajax({
        url:"/user/deleteUser",
        type:"post",
        dataType:"json",
        data:{
            username:username
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("删除成功！",1,function () {
                    location.reload();
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
 * 初始化用户
 * */
function initUsersByUsername() {
    layui.use('table', function() {
        var table = layui.table;
        var checkStatus = table.checkStatus('userTable');
        console.log(checkStatus.data);
        var usernameList = [];
        for (var i = 0; i < checkStatus.data.length; i++) {
            usernameList.push(checkStatus.data[i].username);
        }
        console.log(usernameList);
        $.ajax({
            url:"/user/updateAllUserLogStats",
            type:"post",
            data:{
                usernameList:usernameList.toString()
            },
            dataType:"json",
            async:false,
            success:function (res) {
                console.log(res);
                if(res.code == 100001){
                    location.href = "/login.html";
                }else if(res.code == 0){
                    systemAlert("初始化成功！",1,function () {
                        location.reload();
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
    });
}
/**
 * 初始化某一用户
 * */
function initUserByUsername(username) {
    $.ajax({
        url:"/user/updateUserLogStats",
        type:"post",
        dataType:"json",
        data:{
            username:username
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("初始化成功！",1,function () {
                    location.reload();
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
            if (callback != null) {
                return callback();
            }
            layer.close(index);
        });
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