var voteList = [];
var voteStats = {};
var secondVoteData;
$(function () {
    getSysConf();
    var urlData = getRequest();
    if(urlData.uid == null || urlData.realName == null || urlData.role == null){
        // location.href = "login.html"
    }else{
        // checkLogStats();
        checkVoteStats();
        if(urlData.role == "teacher"){
            $("#realName").text(urlData.realName+"老师");
        }else{
            $("#realName").text(urlData.realName+"同学");
        }
    }
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
                $("title").text("投票——"+res.data.singleTitle);
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
 * refreshPage 刷新页面
 * */
function refreshPage(){
    location.reload();
}
/**
 * 检查投票状态
 * */
function checkVoteStats() {
    $.ajax({
        url:"/vote/stats",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "login.html";
            }else if(res.code == 0){
                voteStats = res.data;
                renderVotePage(res.data);
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
 * 渲染页面
 * */
function renderVotePage(data){
    // 开启投票系统
    if(data.startVote){
        $(".vote-msg").hide();
        $('.waite-msg').hide();
        $(".vote-box").show();
    }else{
        $(".vote-msg").show();
        $('.waite-msg').hide();
        $(".vote-box").hide();
    }
    // 第一轮
    if(data.currentField == 1){
        if(data.startVoteCollege){
            $(".college-msg").hide();
            $(".waite-msg").hide();
            $("#voteMsg").text(data.currentCampus.campusName+" | "+data.currentCollege.collegeName+"（第一轮）");
            var hasVoted = checkHasVoted(getRequest().uid,data.currentField,data.currentCollege.id);
            if(hasVoted){
                $('.waite-msg').show();
            }else{
                $("#firstVote").show();
                renderFirstVoteForm(data.currentCollege.id);
            }
        }else{
            $("#voteMsg").text(data.currentCampus.campusName+" | "+data.currentCollege.collegeName+"（第一轮）");
            $(".college-msg").show();
            $('.waite-msg').hide();
            $("#firstVote").hide();
            $("#secondVote").hide();
        }
    }else{// 第二轮
        $("#voteMsg").text("川农优标遴选投票（第二轮）");
        $("#secondVote").show();
        $(".msg-box").hide();
        showSecondVote();
    }
}
/**
 * 显示第二轮投票
 * */
function showSecondVote() {
    $.ajax({
        url:"/vote/getSecondVoteData",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "login.html";
            }else if(res.code == 0){
                secondVoteData = res.data;
                renderSecondList(secondVoteData);
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("出错了，code："+res.status);
        }
    })
    $("input[name='voteSecond']").click(function () {
        var secondFormData = $("#secondForm").serializeJson();
        if(secondFormData.voteSecond == null){
            $("#secondChooseNum").text(0);
        }else{
            if(typeof(secondFormData.voteSecond) == "string"){
                $("#secondChooseNum").text(1);
            }else{
                $("#secondChooseNum").text(secondFormData.voteSecond.length);
            }
        }
        if(secondFormData.voteSecond.length >= secondVoteData.passNum){
            for(var i=0;i<$("input[type='checkbox']").length;i++){
                if(!$("input[type='checkbox']")[i].checked){
                    $("input[type='checkbox']")[i].disabled=true;
                }
            }
        }else{
            for(var i=0;i<$("input[type='checkbox']").length;i++){
                $("input[type='checkbox']")[i].disabled=false;
            }
        }
    });
}
/**
 * 渲染第二轮投票
 * */
function renderSecondList(data) {
    $("#secondChooseTotal").text(data.passNum);
    $("#secondFormContainer").empty();
    for (var i = 0; i < data.candidateList.length; i++) {
        $("#secondFormContainer").append("<div class=\"col-xs-12 check-container\">\n" +
            "                                "+data.candidateList[i].collegeName+"&nbsp;"+data.candidateList[i].candidateName+"\n" +
            "                                <label style=\"float: right;margin: 0;\">\n" +
            "                                    <input type=\"checkbox\" name=\"voteSecond\" value='"+data.candidateList[i].id+"' class=\"a-checkbox\">\n" +
            "                                    <span class=\"b-checkbox\"></span>\n" +
            "                                </label>\n" +
            "                            </div>");
    }
}
/**
 * renderFirstVoteForm 渲染第一轮投票
 * */
function renderFirstVoteForm(collegeId){
    $.ajax({
        url:"/vote/getFirstList",
        type:"get",
        dataType:"json",
        data:{
            collegeId:collegeId
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "login.html";
            }else if(res.code == 0){
                voteList = res.data;
                if(res.data.length == 1){
                    $("#one_studentOne").html("<input type=\"radio\" name=\"vote\" value="+voteList[0].id+" class=\"a-radio\">\n" +
                        " <span class=\"b-radio\"></span><span class=\"student-name\">"+voteList[0].candidateName+"</span>")
                    $(".oneCandidate").show();
                    $(".twoCandidate").hide();
                }else{
                    $("#two_studentOne").html("<input type=\"radio\" name=\"vote\" value="+voteList[0].id+" class=\"a-radio\">\n" +
                        " <span class=\"b-radio\"></span><span class=\"student-name\">"+voteList[0].candidateName+"</span>")
                    $("#two_studentTwo").html("<input type=\"radio\" name=\"vote\" value="+voteList[1].id+" class=\"a-radio\">\n" +
                        " <span class=\"b-radio\"></span><span class=\"student-name\">"+voteList[1].candidateName+"</span>")
                    $(".oneCandidate").hide();
                    $(".twoCandidate").show();
                }
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            console.log(res.status);
            systemAlert("出错了，code："+res.status);
        }
    })
}

/**
 * 退出登录
 * */
function logOut(){
    systemConfirm("是否确认退出登录？",function () {
        $.ajax({
            url:"/user/logout",
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
        location.href = "login.html";
    })
}
/**
 * 检查表单
 * */
function checkForm() {
    var formData = $("#voteForm").serializeJson();
    if(formData.vote==null){
        autoCloseAlert("red","请勾选投票选项",3000);
    }else{
        var msg = "您的投票结果是：<span style='color: red'><b>"+getCandidateNameById(formData.vote)+"</b></span>，是否确定提交？";
        systemConfirm(msg,function () {
            uploadVoteResult(formData.vote);
        })
    }
}
/**
 * 上传第二轮表单
 * */
function updateSecondForm() {
    if(voteStats.startVoteCollege){
        systemConfirm("提交后不可修改，是否确认提交？",function () {
            $.ajax({
                url:"/vote/uploadSecondVoteData",
                type:"post",
                dataType:"json",
                data:{
                    raterId:getRequest().uid,
                    candidateIdList:$("#secondForm").serializeJson().voteSecond.toString()
                },
                async:false,
                success:function (res) {
                    console.log(res);
                    if(res.code == 100001){
                        location.href = "login.html";
                    }else if(res.code == 0){
                        systemAlert("green","投票成功！",function () {
                            location.reload();
                        });
                    }else if(res.code == 100003){
                        systemAlert("red","您已投票，不可重复操作！");
                    }else if(res.code == 100002){
                        systemAlert("red","权限不足，您无法参与该轮投票！");
                    }else{
                        systemAlert("red",res.msg+",code："+res.code);
                    }
                },
                error:function (res) {
                    console.log(res.status);
                    systemAlert("出错了，code："+res.status);
                }
            })
        })
    }else{
        systemAlert("red","投票暂未开始，请耐心等待！",function () {
            location.reload();
        });
    }

}
/**
 *
 * */
function getCandidateNameById(id){
    if(id == "waiver"){
        return "弃权";
    }else{
        for (var candidate in voteList) {
            if(voteList[candidate].id == id){
                return voteList[candidate].candidateName;
            }
        }
    }
    return null;
}
/**
 * 上传投票结果
 * */
function uploadVoteResult(voteResult) {
    $.ajax({
        url:"/vote/uploadResult",
        type:"post",
        dataType:"json",
        data:{
            voteCandidateResult:voteResult,
            currentCollegeId:voteStats.currentCollege.id,
            voteField:voteStats.currentField
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                systemAlert("green","你的登录已失效，请重新登录后操作",function () {
                    location.href = "login.html";
                })
            }else if(res.code == 0){
                $(".waite-msg").show();
                $("#firstVote").hide();
                systemAlert("green","投票已成功！");
            } else if(res.code == 100003){
                systemAlert("red","投票失败！您已投票，不可重复投票。");
            }else{
                systemAlert("red",res.msg+",code："+res.code);
            }
        },
        error:function (res) {
            systemAlert('red',"出错啦，code："+res.status);
        }
    });
}
/**
 * showRule 显示投票规则
 * */
function showRule(){
    window.open("http://xsc.sicau.edu.cn/Web/ShowInfo-LJw34Jmu~aacgacac~M3~biga.html");
}
/**
 * 检查登录状态
 * */
function checkLogStats(){
    $.ajax({
        url:"/user/check",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code != 0){
                var msg = res.msg + ",请重新登录。code："+res.code;
                systemAlert('red',msg,function () {
                    location.href = "login.html";
                });
            }
        },
        error:function (res) {
            systemAlert('red',"出错啦，code："+res.status);
        }
   });
}
/**
 * 检查投票状态
 * */
function checkHasVoted(raterId,voteField,currentCollegeId){
    var hasVoted = false;
    $.ajax({
        url:"/vote/checkHasVoted",
        type:"post",
        dataType:"json",
        data:{
            raterId:raterId,
            voteField:voteField,
            currentCollegeId:currentCollegeId
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "login.html";
            }else if(res.code == 0){
                if(res.data) {
                    hasVoted=true;
                }else{
                    hasVoted=false
                }
            }else{

            }
        },
        error:function (res) {
            systemAlert('red',"出错啦，code："+res.status);
            hasVoted = null;
        }
    });
    return hasVoted;
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
    /**
     *  序列化表单，将其转化为json格式
     * */
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
/**
 * 获取url参数
 * */
function getRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
