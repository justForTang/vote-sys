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

insert  into `admin_t`(`id`,`username`,`password`) values ('cce09e5e5e1647e4be92665ced088078','beifeng','1246886075');

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

insert  into `user_t`(`id`,`campus`,`username`,`real_name`,`password`,`role`,`has_log`,`login_ip`,`sicau_id`,`login_browser_info`,`log_cookie_id`) values ('1201815728.0','雅安','201602785','林榕馨','396206','student',0,NULL,'201602785',NULL,NULL),('1668277656.0','雅安','12325','廖鹏','113732','teacher',0,NULL,'12325',NULL,NULL),('2936922444.0','雅安','13158','陈从楷','803009','teacher',0,NULL,'13158',NULL,NULL),('3076667604.0','雅安','201604131','谭周渝','631863','student',0,NULL,'201604131',NULL,NULL),('3118759681.0','雅安','11579','张强','631274','teacher',0,NULL,'11579',NULL,NULL),('3411018268.0','雅安','11974','杜彬','551478','teacher',0,NULL,'11974',NULL,NULL),('3470767260.0','雅安','10091','李廷轩','795188','teacher',0,NULL,'10091',NULL,NULL),('3665055409.0','雅安','12524','侯莉','246656','teacher',0,NULL,'12524',NULL,NULL),('5014262878.0','雅安','201604640','陈星睿','422569','student',0,NULL,'201604640',NULL,NULL),('5708936393.0','雅安','201604020','鲁芸露','884626','student',0,NULL,'201604020',NULL,NULL),('5769796088.0','雅安','201602611','伍桐','347287','student',0,NULL,'201602611',NULL,NULL),('6497261878.0','雅安','11126','江英飒','555791','teacher',0,NULL,'11126',NULL,NULL),('6517508174.0','雅安','13924','向葵','401758','teacher',0,NULL,'13924',NULL,NULL),('7008480221.0','雅安','11251','白梅','628458','teacher',0,NULL,'11251',NULL,NULL),('7160682012.0','雅安','201602050','杜沁岭','102108','student',0,NULL,'201602050',NULL,NULL),('7435409446.0','雅安','201701318','兰月','875368','student',0,NULL,'201701318',NULL,NULL),('7699864080.0','雅安','13501','刘思麟','630068','teacher',0,NULL,'13501',NULL,NULL),('7703162985.0','雅安','201604636','向欣悦','208856','student',0,NULL,'201604636',NULL,NULL),('8239672730.0','雅安','201601478','罗艳萍','292181','student',0,NULL,'201601478',NULL,NULL),('8559433464.0','雅安','201701525','杜江涛','956835','student',0,NULL,'201701525',NULL,NULL),('8608530003.0','雅安','201600329','谢沛洁','665341','student',0,NULL,'201600329',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
