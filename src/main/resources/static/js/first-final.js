var firstFinalData;
var rater = {
    total:0,
    teacher:0,
    student:0
}
$(function () {
    getSysConf();
    getUserCount();
    getFirstCurrentData();
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
 * 获取投票数据
 * */
function getFirstCurrentData(){
    $.ajax({
        url:"/vote/getFirstVoteResult",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 0){
                firstFinalData = res.data;
                $("#votedRater").text(res.data.length);
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
function renderResult(data) {
    var totalSum = rater.student*1+rater.teacher*3;
    $("#passCandidateList").empty();
    for(var i=0;i<data.length;i++){
        if(data[i].sum >= totalSum* 0.5 ){
            $("#passCandidateList").append("<div class=\"row\">\n" +
                "                <div class=\"col-md-4\">\n" +
                "                    <h3>"+data[i].candidateName+"</h3>\n" +
                "                </div>\n" +
                "                <div class=\"col-md-4\">\n" +
                "                    <h3>"+data[i].collegeName+"</h3>\n" +
                "                </div>\n" +
                "                <div class=\"col-md-4\">\n" +
                "                    <h3>"+data[i].sum+"票</h3>\n" +
                "                </div>\n" +
                "            </div>")
        }
    }
}