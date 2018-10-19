var voteStats = {};
var screenPassword;
var timeOutLock; // 无操作多久后锁屏，单位分钟，可以有一位小数;
$(function () {
    init();
})
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
layui.use("form",function () {
    var form = layui.form;
    form.on('select(voteField)', function(data){
        if(data.value == 2){
            $("#collegeChooseBox").hide();
            $("#secondNotice").show();
        }else{
            $("#collegeChooseBox").show();
            $("#secondNotice").hide();
        }
    });
})
/**
 * 初始化函数
 * */
function init() {
    getSystemConfig();
    getVoteStats();
    if(checkSaveStatus()){
        getCollegeList();
    }
}
/**
 * setSysTitle
 * */
function setSysTitle(){
    var sysTitle = $("#sysTitle").val();
    var sysSingleTitle = $("#sysSingleTitle").val();
    if(sysSingleTitle.trim() !="" && sysTitle.trim() != ""){
        $.ajax({
            url:"/system/setSysTitle",
            type:"post",
            dataType:"json",
            data:{
                title:sysTitle,
                singleTitle:sysSingleTitle
            },
            async:false,
            success:function (res) {
                console.log(res);
                if(res.code == 100001){
                    location.href = "/login.html";
                }else if(res.code == 0){
                    systemAlert("修改标题成功",1,function () {
                        location.reload();
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
    }else{
        systemAlert("标题不能为空！",2);
    }

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
 * 锁屏
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
 * 更改当前系统状态
 * */
function changeCurrentStats(){
    var formData = $("#currentVoteForm").serializeJson();
    $.ajax({
        url:"/vote/updateCurrentStats",
        type:"post",
        dataType:"json",
        data:{
            startVote:formData.system,
            currentField:formData.voteField,
            currentCollegeId:formData.currentCollege
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("修改当前状态成功",1,function () {
                    location.reload();
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
 * 开始投票
 * */
function startVote() {
    $.ajax({
        url:"/vote/startVote",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("投票已开启",1,function () {
                    location.reload();
                })
            }else{
                systemAlert(res.msg+",code："+res.code,2);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("错误code："+res.code,2);
        }
    });
}
/**
 * 停止投票
 * */
function stopVote() {
    $.ajax({
        url:"/vote/stopVote",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("投票已停止",1,function () {
                    location.reload();
                })
            }else{
                systemAlert(res.msg+",code："+res.code,2);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("错误code："+res.code,2);
        }
    });
}
/**
 * 检查投票状态
 * */
function getVoteStats() {
    $.ajax({
        url:"/vote/getVoteStatsByAdmin",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                voteStats = res.data;
                renderVoteInfo(res.data);
            }else{
                systemAlert(res.msg+",code："+res.code,2);
            }
        },
        error:function (res) {
            systemAlert("错误code："+res.code,2);
        }
    });
}
/**
 * 渲染信息
 * */
function renderVoteInfo(data){
    if(data.startVote){
        $("#systemStatsShow").val("已开启");
    }else{
        $("#systemStatsShow").val("已关闭");
    }
    if(data.startVoteCollege){
        $("#startCollegeVoteStatsShow").val("投票已开始");
    }else{
        $("#startCollegeVoteStatsShow").val("投票已停止");
    }
    if(data.currentField == 1){
        $("#voteFieldShow").val("第一轮");
        $("#currentCollegeShow").val(data.currentCampus.campusName+" "+data.currentCollege.collegeName);
        $("#currentCandidateNumShow").val(data.currentCollege.candidateNum);
    }else{
        $("#voteFieldShow").val("第二轮");
        $("#currentCollegeShow").val("该轮投票不涉及此项");
        $("#currentCandidateNumShow").val("该轮投票不涉及此项");
    }
    layui.use('form', function(){
        var form = layui.form;
        form.render();
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
 * 获取学院列表
 * */
function getCollegeList() {
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
                voteStats = res.data;
                renderCollegeList(res.data);
            }else{
                alert(res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
        }
    });
}
/**
 * 渲染学院列表
 * */
function renderCollegeList(data) {
    $("#currentCollege").empty();
    for (var i=0;i<data.length;i++){
        $("#currentCollege").append("<option value='"+data[i].id+"'>"+data[i].collegeName+"</option>");
    }
    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });
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