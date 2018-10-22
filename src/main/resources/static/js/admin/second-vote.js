var passNum = 0;
var voteRule = 1;
$(function () {
    init();
})
/**
 * 初始化函数
 * */
function init() {
    renderTable();
}

/**
 * 渲染表格
 * */
function renderTable(){
    layui.use('table', function(){
        var table = layui.table;

        //执行一个 table 实例
        table.render({
            elem: '#userTable'
            ,id:'userTable'
            ,height: 450
            ,url: '/vote/getSecondCurrentData' //数据接口
            ,method:'get'
            ,title: '用户表'
            ,page: false//开启分页
            ,toolbar: 'true' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            ,totalRow: false //开启合计行
            ,cols: [[ //表头
                {type: 'checkbox', fixed: 'left'}
                ,{field: 'id', title: 'ID', fixed: 'left'}
                ,{field: 'collegeName', title: '组别',fixed: 'left'}
                ,{field: 'candidateName', title: '姓名'}
                ,{field: 'sicauId', title: '学/工号'}
                ,{field: 'votedNum', title: '票数',sort: true}
                ,{fixed: 'right', title: '操作',width:180, align:'center', toolbar: '#barDemo'}
            ]]
            ,request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            }
            ,parseData: function(res){ //res 即为原始返回的数据
                passNum = res.data.passNum;
                voteRule = res.data.voteRule;
                renderRuleForm();
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.candidateList.length, //解析数据长度
                    "data": res.data.candidateList //解析数据列表
                };
            }
        });
        //监听行工具事件
        table.on('tool(userTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'detail'){
                initUserByUsername(data.username);
            } else if(layEvent === 'del'){
                layer.confirm('确定删除'+data.realName+"?", function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    console.log(data);
                    layer.close(index);
                    delUserByUsername(data.username);
                });
            }
        });
    });
}

/**
 * 渲染规则表
 * */
function renderRuleForm() {
    layui.use('form',function () {
        var form  = layui.form;
        $("input[name=voteRule][value='"+voteRule+"']").attr("checked",true);
        $("input[name=passNum]").val(passNum);
        form.render();
    })
}