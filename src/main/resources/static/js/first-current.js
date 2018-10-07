var voteStats = {};
var teacherValue = 3;
var studentValue = 1;
var studentOneValue = 0;
var studentTwoValue = 0;
var rater = {
    total:15,
    teacher:10,
    student:5
}
$(function () {
    getVoteStats();
})
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
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
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
    if(voteStats.currentCollege.candidateNum == "1"){
        for (var i =0;i<data.length;i++){
            if($("#oneCandidateOne").attr("data-id") == data[i].voteCandidateResult){
                if(data[i].rater.role == "student"){
                    studentOneValue = studentOneValue + studentValue;
                }else if(data[i].rater.role == "teacher"){
                    studentOneValue = studentOneValue + teacherValue;
                }
            }
        }
        var histogram = (studentOneValue/rater.teacher*teacherValue+rater.student*studentValue).toFixed(4);
        $("#oneCandidateOne .percentage").text(histogram * 100 + "%");
        $("#oneCandidateOne .histogram").css("height",(histogram * 255 + 75)+"px");
        $("#oneCandidateOne .votes-num").text("得票："+studentOneValue);
        console.log(histogram);
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
                    studentTwoValue = studentOneValue + studentValue;
                }else if(data[i].rater.role == "teacher"){
                    studentTwoValue = studentOneValue + teacherValue;
                }
            }
            var histogramOne = (studentOneValue/(rater.teacher*teacherValue+rater.student*studentValue)).toFixed(4);
            var histogramTwo = (studentTwoValue/(rater.teacher*teacherValue+rater.student*studentValue)).toFixed(4);
            $("#twoCandidateOne .percentage").text(histogramOne * 100 + "%");
            $("#twoCandidateOne .histogram").css("height",(histogramOne * 255 + 75)+"px");
            $("#twoCandidateOne .votes-num").text("得票："+studentOneValue);

            $("#twoCandidateTwo .percentage").text(histogramTwo * 100 + "%");
            $("#twoCandidateTwo .histogram").css("height",(histogramTwo * 255 + 75)+"px");
            $("#twoCandidateTwo .votes-num").text("得票："+studentTwoValue);
            console.log(histogramOne);
            console.log(histogramTwo);
        }
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
    if(data.startVoteCollege){
        renderCandidateInfo(data.currentCollege.id);
        setInterval(function () {
            getFirstCurrentData(data.currentCollege.id);
        },2000);
    }
}
/**
 * 显示竞选人信息
 * */
function renderCandidateInfo(collegeId){
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
                if(res.data.length == 1){
                    $("#oneCandidateOne").attr("data-id",voteList[0].id);
                    $("#oneCandidateOne .candidate-name").text(voteList[0].candidateName);
                    $(".oneCandidate").show();
                    $(".twoCandidate").hide();
                }else{
                    $("#twoCandidateOne").attr("data-id",voteList[0].id);
                    $("#twoCandidateOne .candidate-name").text(voteList[0].candidateName);
                    $("#twoCandidateTwo").attr("data-id",voteList[1].id);
                    $("#twoCandidateTwo .candidate-name").text(voteList[1].candidateName);
                    $(".oneCandidate").hide();
                    $(".twoCandidate").show();
                }
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            systemAlert("出错了，code："+res.status);
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