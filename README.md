# vote-system
一个川农定制的投票系统，适用于四川农业大学优标答辩、学院答辩、才艺大赛等投票使用。
# 开发背景
## V 1.0
用于四川农业大学2017-2018学年优秀学生标兵答辩投票
> * 评委为老师和学生两种角色
> * 学生一票分值为1，老师一票分值为3
> * 第一轮学生、老师均可参与，第二轮仅老师参与投票
> * 第一轮分数超出50%胜出，第二轮票数高者胜出

因为是本人临时为此次答辩开发的投票系统，开发时间也仅为3天，所以很多设计上不够好，功能也不够完善，系统耦合性较高，不适于拓展。
## V 1.1
用于四川农业大学信息工程学院第四届才艺大赛投票
> * 评委为老师和学生两种角色
> * 学生一票分值为1，老师一票分值为3
> * 第一轮和第二轮学生、老师均可参与
> * 第二轮和第二轮均是票数高者胜出

因为此次投票规则和前一次优标答辩较为类似，但有些规则、主题上有所变动，于是在V1.0的基础上对系统前端进行重构，后台代码进行优化，功能进行拓展。因为仍然是基于前一次设计进行改造，所以部分耦合度仍较高，有一定拓展性但仍不够好。

# 关于系统
* 前端：(html css js) + jQuery + BootStrap + layui
* 后台：(java) + Springboot + Mybatis + druid + mysql

# 部分截图
![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185632.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185632.jpg)


![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/20181022184228.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/20181022184228.jpg)


![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184444.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184444.jpg)


![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184521.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184521.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184618.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184618.jpg)


![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184652.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184652.jpg)


![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184721.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184721.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184741.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184741.jpg)


![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184909.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184909.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184945.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022184945.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185132.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185132.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185312.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185312.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185403.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185403.jpg)

![https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185451.jpg](https://vr360-beifengtz.oss-cn-beijing.aliyuncs.com/github/vote-sys/perform-vote/QQ%E6%88%AA%E5%9B%BE20181022185451.jpg)
