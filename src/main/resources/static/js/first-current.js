var voteStats = {};
var teacherValue = 3;
var studentValue = 1;
var studentOneValue = 0;
var studentTwoValue = 0;
var rater = {
    total:0,
    teacher:0,
    student:0
}
var waiverData={
    teacher:0,
    student:0
}
var refreshClock;
$(function () {
    getSysConf();
    getUserCount();
    getVoteStats();
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
                $("title").text(res.data.singleTitle);
                $("#systemTitle").text(res.data.title);
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
 * 获取用户统计数据
 * */
function getUserCount() {
    $.ajax({
        url:"/user/getUserCount",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                rater = res.data;
            }else{
                alert(res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
        }
    })
}
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
 * 获取投票数据
 * */
function getFirstCurrentData(collegeId){
    $.ajax({
        url:"/statistics/getFirstCurrentData",
        type:"get",
        dataType:"json",
        data:{
            collegeId:collegeId,
            voteField:1
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                $("#votedRater").text(res.data.length);
                updateHistogram(res.data);
            }else{
                window.clearInterval(refreshClock);
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            window.clearInterval(refreshClock);
            systemAlert("出错了，code："+res.status);
        }
    })
}
/**
 * updateHistogram 计算并更新柱状图
 * */
function updateHistogram(data) {
    studentOneValue = 0;
    studentTwoValue = 0;
    waiverData.student = 0;
    waiverData.teacher = 0;
    $(".totalRater").text(rater.total);
    if(voteStats.currentCollege.candidateNum == "1"){
        $("#votedRaterOne").text(data.length);
        for (var i =0;i<data.length;i++){
            if($("#oneCandidateOne").attr("data-id") == data[i].voteCandidateResult){
                if(data[i].rater.role == "student"){
                    studentOneValue = studentOneValue + studentValue;
                }else if(data[i].rater.role == "teacher"){
                    studentOneValue = studentOneValue + teacherValue;
                }
            }
            if(data[i].voteCandidateResult == null){
                if(data[i].rater.role == "teacher"){
                    waiverData.teacher ++;
                }else if(data[i].rater.role == "student"){
                    waiverData.student ++;
                }
            }
        }
        var histogram = (studentOneValue/(rater.teacher*teacherValue+rater.student*studentValue));
        $("#oneCandidateOne .percentage").text((histogram * 100).toFixed(1) + "%");
        $("#oneCandidateOne .histogram").css("height",(histogram * 255 + 75)+"px");
        $("#oneCandidateOne .votes-num").text("同意票数："+studentOneValue);

        $("#waiverTeacherOne").text(waiverData.teacher);
        $("#waiverStudentOne").text(waiverData.student);
    }else{
        for (var i =0;i<data.length;i++){
            if($("#twoCandidateOne").attr("data-id") == data[i].voteCandidateResult){
                if(data[i].rater.role == "student"){
                    studentOneValue = studentOneValue + studentValue;
                }else if(data[i].rater.role == "teacher"){
                    studentOneValue = studentOneValue + teacherValue;
                }
            }else if($("#twoCandidateTwo").attr("data-id") == data[i].voteCandidateResult){
                if(data[i].rater.role == "student"){
                    studentTwoValue = studentTwoValue + studentValue;
                }else if(data[i].rater.role == "teacher"){
                    studentTwoValue = studentTwoValue + teacherValue;
                }
            }
            if(data[i].voteCandidateResult == null){
                if(data[i].rater.role == "teacher"){
                    waiverData.teacher ++;
                }else if(data[i].rater.role == "student"){
                    waiverData.student ++;
                }
            }
        }
        var histogramOne = (studentOneValue/(rater.teacher*teacherValue+rater.student*studentValue));
        var histogramTwo = (studentTwoValue/(rater.teacher*teacherValue+rater.student*studentValue));
        $("#twoCandidateOne .percentage").text((histogramOne * 100).toFixed(1) + "%");
        $("#twoCandidateOne .histogram").css("height",(histogramOne * 255 + 75)+"px");
        $("#twoCandidateOne .votes-num").text("同意票数："+studentOneValue);

        $("#twoCandidateTwo .percentage").text((histogramTwo * 100).toFixed(1) + "%");
        $("#twoCandidateTwo .histogram").css("height",(histogramTwo * 255 + 75)+"px");
        $("#twoCandidateTwo .votes-num").text("同意票数："+studentTwoValue);

        $("#waiverTeacher").text(waiverData.teacher);
        $("#waiverStudent").text(waiverData.student);
    }
}
/**
 * 设置页面显示
 * */
function renderStatisticsPage(data) {
    if(data.startVote){
        $(".notice").hide();
        $("#currentCollege").text(data.currentCampus.campusName+"校区  "+data.currentCollege.collegeName);
    }
    if(renderCandidateInfo(data.currentCollege.id)){
        refreshClock = window.setInterval(function () {
            getFirstCurrentData(data.currentCollege.id);
        },2000);
    }
}
/**
 * 显示竞选人信息
 * */
function renderCandidateInfo(collegeId){
    var pass = true;
    $.ajax({
        url:"/statistics/getFirstList",
        type:"get",
        dataType:"json",
        data:{
            collegeId:collegeId
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                voteList = res.data;
                if(res.data.length != voteStats.currentCollege.candidateNum){
                    pass = false;
                    systemAlert("red","出错了！该组别人数不足，请管理员添加该组别选手");
                }else{
                    if(res.data.length == 1){
                        $("#oneCandidateOne").attr("data-id",voteList[0].id);
                        $("#oneCandidateOne .candidate-name").text(voteList[0].candidateName);
                        $(".oneCandidate").show();
                        $(".twoCandidate").hide();
                    }else if(res.data.length == 2){
                        $("#twoCandidateOne").attr("data-id",voteList[0].id);
                        $("#twoCandidateOne .candidate-name").text(voteList[0].candidateName);
                        $("#twoCandidateTwo").attr("data-id",voteList[1].id);
                        $("#twoCandidateTwo .candidate-name").text(voteList[1].candidateName);
                        $(".oneCandidate").hide();
                        $(".twoCandidate").show();
                    }
                }
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            systemAlert("出错了，code："+res.status);
        }
    })
    return pass;
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