var firstFinalData;
var rater = {
    total:21,
    teacher:10,
    student:11
}
$(function () {
    getFirstCurrentData();
})
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