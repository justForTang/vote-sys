var rater = {
    total:0,
    teacher:0,
    student:0
}
var secondFinalData;
var getVotedNumClock;
var secondData;
$(function () {
    getSysConf();
    getSecondData();
    getUserCount();
    getVotedNumClock = window.setInterval(function () {
        getSecondVotedNum();
    },2000);
});
/**
 * 获取第二轮配置数据
 * */
function getSecondData(){
    $.ajax({
        url:"/vote/getSecondData",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                secondData = res.data ;
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
 * 获取当前投票总人数
 * */
function getSecondVotedNum() {
    $.ajax({
        url:"/vote/getSecondVotedNum",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                $("#votedNum").text(res.data);
                checkSecondVote(res);
            }else{
                alert(res.msg+",code："+res.code);
                window.clearInterval(getVotedNumClock);
            }
        },
        error:function (res) {
            console.log(res.status);
            window.clearInterval(getVotedNumClock);
        }
    })
}
/**
 * 检查第二轮投票规则及已投人数
 * */
function checkSecondVote(res){
    switch (secondData.voteRule) {
        case 1:
            $("#totalNum").text(rater.total);
            if(res.data == rater.total){
                window.clearInterval(getVotedNumClock);
                $(".loading-container").hide();
                // $("body,html").css("overflow","auto");
                $(".show-container").css({
                    "transform":"scale(1, 1)",
                    "filter":"blur(0)"
                });
                getSecondCurrentData();
            }
            break;
        case 2:
            $("#totalNum").text(rater.teacher);
            if(res.data == rater.teacher){
                window.clearInterval(getVotedNumClock);
                $(".loading-container").hide();
                // $("body,html").css("overflow","auto");
                $(".show-container").css({
                    "transform":"scale(1, 1)",
                    "filter":"blur(0)"
                });
                getSecondCurrentData();
            }
            break;
        case 3:
            $("#totalNum").text(rater.student);
            if(res.data == rater.student){
                window.clearInterval(getVotedNumClock);
                $(".loading-container").hide();
                // $("body,html").css("overflow","auto");
                // 先渲染页面再显示动画
                getSecondCurrentData();
                $(".show-container").css({
                    "transform":"scale(1, 1)",
                    "filter":"blur(0)"
                });
            }
            break;
    }
}
/**
 * 获取投票数据
 * */
function getSecondCurrentData(){
    $.ajax({
        url:"/vote/getSecondCurrentData",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                secondFinalData = res.data;
                renderResult(res.data);
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
 * 渲染第二轮投票
 * */
function renderResult(data) {
    $("#secondChooseTotal").text(data.passNum);
    switch (secondData.showType) {
        case 1:// 一页显示
            var showColorClass = "not-through";
            $("#passCandidateListOne").empty();
            $("#passCandidateListTwo").empty();
            for (var i = 0; i < data.candidateList.length; i++) {
                if((i+1)>data.passNum){
                    showColorClass = "not-through";
                }else{
                    showColorClass = "through";
                }
                if(i <= 11){
                    $("#passCandidateListOne").append("<div class='row "+showColorClass+"'>\n" +
                        "                <div class=\"col-md-4\">\n" +
                        "                    <h3>"+data.candidateList[i].candidateName+"</h3>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-md-4\">\n" +
                        "                    <h3>"+data.candidateList[i].collegeName+"</h3>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-md-4\">\n" +
                        "                    <h3>"+data.candidateList[i].votedNum+"票</h3>\n" +
                        "                </div>\n" +
                        "            </div>")
                }else{
                    $("#passCandidateListTwo").append("<div class='row "+showColorClass+"'>\n" +
                        "                <div class=\"col-md-4\">\n" +
                        "                    <h3>"+data.candidateList[i].candidateName+"</h3>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-md-4\">\n" +
                        "                    <h3>"+data.candidateList[i].collegeName+"</h3>\n" +
                        "                </div>\n" +
                        "                <div class=\"col-md-4\">\n" +
                        "                    <h3>"+data.candidateList[i].votedNum+"票</h3>\n" +
                        "                </div>\n" +
                        "            </div>")
                }
            }
            break;
        case 2:// 长页显示
            $("#passCandidateList").empty();
            for (var i = 0; i < data.candidateList.length; i++) {
                $("#passCandidateList").append("<div class='row "+showColorClass+"'>\n" +
                    "                <div class=\"col-md-4\">\n" +
                    "                    <h3>"+data.candidateList[i].candidateName+"</h3>\n" +
                    "                </div>\n" +
                    "                <div class=\"col-md-4\">\n" +
                    "                    <h3>"+data.candidateList[i].collegeName+"</h3>\n" +
                    "                </div>\n" +
                    "                <div class=\"col-md-4\">\n" +
                    "                    <h3>"+data.candidateList[i].votedNum+"票</h3>\n" +
                    "                </div>\n" +
                    "            </div>")
            }

            break
    }




}