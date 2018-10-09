/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.20-log : Database - sicau_vote_sys
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sicau_vote_sys` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `sicau_vote_sys`;

/*Table structure for table `admin_t` */

DROP TABLE IF EXISTS `admin_t`;

CREATE TABLE `admin_t` (
  `id` varchar(32) NOT NULL COMMENT '管理员id',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `admin_t` */

insert  into `admin_t`(`id`,`username`,`password`) values ('cce09e5e5e1647e4be92665ced088078','sicauvote','123456');

/*Table structure for table `campus_t` */

DROP TABLE IF EXISTS `campus_t`;

CREATE TABLE `campus_t` (
  `id` varchar(32) NOT NULL COMMENT '校区id',
  `campus_name` varchar(16) NOT NULL COMMENT '校区名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `campus_t` */

insert  into `campus_t`(`id`,`campus_name`) values ('1','雅安'),('2','成都'),('3','都江堰');

/*Table structure for table `candidate_t` */

DROP TABLE IF EXISTS `candidate_t`;

CREATE TABLE `candidate_t` (
  `id` varchar(32) NOT NULL COMMENT '答辩人id',
  `college_id` varchar(32) NOT NULL COMMENT '学院id',
  `candidate_name` varchar(32) NOT NULL COMMENT '竞选人姓名',
  `candidate_number` varchar(32) DEFAULT NULL COMMENT '竞选人学号',
  PRIMARY KEY (`id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `candidate_t_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college_t` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `candidate_t` */

insert  into `candidate_t`(`id`,`college_id`,`candidate_name`,`candidate_number`) values ('1','1','杜菲',NULL),('10','5','夏振华',NULL),('11','6','杨曼路',NULL),('12','6','张椿丹',NULL),('13','7','邵慧娟',NULL),('14','7','陈颐萱',NULL),('15','8','伍晓轩',NULL),('16','8','赵思华',NULL),('17','9','何颖',NULL),('18','10','张钦然',NULL),('19','10','郭鹏',NULL),('2','1','刘婷',NULL),('20','11','邓钤文',NULL),('21','11','周树超',NULL),('22','12','王敏',NULL),('23','12','朱思洁',NULL),('24','13','胡紫君',NULL),('25','13','蒋沁沂',NULL),('26','14','包宏伟',NULL),('27','14','沙依兰',NULL),('28','15','陈梦莹',NULL),('29','15','陈妮帆',NULL),('3','2','李丹钦',NULL),('30','16','曹洪芙',NULL),('31','16','邹倩',NULL),('32','17','贺鹏光',NULL),('33','17','刘德嘉',NULL),('34','18','杨春森',NULL),('35','19','劳一柯',NULL),('36','19','饶晓洁',NULL),('37','20','李青松',NULL),('38','20','杨国舒',NULL),('4','2','杜江南',NULL),('5','3','欧阳慕莹',NULL),('6','3','徐连',NULL),('7','4','童杉杉',NULL),('8','4','陈志琴',NULL),('9','5','邓乔予',NULL);

/*Table structure for table `college_t` */

DROP TABLE IF EXISTS `college_t`;

CREATE TABLE `college_t` (
  `id` varchar(32) NOT NULL COMMENT '学院id',
  `campus_id` varchar(32) NOT NULL COMMENT '校区id',
  `college_name` varchar(32) NOT NULL COMMENT '学院名称',
  `candidate_num` int(12) NOT NULL COMMENT '当前学院竞选人数',
  PRIMARY KEY (`id`),
  KEY `campus_id` (`campus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `college_t` */

insert  into `college_t`(`id`,`campus_id`,`college_name`,`candidate_num`) values ('1','2','动物科技学院',2),('10','2','资源学院',2),('11','1','法学院',2),('12','1','机电学院',2),('13','1','理学院',2),('14','1','人文学院',2),('15','1','生命科学学院',2),('16','1','食品学院',2),('17','1','水利水电学院',2),('18','1','体育学院',1),('19','1','信息工程学院',2),('2','2','动物医学院',2),('20','1','艺术与传媒学院',2),('3','2','风景园林学院',2),('4','2','管理学院',2),('5','2','环境学院',2),('6','2','经济学院',2),('7','2','林学院',2),('8','2','农学院',2),('9','2','园艺学院',1);

/*Table structure for table `current_vote_t` */

DROP TABLE IF EXISTS `current_vote_t`;

CREATE TABLE `current_vote_t` (
  `id` varchar(32) NOT NULL COMMENT '当前管理表id',
  `start_vote` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否开始投票',
  `current_college_id` varchar(32) DEFAULT NULL COMMENT '当前投票学院id',
  `current_field` int(2) DEFAULT '1' COMMENT '当前投票场次',
  `start_vote_college` tinyint(1) DEFAULT '0' COMMENT '是否开启学院投票',
  PRIMARY KEY (`id`),
  KEY `current_college_id` (`current_college_id`),
  CONSTRAINT `current_vote_t_ibfk_1` FOREIGN KEY (`current_college_id`) REFERENCES `college_t` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `current_vote_t` */

insert  into `current_vote_t`(`id`,`start_vote`,`current_college_id`,`current_field`,`start_vote_college`) values ('1',0,'1',1,0);

/*Table structure for table `log_t` */

DROP TABLE IF EXISTS `log_t`;

CREATE TABLE `log_t` (
  `id` varchar(32) NOT NULL COMMENT '日志id',
  `user_id` varchar(32) NOT NULL COMMENT '用户id，外键',
  `log_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '记录时间,默认当前时间',
  `log_ip` varchar(32) DEFAULT NULL COMMENT '操作ip',
  `log_action` varchar(200) DEFAULT NULL COMMENT '操作内容',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `log_t_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `log_t` */

/*Table structure for table `rater_vote_log_t` */

DROP TABLE IF EXISTS `rater_vote_log_t`;

CREATE TABLE `rater_vote_log_t` (
  `id` varchar(32) NOT NULL COMMENT '评委投票记录id',
  `rater_id` varchar(32) NOT NULL COMMENT '投票人，对应user_t表',
  `vote_college_id` varchar(32) DEFAULT NULL COMMENT '投票学院，即场次，第二轮可为null',
  `vote_candidate_result` varchar(32) DEFAULT NULL COMMENT '所投结果,对应candidate_t的id，为null则表示弃权',
  `vote_field` int(2) DEFAULT NULL COMMENT '投票轮次，1为第一轮，2为第二轮',
  `vote_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '投票时间',
  PRIMARY KEY (`id`),
  KEY `rater_id` (`rater_id`),
  KEY `vote_college_id` (`vote_college_id`),
  KEY `vote_candidate_result` (`vote_candidate_result`),
  CONSTRAINT `rater_vote_log_t_ibfk_1` FOREIGN KEY (`rater_id`) REFERENCES `user_t` (`id`),
  CONSTRAINT `rater_vote_log_t_ibfk_2` FOREIGN KEY (`vote_college_id`) REFERENCES `college_t` (`id`),
  CONSTRAINT `rater_vote_log_t_ibfk_3` FOREIGN KEY (`vote_candidate_result`) REFERENCES `candidate_t` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `rater_vote_log_t` */

/*Table structure for table `user_t` */

DROP TABLE IF EXISTS `user_t`;

CREATE TABLE `user_t` (
  `id` varchar(32) NOT NULL COMMENT '用户id，唯一识别标识',
  `campus` varchar(10) DEFAULT NULL COMMENT '校区',
  `username` varchar(16) NOT NULL COMMENT '用户名',
  `real_name` varchar(16) NOT NULL COMMENT '真实姓名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `role` varchar(16) DEFAULT NULL COMMENT '角色',
  `has_log` tinyint(1) DEFAULT '0' COMMENT '是否登录过',
  `login_ip` varchar(64) DEFAULT NULL COMMENT '登录ip',
  `sicau_id` varchar(16) DEFAULT NULL COMMENT '学号或工号',
  `login_browser_info` varchar(200) DEFAULT NULL COMMENT '首次登录设备信息',
  `log_cookie_id` varchar(64) DEFAULT NULL COMMENT 'cookie验证id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_t` */

insert  into `user_t`(`id`,`campus`,`username`,`real_name`,`password`,`role`,`has_log`,`login_ip`,`sicau_id`,`login_browser_info`,`log_cookie_id`) values ('035bb2917ea64c99bca7accffe2fa0f2','成都','teacher6','李六','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('0bf21371f4fe48fa989d16fe1573e0d7','成都','teacher9','李九','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('0feadc7bd32343499bccde1d3d7fa4de','雅安','student1','张一','123456','student',1,'0:0:0:0:0:0:0:1',NULL,NULL,'ab4d9bdd068f4d76bc8c94669cbc9dd2'),('1','雅安','student5','田智','123456','student',1,'0:0:0:0:0:0:0:1','201603959',NULL,'5163b8f0bd54474cb7393983770b035a'),('1ccd60267b0b40ecb49a222b6fdf3fd7','雅安','student4','张四','123456','student',0,'0:0:0:0:0:0:0:1',NULL,NULL,'e1d3fd3201d04b2b9e1c8f3276395ab5'),('2',NULL,'student6','jjjjj','123456','student',0,NULL,NULL,NULL,NULL),('3','雅安','student7','kkkk5','123456','student',0,NULL,NULL,NULL,NULL),('369c9a7fbae64c729d4d3dd7ef0cc73b','成都','student3','张三','123456','student',0,'0:0:0:0:0:0:0:1',NULL,NULL,'61b8d250c67f43cfade3ced86941c64e'),('3a43516931b04dafbef824c36e49251f','雅安','teacher4','李四','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('4','雅安','student8','kkk5k','123456','student',0,NULL,NULL,NULL,NULL),('4006796205ac44968402f383dd86f17d','雅安','teacher8','李八','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('5','雅安','student9','kkkk5','123456','student',0,NULL,NULL,NULL,NULL),('51a83f03e09c49dcb810df6100826c2e','雅安','student2','张二','123456','student',1,'0:0:0:0:0:0:0:1',NULL,NULL,'41029e789c8b48289745fa868e044500'),('6','雅安','student10','kkkk7','123456','student',0,NULL,NULL,NULL,NULL),('7','雅安','student11','kkkk4','123456','student',0,NULL,NULL,NULL,NULL),('7f7443590ee24dcdad25cd8482ddb3a7','成都','teacher1','李一','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'173339aad3374d439678ee1df05ef804'),('968f40e12d134d3cbf13e8fad82ea4e7','成都','teacher5','李五','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('b079babe414d4394b805d56a4314f11e','成都','teacher2','李二','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('bc3b6e11b6774cedacc5b7d72e56c70f','雅安','teacher7','李七','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'a6c7d494e27140afb3b22762b001dece'),('c11338c36af54637b2431c30c0717d9f','雅安','teacher3','李三','123456','teacher',0,'0:0:0:0:0:0:0:1',NULL,NULL,'81456c3cba1f4607a86535c568d1d5ef');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
