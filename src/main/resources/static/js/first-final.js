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
/**
 * 渲染结果
 * */
function renderResult(data) {
    var totalSum = rater.student*1+rater.teacher*3;
    $("#passCandidateList").empty();
    // 扫描并处理结果数据
    var passData = {};
    for (j in data) {
        if(passData[data[j].collegeName] == "" || passData[data[j].collegeName] == null){
            passData[data[j].collegeName] = {
                candidateName:data[j].candidateName,
                sum:data[j].sum
            }
        }else{
            try{
                if(parseInt(passData[data[j].collegeName].sum) < parseInt(data[j].sum)){
                    passData[data[j].collegeName].sum = data[j].sum;
                }else if(parseInt(passData[data[j].collegeName].sum) == parseInt(data[j].sum)){
                    passData[data[j].collegeName].candidateName += ","+data[j].candidateName;
                }
            }catch (e) {
                console.error(e);
            }

        }
    }
    console.log(passData);
    data = passData;
    //渲染结果数据
    for(var i in data){
        // 规则一 超出50%胜出
        /*
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
        */

        // 规则二：票数高者胜出
        $("#passCandidateList").append("<div class=\"row\">\n" +
            "                <div class=\"col-md-4\">\n" +
            "                    <h3>"+data[i].candidateName+"</h3>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-4\">\n" +
            "                    <h3>"+i+"</h3>\n" +
            "                </div>\n" +
            "                <div class=\"col-md-4\">\n" +
            "                    <h3>"+data[i].sum+"票</h3>\n" +
            "                </div>\n" +
            "            </div>")
    }
}