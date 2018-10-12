# vote-sys
川农优标答辩投票系统
# 背景
四川农业大学2017-2018学年优标答辩投票系统
# 说明
该系统因时间原因部分功能未完成，但大部分功能能够使用，不影响系统正常运行。在后期会对其进行重构。系统角色分为评委和管理员，评委操作界面为手机端，管理员操作界面为PC端。
# 部分截图
![
https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012194946.jpg?x-oss-process=style/0.60](
https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012194946.jpg?x-oss-process=style/0.60)

登录页
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195602.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195602.jpg?x-oss-process=style/0.60)

系统管理页
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195725.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195725.jpg?x-oss-process=style/0.60)

第一轮实时投票情况
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195832.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195832.jpg?x-oss-process=style/0.60)

第一轮最终结果榜
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195950.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012195950.jpg?x-oss-process=style/0.60)

第二轮投票等待
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012200055.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012200055.jpg?x-oss-process=style/0.60)

第二轮投票结果榜
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012200341.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012200341.jpg?x-oss-process=style/0.60)

评委等待投票
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012200610.jpg?x-oss-process=style/0.60](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/QQ%E6%88%AA%E5%9B%BE20181012200610.jpg?x-oss-process=style/0.60)

评委进行第二轮投票
# 操作说明
## 管理员
管理员具有管理用户、管理系统（负责系统开关）、查看投票结果、查看投票记录等功能
## 评委
评委分为老师评委和学生评委。第一轮老师评委和学生评委均可投票，老师一票计三票，学生投一票计一票。第二轮仅老师评委可投票。
# 技术说明
## 后台（java）
springboot + mybatis + mysql
## 前端
bootstrap + jQuery

前后台分离开发，后台提供服务API，前端通过AJAX请求数据。
