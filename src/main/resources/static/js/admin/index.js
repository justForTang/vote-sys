var voteStats = {};
$(function () {
    getVoteStats();
    getCollegeList();
})
$("#voteField").bind('input propertychange', function() {
    if($("#voteField").val() == 2){
        $("#collegeChooseBox").hide();
        $("#secondNotice").show();
    }else{
        $("#collegeChooseBox").show();
        $("#secondNotice").hide();
    }
})
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
                systemAlert("red","修改当前状态成功！",function () {
                    location.reload();
                });
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("red","错误code："+res.status);
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
                systemAlert("red","投票已开启！",function () {
                    location.reload();
                });
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("red","错误code："+res.status);
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
                systemAlert("red","投票已停止！",function () {
                    location.reload();
                });
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("red","错误code："+res.status);
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
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            systemAlert("red","错误code："+res.status);
        }
    });
}
/**
 * 渲染信息
 * */
function renderVoteInfo(data){
    if(data.startVote){
        $("#systemStatsShow").text("已开启");
    }else{
        $("#systemStatsShow").text("已关闭");
    }
    if(data.startVoteCollege){
        $("#startCollegeVoteStatsShow").text("投票已开始");
    }else{
        $("#startCollegeVoteStatsShow").text("投票已停止");
    }
    if(data.currentField == 1){
        $("#voteFieldShow").text("第一轮");
        $("#currentCollegeShow").text(data.currentCampus.campusName+" "+data.currentCollege.collegeName);
        $("#currentCandidateNumShow").text(data.currentCollege.candidateNum);
    }else{
        $("#voteFieldShow").text("第二轮");
        $("#currentCollegeShow").html("<span style='color: red'>该轮投票不涉及此项</span>");
        $("#currentCandidateNumShow").html("<span style='color: red'>该轮投票不涉及此项</span>");
    }
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
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("red","错误code："+res.status);
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