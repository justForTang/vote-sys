-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: localhost    Database: sicau_vote_sys
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_t`
--

DROP TABLE IF EXISTS `admin_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_t` (
  `id` varchar(32) NOT NULL COMMENT '管理员id',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_t`
--

LOCK TABLES `admin_t` WRITE;
/*!40000 ALTER TABLE `admin_t` DISABLE KEYS */;
INSERT INTO `admin_t` VALUES ('cce09e5e5e1647e4be92665ced088078','beifeng','1246886075');
/*!40000 ALTER TABLE `admin_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_t`
--

DROP TABLE IF EXISTS `campus_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_t` (
  `id` varchar(32) NOT NULL COMMENT '校区id',
  `campus_name` varchar(16) NOT NULL COMMENT '校区名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_t`
--

LOCK TABLES `campus_t` WRITE;
/*!40000 ALTER TABLE `campus_t` DISABLE KEYS */;
INSERT INTO `campus_t` VALUES ('1','雅安'),('2','成都'),('3','都江堰');
/*!40000 ALTER TABLE `campus_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_t`
--

DROP TABLE IF EXISTS `candidate_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate_t` (
  `id` varchar(32) NOT NULL COMMENT '答辩人id',
  `college_id` varchar(32) NOT NULL COMMENT '学院id',
  `candidate_name` varchar(32) NOT NULL COMMENT '竞选人姓名',
  `candidate_number` varchar(32) DEFAULT NULL COMMENT '竞选人学号',
  PRIMARY KEY (`id`),
  KEY `candidate_t_ibfk_1` (`college_id`),
  CONSTRAINT `candidate_t_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college_t` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_t`
--

LOCK TABLES `candidate_t` WRITE;
/*!40000 ALTER TABLE `candidate_t` DISABLE KEYS */;
INSERT INTO `candidate_t` VALUES ('59154e85b5b9475ea3f700d39f780b9b','03156c84fff540f0ab5b1464415c8476','田智',NULL),('6fa8375f5a444c019d99d85808caaac5','03156c84fff540f0ab5b1464415c8476','王明亮',NULL),('cc31533034724021bbccd4346e6d9e1e','ceff4eedaf1d4a1997c84f934e4194de','五三',NULL),('e674d49dcfa94f3db2a9a4b20eb32cc3','ceff4eedaf1d4a1997c84f934e4194de','丝丽雅',NULL);
/*!40000 ALTER TABLE `candidate_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `college_t`
--

DROP TABLE IF EXISTS `college_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `college_t` (
  `id` varchar(32) NOT NULL COMMENT '学院id',
  `campus_id` varchar(32) NOT NULL COMMENT '校区id',
  `college_name` varchar(32) NOT NULL COMMENT '学院名称',
  `candidate_num` int(12) NOT NULL COMMENT '当前学院竞选人数',
  PRIMARY KEY (`id`),
  KEY `campus_id` (`campus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `college_t`
--

LOCK TABLES `college_t` WRITE;
/*!40000 ALTER TABLE `college_t` DISABLE KEYS */;
INSERT INTO `college_t` VALUES ('03156c84fff540f0ab5b1464415c8476','1','信息工程学院',2),('ceff4eedaf1d4a1997c84f934e4194de','1','吧啦啦啦',2);
/*!40000 ALTER TABLE `college_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_vote_t`
--

DROP TABLE IF EXISTS `current_vote_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `current_vote_t` (
  `id` varchar(32) NOT NULL COMMENT '当前管理表id',
  `start_vote` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否开始投票',
  `current_college_id` varchar(32) DEFAULT NULL COMMENT '当前投票学院id',
  `current_field` int(2) DEFAULT '1' COMMENT '当前投票场次',
  `start_vote_college` tinyint(1) DEFAULT '0' COMMENT '是否开启学院投票',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_vote_t`
--

LOCK TABLES `current_vote_t` WRITE;
/*!40000 ALTER TABLE `current_vote_t` DISABLE KEYS */;
INSERT INTO `current_vote_t` VALUES ('1',1,'03156c84fff540f0ab5b1464415c8476',2,1);
/*!40000 ALTER TABLE `current_vote_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_t`
--

DROP TABLE IF EXISTS `log_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_t` (
  `id` varchar(32) NOT NULL COMMENT '日志id',
  `user_id` varchar(32) NOT NULL COMMENT '用户id，外键',
  `log_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '记录时间,默认当前时间',
  `log_ip` varchar(32) DEFAULT NULL COMMENT '操作ip',
  `log_action` varchar(200) DEFAULT NULL COMMENT '操作内容',
  PRIMARY KEY (`id`),
  KEY `log_t_ibfk_1` (`user_id`),
  CONSTRAINT `log_t_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_t`
--

LOCK TABLES `log_t` WRITE;
/*!40000 ALTER TABLE `log_t` DISABLE KEYS */;
INSERT INTO `log_t` VALUES ('0f3752de571d4914bef0b94f60b561a7','640c56eb94cc4904b129dc9de1a8ba6c','2018-10-21 20:33:25','0:0:0:0:0:0:0:1','登录'),('107e3c1c2bbd4aa0b41232c1616319e5','640c56eb94cc4904b129dc9de1a8ba6c','2018-10-20 12:34:37','0:0:0:0:0:0:0:1','登录'),('1dfd2849eb7e4694bc2dc7bf17be999c','a8e03fe5eb41467fb9101d6ea54f363d','2018-10-21 21:26:56','0:0:0:0:0:0:0:1','登录'),('294427d6fa8e48479c3bec222c4cecc2','89b196b5d528405e916cd765511649ff','2018-10-22 17:03:19','0:0:0:0:0:0:0:1','登录'),('2b4f9891af2e441f956d16ae090462e1','69199f84e9a24351bd562d5393d29382','2018-10-21 21:45:55','0:0:0:0:0:0:0:1','登录'),('4f4499df02a34cccb34dcacfb23d9aaa','89b196b5d528405e916cd765511649ff','2018-10-22 16:50:54','0:0:0:0:0:0:0:1','登录'),('50d228c01adf4084afee5a6fc135c29a','a8e03fe5eb41467fb9101d6ea54f363d','2018-10-21 20:50:57','0:0:0:0:0:0:0:1','登录'),('587bbb5b881848d5ba8ed80c14e18f1d','640c56eb94cc4904b129dc9de1a8ba6c','2018-10-20 12:36:37','0:0:0:0:0:0:0:1','登录'),('594c05fc72674f7a9ee21fbf0dd5cd90','640c56eb94cc4904b129dc9de1a8ba6c','2018-10-21 21:26:18','0:0:0:0:0:0:0:1','登录'),('92d9d52b845144b39c0b200616526dde','89b196b5d528405e916cd765511649ff','2018-10-21 21:31:06','0:0:0:0:0:0:0:1','登录'),('a2ba6eb3cb3240c0956a70043eb7fd19','89b196b5d528405e916cd765511649ff','2018-10-22 17:04:47','0:0:0:0:0:0:0:1','登录'),('a76c41da6a824fbc8fdb28f08b7c7ab0','89b196b5d528405e916cd765511649ff','2018-10-22 17:49:46','0:0:0:0:0:0:0:1','登录'),('c754148fc98443bfa5ce73f0490297bb','89b196b5d528405e916cd765511649ff','2018-10-21 20:53:20','0:0:0:0:0:0:0:1','登录'),('eb47212cec754278927482ed2bac4e5a','640c56eb94cc4904b129dc9de1a8ba6c','2018-10-21 17:16:35','0:0:0:0:0:0:0:1','登录'),('efd4bb7e85114bb1909c42c0a83fd985','a8e03fe5eb41467fb9101d6ea54f363d','2018-10-22 17:04:15','0:0:0:0:0:0:0:1','登录');
/*!40000 ALTER TABLE `log_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rater_vote_log_t`
--

DROP TABLE IF EXISTS `rater_vote_log_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rater_vote_log_t` (
  `id` varchar(32) NOT NULL COMMENT '评委投票记录id',
  `rater_id` varchar(32) NOT NULL COMMENT '投票人，对应user_t表',
  `vote_college_id` varchar(32) DEFAULT NULL COMMENT '投票学院，即场次，第二轮可为null',
  `vote_candidate_result` varchar(32) DEFAULT NULL COMMENT '所投结果,对应candidate_t的id，为null则表示弃权',
  `vote_field` int(2) DEFAULT NULL COMMENT '投票轮次，1为第一轮，2为第二轮',
  `vote_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '投票时间',
  PRIMARY KEY (`id`),
  KEY `rater_vote_log_t_ibfk_1` (`rater_id`),
  KEY `rater_vote_log_t_ibfk_2` (`vote_college_id`),
  KEY `rater_vote_log_t_ibfk_3` (`vote_candidate_result`),
  CONSTRAINT `rater_vote_log_t_ibfk_1` FOREIGN KEY (`rater_id`) REFERENCES `user_t` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rater_vote_log_t_ibfk_2` FOREIGN KEY (`vote_college_id`) REFERENCES `college_t` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rater_vote_log_t_ibfk_3` FOREIGN KEY (`vote_candidate_result`) REFERENCES `candidate_t` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rater_vote_log_t`
--

LOCK TABLES `rater_vote_log_t` WRITE;
/*!40000 ALTER TABLE `rater_vote_log_t` DISABLE KEYS */;
INSERT INTO `rater_vote_log_t` VALUES ('5072b658497e42218563fa1182ad6ff6','89b196b5d528405e916cd765511649ff','03156c84fff540f0ab5b1464415c8476','6fa8375f5a444c019d99d85808caaac5',1,'2018-10-21 20:53:22'),('5eb38d5341d8407eb899a7d4bb6a2e9d','640c56eb94cc4904b129dc9de1a8ba6c','03156c84fff540f0ab5b1464415c8476','59154e85b5b9475ea3f700d39f780b9b',1,'2018-10-21 17:17:01'),('76fbfbe1aa0a4d9f96065f729ae9fca7','69199f84e9a24351bd562d5393d29382','03156c84fff540f0ab5b1464415c8476','59154e85b5b9475ea3f700d39f780b9b',1,'2018-10-21 21:46:20'),('a60809145a224d0faab97fb0cf01acfd','a8e03fe5eb41467fb9101d6ea54f363d','03156c84fff540f0ab5b1464415c8476','59154e85b5b9475ea3f700d39f780b9b',1,'2018-10-21 20:51:57');
/*!40000 ALTER TABLE `rater_vote_log_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `second_data_t`
--

DROP TABLE IF EXISTS `second_data_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `second_data_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `pass_num` int(11) DEFAULT '0' COMMENT '第二轮通过名单',
  `vote_rule` int(11) DEFAULT '1' COMMENT '投票规则：1老师和学生，2仅老师，3仅学生',
  `show_type` int(11) DEFAULT '1' COMMENT '显示方式，1同一页显示，2长页显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `second_data_t`
--

LOCK TABLES `second_data_t` WRITE;
/*!40000 ALTER TABLE `second_data_t` DISABLE KEYS */;
INSERT INTO `second_data_t` VALUES ('1',5,2,2);
/*!40000 ALTER TABLE `second_data_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `second_student_t`
--

DROP TABLE IF EXISTS `second_student_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `second_student_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `college_name` varchar(32) NOT NULL COMMENT '所在学院名',
  `candidate_name` varchar(32) NOT NULL COMMENT '竞选人姓名',
  `sicau_id` varchar(16) DEFAULT NULL COMMENT '学号',
  `voted_num` int(11) DEFAULT '0' COMMENT '得票数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `second_student_t`
--

LOCK TABLES `second_student_t` WRITE;
/*!40000 ALTER TABLE `second_student_t` DISABLE KEYS */;
INSERT INTO `second_student_t` VALUES ('5afa6c8017984f0780441fd719c225c8','啦啦啦','啦啦啦啦','2010',0);
/*!40000 ALTER TABLE `second_student_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `second_vote_log_t`
--

DROP TABLE IF EXISTS `second_vote_log_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `second_vote_log_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `rater_id` varchar(32) NOT NULL COMMENT '投票者id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `second_vote_log_t`
--

LOCK TABLES `second_vote_log_t` WRITE;
/*!40000 ALTER TABLE `second_vote_log_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `second_vote_log_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_config_t`
--

DROP TABLE IF EXISTS `system_config_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_config_t` (
  `id` varchar(32) NOT NULL COMMENT '主键id',
  `title` varchar(32) NOT NULL COMMENT '标题全称',
  `single_title` varchar(32) NOT NULL COMMENT '标题简称',
  `time_out_lock` int(11) NOT NULL COMMENT '管理员界面无操作锁屏时间',
  `screen_password` varchar(32) NOT NULL COMMENT '锁屏密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_config_t`
--

LOCK TABLES `system_config_t` WRITE;
/*!40000 ALTER TABLE `system_config_t` DISABLE KEYS */;
INSERT INTO `system_config_t` VALUES ('1','四川农业大学信息工程学院第三届才艺大赛','信工才艺大赛投票系统',1,'1246886075');
/*!40000 ALTER TABLE `system_config_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `unvoted`
--

DROP TABLE IF EXISTS `unvoted`;
/*!50001 DROP VIEW IF EXISTS `unvoted`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `unvoted` AS SELECT 
 1 AS `real_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_t`
--

LOCK TABLES `user_t` WRITE;
/*!40000 ALTER TABLE `user_t` DISABLE KEYS */;
INSERT INTO `user_t` VALUES ('640c56eb94cc4904b129dc9de1a8ba6c','雅安','201603959','田智','201603959','student',0,'0:0:0:0:0:0:0:1','201603959',NULL,'e77aa4c0d9d4401fba40eae35df3824f'),('69199f84e9a24351bd562d5393d29382','雅安','201603962','三号','201603962','student',0,'0:0:0:0:0:0:0:1','201603962',NULL,'9e6bfc82007248dbb55172db7dbcee92'),('89b196b5d528405e916cd765511649ff','雅安','201603961','啦啦啦','201603961','teacher',1,'0:0:0:0:0:0:0:1','201603961',NULL,'9702cc653e564145a6c56fbc0ab4513d'),('a8e03fe5eb41467fb9101d6ea54f363d','雅安','201603960','北风','201603960','student',1,'0:0:0:0:0:0:0:1','201603960',NULL,'149dd1656542492ebd7fc47723d6d342');
/*!40000 ALTER TABLE `user_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `unvoted`
--

/*!50001 DROP VIEW IF EXISTS `unvoted`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `unvoted` AS select `user_t`.`real_name` AS `real_name` from `user_t` where (not(`user_t`.`real_name` in (select `user_t`.`real_name` from ((`rater_vote_log_t` join `user_t` on((`rater_vote_log_t`.`rater_id` = `user_t`.`id`))) join `college_t` on(((`college_t`.`id` = `rater_vote_log_t`.`vote_college_id`) and (`college_t`.`college_name` = '动物科技学院'))))))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-22 17:59:19
