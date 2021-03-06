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

insert  into `current_vote_t`(`id`,`start_vote`,`current_college_id`,`current_field`,`start_vote_college`) values ('1',1,'4',2,1);

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

/*Table structure for table `second_data_t` */

DROP TABLE IF EXISTS `second_data_t`;

CREATE TABLE `second_data_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `pass_num` int(11) DEFAULT '0' COMMENT '第二轮通过名单',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `second_data_t` */

insert  into `second_data_t`(`id`,`pass_num`) values ('1',6);

/*Table structure for table `second_student_t` */

DROP TABLE IF EXISTS `second_student_t`;

CREATE TABLE `second_student_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `college_name` varchar(32) NOT NULL COMMENT '所在学院名',
  `candidate_name` varchar(32) NOT NULL COMMENT '竞选人姓名',
  `sicau_id` varchar(16) DEFAULT NULL COMMENT '学号',
  `voted_num` int(11) DEFAULT '0' COMMENT '得票数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `second_student_t` */

/*Table structure for table `second_vote_log_t` */

DROP TABLE IF EXISTS `second_vote_log_t`;

CREATE TABLE `second_vote_log_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `rater_id` varchar(32) NOT NULL COMMENT '投票者id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `second_vote_log_t` */

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

insert  into `user_t`(`id`,`campus`,`username`,`real_name`,`password`,`role`,`has_log`,`login_ip`,`sicau_id`,`login_browser_info`,`log_cookie_id`) values ('13059784','成都','t2','唐城','t2','teacher',0,NULL,'12516',NULL,NULL),('18313974','成都','t11','侯莉','t11','teacher',0,NULL,'12524',NULL,NULL),('19278694','成都','t4','李武生','t4','teacher',0,NULL,'10266',NULL,NULL),('21807301','成都','t9','白梅','t9','teacher',0,NULL,'11251',NULL,NULL),('29336910','成都','t12','刘思麟','t12','teacher',0,NULL,'13501',NULL,NULL),('31625610','成都','t10','陈从楷','t10','teacher',0,NULL,'13158',NULL,NULL),('33795873','成都','t3','杨志钢','t3','teacher',0,NULL,'11945',NULL,NULL),('48271286','成都','s5','徐凯琳','s5','student',0,NULL,'201706309',NULL,NULL),('50917991','成都','s10','申屠瑜程','s10','student',0,NULL,'201608162',NULL,NULL),('55152084','成都','t8','杜彬','t8','teacher',0,NULL,'11974',NULL,NULL),('57164884','成都','s6','刘晓雨','s6','student',0,NULL,'201606593',NULL,NULL),('60578176','成都','s9','郑振东','s9','student',0,NULL,'201607783',NULL,NULL),('61653863','成都','s2','周能华','s2','student',0,NULL,'201705261',NULL,NULL),('65909067','成都','s4','陈美君','s4','student',0,NULL,'201606178',NULL,NULL),('67247401','成都','s7','邱玲','s7','student',0,NULL,'201607199',NULL,NULL),('76396609','成都','t1','张强','t1','teacher',0,NULL,'11579',NULL,NULL),('80745115','成都','t5','廖鹏','t5','teacher',0,NULL,'12325',NULL,NULL),('88562445','成都','s11','孙佳倩','s11','student',0,NULL,'201602612',NULL,NULL),('89987981','成都','s8','冯涛','s8','student',0,NULL,'201607518',NULL,NULL),('92428913','成都','t6','陈中桂','t6','teacher',0,NULL,'41093',NULL,NULL),('93208499','成都','t7','李廷轩','t7','teacher',0,NULL,'10091',NULL,NULL),('95448148','成都','s3','罗丹','s3','student',0,NULL,'201605634',NULL,NULL),('98024737','成都','s1','陈美玲','s1','student',0,NULL,'20150221',NULL,NULL);

/*Table structure for table `unvoted` */

DROP TABLE IF EXISTS `unvoted`;

/*!50001 DROP VIEW IF EXISTS `unvoted` */;
/*!50001 DROP TABLE IF EXISTS `unvoted` */;

/*!50001 CREATE TABLE  `unvoted`(
 `real_name` varchar(16) NOT NULL 
)*/;

/*View structure for view unvoted */

/*!50001 DROP TABLE IF EXISTS `unvoted` */;
/*!50001 DROP VIEW IF EXISTS `unvoted` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `unvoted` AS select `user_t`.`real_name` AS `real_name` from `user_t` where (not(`user_t`.`real_name` in (select `user_t`.`real_name` from ((`rater_vote_log_t` join `user_t` on((`rater_vote_log_t`.`rater_id` = `user_t`.`id`))) join `college_t` on(((`college_t`.`id` = `rater_vote_log_t`.`vote_college_id`) and (`college_t`.`college_name` = '动物科技学院'))))))) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
