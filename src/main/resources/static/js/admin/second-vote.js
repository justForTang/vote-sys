var passNum = 0;
var voteRule = 1;
var showType = 1;
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
function init() {
    getSystemConfig();
    if(checkSaveStatus()){
        renderTable();
        layui.use('form',function () {
            var form = layui.form;
            form.on('submit(saveSecondVoteData)', function(data){
                console.log(data.field) ;
                updateVoteRule(data.field);
                return false;
            });
        })
    }
}
/**
 * 新增第二次选手名单
 * */
function addSecondCandidate() {
    layui.use('layer',function () {
        layer.open({
            type: 1
            ,title: false //不显示标题栏
            ,closeBtn: true
            ,area: '300px;'
            ,shade: 0.3
            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            ,btn: ['新增','取消']
            ,btnAlign: 'c'
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<div style="padding: 15px; line-height: 22px; background-color: #53cde2; color: #393e46; text-align: center;font-size: 20px;">新增第二轮选手</div>' +
                '<div class="margin-15">\n' +
                '                                                <input type="text" id="collegeName" required  lay-verify="required" placeholder="请填入选手分组" autocomplete="off" class="layui-input candidate-input">\n' +
                '<input type="text" id="candidateName" required  lay-verify="required" placeholder="请填入选手姓名" autocomplete="off" class="layui-input candidate-input">' +
                '<input type="text" id="sicauId" required  lay-verify="required" placeholder="请填入选手学号" autocomplete="off" class="layui-input candidate-input">' +
                '                                            </div>'
            ,yes: function(index){
                var candidateName = $("#candidateName").val();
                var collegeName = $("#collegeName").val();
                var sicauId = $("#sicauId").val();
                if(candidateName.trim() != "" && collegeName.trim() != "" && sicauId!=""){
                    $.ajax({
                        url:"/vote/addSecondCandidate",
                        type:"post",
                        data:{
                            candidateName:candidateName,
                            collegeName:collegeName,
                            sicauId:sicauId
                        },
                        dataType:"json",
                        async:false,
                        success:function (res) {
                            console.log(res);
                            layer.close(index);
                            if(res.code == 100001){
                                location.href = "/login.html";
                            }else if(res.code == 0){
                                systemAlert("添加成功！",1,function () {
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
                }else{
                    systemAlert("必填字段不能为空或空格",2);
                }
            }
        });
    })
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
            ,height: 450
            ,url: '/vote/getSecondCurrentData' //数据接口
            ,method:'get'
            ,title: '用户表'
            ,page: false//开启分页
            ,toolbar: 'true' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,totalRow: false //开启合计行
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'id', title: 'ID', fixed: 'left'}
                ,{field: 'collegeName', title: '组别',fixed: 'left'}
                ,{field: 'candidateName', title: '姓名'}
                ,{field: 'sicauId', title: '学/工号'}
                ,{field: 'votedNum', title: '票数',sort: true}
                ,{fixed: 'right', title: '操作',width:180, align:'center', toolbar: '#barDemo'}
            ]]
            ,request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            }
            ,parseData: function(res){ //res 即为原始返回的数据
                passNum = res.data.passNum;
                voteRule = res.data.voteRule;
                showType = res.data.showType;
                renderRuleForm();
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.candidateList.length, //解析数据长度
                    "data": res.data.candidateList //解析数据列表
                };
            }
        });
        //监听行工具事件
        table.on('tool(userTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'del'){
                layer.confirm('确定删除'+data.candidateName+"?", function(index){
                    console.log(data);
                    layer.close(index);
                    delSecondCandidate(data.id,obj);
                });
            }
        });
    });
}
/**
 * 删除某一个选手
 * */
function delSecondCandidate(id,obj){
    $.ajax({
        url:"/vote/deleteSecondCandidate",
        type:"post",
        data:{
            id:id
        },
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("删除成功！",1,function () {
                    obj.del(); //删除对应行（tr）的DOM结构
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
 * 删除选中选手
 * */
function delSecondCandidates(){
    layui.use(['table','layer'], function() {
        var table = layui.table,layer=layui.layer;
        layer.confirm('确定删除选中的选手?', function(index){
            layer.close(index);
            var checkStatus = table.checkStatus('userTable');
            console.log(checkStatus.data);
            var idList = [];
            for (var i = 0; i < checkStatus.data.length; i++) {
                idList.push(checkStatus.data[i].id);
            }
            if(idList.length == 0){
                systemAlert("请先勾选",2);
            }else{
                $.ajax({
                    url:"/vote/deleteSecondCandidates",
                    type:"post",
                    data:{
                        idList:idList.toString()
                    },
                    dataType:"json",
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
        });
    });
}
/**
 * 渲染规则表
 * */
function renderRuleForm() {
    layui.use('form',function () {
        var form  = layui.form;
        $("input[name=voteRule][value='"+voteRule+"']").attr("checked",true);
        $("input[name=showType][value='"+showType+"']").attr("checked",true);
        $("input[name=passNum]").val(passNum);
        form.render();
    })
}
/**
 * 保存投票规则
 * */
function updateVoteRule(data){
    $.ajax({
        url:"/vote/updateSecondVoteRule",
        type:"post",
        data:{
            voteRule:data.voteRule,
            passNum:data.passNum,
            showType:data.showType
        },
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("保存成功！",1,function () {
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