var userList ;
$(function () {
   getAllUserList();
});
function getAllUserList() {
    $.ajax({
        url:"/user/getAllUserList",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
               userList = res.data;
                renderUserTable(res.data);
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
function renderUserTable(data) {
   $("#userContainer").empty();
   for (var i=0;i<data.length;i++){
      $("#userContainer").append("<tr>\n" +
          "                                                <td>"+data[i].username+"</td>\n" +
          "                                                <td>"+data[i].password+"</td>\n" +
          "                                                <td>"+data[i].realName+"</td>\n" +
          "                                                <td>"+data[i].role+"</td>\n" +
          "                                                <td>"+data[i].hasLog+"</td>\n" +
          "                                                <td>"+data[i].sicauId+"</td>\n" +
          "                                                <td>\n" +
          "                                                    <button class=\"btn btn-warning btn-xs\" onclick=\"initUser("+i+")\">初始化</button>\n" +
          "                                                    <button class=\"btn btn-danger btn-xs\" onclick=\"delUser("+i+")\">删除</button>\n" +
          "                                                </td>\n" +
          "                                            </tr>")
   }
}

function addUser() {
    alert("该功能尚未开发完成");
}
function delUser(num) {
   systemConfirm("是否确认删除该用户？",function () {
       $.ajax({
           url:"/user/updateUserLogStats",
           type:"post",
           dataType:"json",
           data:{
               username:userList[num].username
           },
           async:false,
           success:function (res) {
               console.log(res);
               if(res.code == 100001){
                   location.href = "/login.html";
               }else if(res.code == 0){
                   systemAlert("red","删除用户成功！",function () {
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
   })
}
function initAllUser() {
    $.ajax({
        url:"/user/updateAllUserLogStats",
        type:"get",
        dataType:"json",
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("red","初始化成功！",function () {
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
function initUser(num) {
    $.ajax({
        url:"/user/updateUserLogStats",
        type:"post",
        dataType:"json",
        data:{
           username:userList[num].username
        },
        async:false,
        success:function (res) {
            console.log(res);
            if(res.code == 100001){
                location.href = "/login.html";
            }else if(res.code == 0){
                systemAlert("red","初始化成功！",function () {
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
function delUser(num) {

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