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
 * 初始化
 * */
function init() {
    getSystemConfig();
    if(checkSaveStatus()){
        renderCollegeTable();
        renderCollegeSelect();
        renderCandidateTable();
        layui.use(['form','layer'],function () {
            var form = layui.form;
            form.on('submit(addCollege)', function(data){
                console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                addCollege(data.field);
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });

            form.on('submit(addCandidate)', function(data){
                console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                addCandidate(data.field);
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });

            form.on('submit(deleteCollegeVoteLog)',function (data) {
                console.log(data.field);
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: true
                    ,area: '300px;'
                    ,shade: 0.3
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['解锁']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px; line-height: 22px; background-color: #f47645; color: #fff; font-weight: 300;">本操作属于危险操作，需确认操作者身份。</div>' +
                        '<div class="margin-15">\n' +
                        '                                                <input type="password" required  lay-verify="required" placeholder="请填入管理员密码" autocomplete="off" class="layui-input checkLoginPassword">\n' +
                        '                                            </div>'
                    ,yes: function(index){
                        layer.close(index);
                        if (dangerActionAuthentication($(".checkLoginPassword").val())) {
                            $.ajax({
                                url:"/vote/deleteFirstVoteCollegeLog",
                                type:"post",
                                data:{
                                    voteCollegeId:data.field.collegeId
                                },
                                dataType:"json",
                                async:false,
                                success:function (res) {
                                    console.log(res);
                                    if(res.code == 100001){
                                        location.href = "/login.html";
                                    }else if(res.code == 0){
                                        systemAlert("已成功删除该组别投票记录！",1,function () {
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
                    }
                });
                return false;
            })

            form.on('submit(deleteAllCollegeVoteLog)',function (data) {
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: true
                    ,area: '300px;'
                    ,shade: 0.3
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['解锁']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="padding: 50px; line-height: 22px; background-color: #f47645; color: #fff; font-weight: 300;">本操作属于危险操作，需确认操作者身份。</div>' +
                        '<div class="margin-15">\n' +
                        '                                                <input type="password" required  lay-verify="required" placeholder="请填入管理员密码" autocomplete="off" class="layui-input checkLoginPassword">\n' +
                        '                                            </div>'
                    ,yes: function(index){
                        layer.close(index);
                        if(dangerActionAuthentication($(".checkLoginPassword").val())){
                            $.ajax({
                                url:"/vote/deleteFirstVoteAllCollegeLog",
                                type:"post",
                                dataType:"json",
                                async:false,
                                success:function (res) {
                                    console.log(res);
                                    if(res.code == 100001){
                                        location.href = "/login.html";
                                    }else if(res.code == 0){
                                        systemAlert("已成功删除第一轮全部投票记录！",1,function () {
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
                    }
                });
                return false;
            })
        })
    }
}
/**
 * 危险操作身份验证
 * */
function dangerActionAuthentication(password) {
    var pass = false;
    $.ajax({
        url:"/admin/dangerActionAuthentication",
        type:"post",
        data:{
            password:password
        },
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                pass = true;
            }else if(res.code == 100004){
                systemAlert("密码错误",2);
            }else{
                systemAlert(res.msg+",code："+res.code,2);
            }
        },
        error:function (res) {
            console.error(res.status);
        }
    });
    return pass;
}
/**
 * 渲染组别
 * */
function renderCollegeSelect(){
    $.ajax({
        url:"/vote/getCollegeListByAdmin",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                $("#collegeSelect").empty();
                $("#deleteLogCollege").empty();
                for (var i = 0; i < res.data.length; i++) {
                    $("#collegeSelect").append("<option value="+res.data[i].id+">"+res.data[i].collegeName+"</option>")
                    $("#deleteLogCollege").append("<option value="+res.data[i].id+">"+res.data[i].collegeName+"</option>")
                }
                layui.use('form',function () {
                    var form = layui.form;
                    form.render();
                })
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
 * 渲染组别（学院）表格
 * */
function renderCollegeTable(){
    layui.use('table', function(){
        var table = layui.table;

        //执行一个 table 实例
        table.render({
            elem: '#collegeTable'
            ,id:'collegeTable'
            ,height: 400
            ,url: '/vote/getCollegeListByAdmin' //数据接口
            ,method:'get'
            ,title: '用户表'
            ,page: false//开启分页
            ,toolbar: 'true' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,totalRow: false //开启合计行
            ,cols: [[ //表头
                {field: 'collegeName', title: '组别名'}
                ,{field: 'campusName', title: '校区'}
                ,{field: 'candidateNum', title: '竞选人'}
                ,{fixed: 'right', title: '操作', align:'center', toolbar: '#collegeBar'}
            ]]
            ,request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            }
            ,parseData: function(res){ //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.length, //解析数据长度
                    "data": res.data //解析数据列表
                };
            }
        });
        //监听行工具事件
        table.on('tool(collegeTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'del'){
                layer.confirm('删除组别将删除该组别下所有关联，确定删除'+data.collegeName+"?",{icon:0}, function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    layer.close(index);
                    delCollegeById(data.id);
                });
            }
        });
    });
}
/**
 * 渲染选手表格
 * */
function renderCandidateTable(){
    layui.use('table', function(){
        var table = layui.table;

        //执行一个 table 实例
        table.render({
            elem: '#candidateTable'
            ,id:'candidateTable'
            ,height: 400
            ,url: '/vote/getCandidateListByAdmin' //数据接口
            ,method:'get'
            ,title: '用户表'
            ,page: true//开启分页
            ,toolbar: 'true' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,totalRow: false //开启合计行
            ,cols: [[ //表头
                {field: 'campusName',width:'25%', title: '校区'}
                ,{field: 'collegeName', width:'25%',title: '组别名'}
                ,{field: 'candidateName',width:'25%', title: '姓名'}
                ,{fixed: 'right', title: '操作', align:'center', width:'25%',toolbar: '#candidateBar'}
            ]]
            ,request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            }
            ,parseData: function(res){ //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.candidateList //解析数据列表
                };
            }
        });
        //监听行工具事件
        table.on('tool(candidateTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'del'){
                layer.confirm('确定删除选手'+data.collegeName+"?",{icon:0}, function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    layer.close(index);
                    delCandidateById(data.id);
                });
            }
        });
    });
}
/**
 * 新增选手
 * */
function addCandidate(data){
    $.ajax({
        url:"/vote/addFirstCandidate",
        type:"post",
        dataType:"json",
        data:{
            collegeId:data.collegeId,
            candidateName:data.candidateName
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("新增成功！",1,function () {
                    location.reload();
                });
            }else if(res.code == 100003){
                systemAlert("新增失败！该组别人已满",2);
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
 * 删除选手
 * */
function delCandidateById(id) {
    $.ajax({
        url:"/vote/deleteFirstCandidate",
        type:"get",
        dataType:"json",
        data:{
            id:id
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
 * 新增组别
 * */
function addCollege(data){
    $.ajax({
        url:"/vote/addCollege",
        type:"post",
        dataType:"json",
        data:{
            campusId:data.campusId,
            collegeName:data.collegeName,
            candidateNum:data.candidateNum
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("新增成功！",1,function () {
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
 * 删除组别
 * */
function delCollegeById(id) {
    $.ajax({
        url:"/vote/delCollegeById",
        type:"post",
        dataType:"json",
        data:{
            id:id
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
                }else{
                    $("#screenInput").val("");
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