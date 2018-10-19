var rater = {
    total:0,
    teacher:0,
    student:0
}
var secondFinalData;
var getVotedNumClock;
$(function () {
    getUserCount();
    $("#totalNum").text(rater.teacher);
    getVotedNumClock = window.setInterval(function () {
        getSecondVotedNum();
    },2000);
});
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
    var showColorClass = "not-through";
    $("#passCandidateList").empty();
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

}