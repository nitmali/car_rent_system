/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50717
Source Host           : 127.0.0.1:3306
Source Database       : car_rent_system_schema

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-11-22 15:34:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(32) NOT NULL,
  `color` varchar(16) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `license_plate` varchar(8) NOT NULL,
  `price` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_7ew84l68jbcgm9uvsqtbfr1xm` (`license_plate`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('111', '别克君越', '棕色', '别克君越.jpg', '浙B·55666', '120', 'IDLE');
INSERT INTO `car` VALUES ('112', '别克昂科拉', '白色', '别克昂科拉.jpg', '浙B·55668', '150', 'IDLE');
INSERT INTO `car` VALUES ('113', '别克GL8', '灰色', '别克GL8.jpg', '浙B·55669', '160', 'IDLE');
INSERT INTO `car` VALUES ('114', '大众朗逸', '蓝色哑光', '大众朗逸.jpg', '浙B·55670', '130', 'IDLE');
INSERT INTO `car` VALUES ('115', '大众帕萨特', '白色', '大众帕萨特.jpg', '浙B·55671', '120', 'IDLE');
INSERT INTO `car` VALUES ('116', '大众途观', '黑色', '大众途观.jpg', '浙B·55672', '200', 'IDLE');
INSERT INTO `car` VALUES ('117', '丰田凯美瑞', '黑色', '丰田凯美瑞.jpg', '浙B·55673', '220', 'IDLE');
INSERT INTO `car` VALUES ('118', '凯迪拉克', '灰色', '凯迪拉克.jpg', '浙B·55674', '160', 'IDLE');
INSERT INTO `car` VALUES ('119', '凯迪拉克XTS', '灰色', '凯迪拉克XTS.jpg', '浙B·55675', '160', 'IDLE');
INSERT INTO `car` VALUES ('120', '起亚K5', '银白', '起亚K5.jpg', '浙B·55676', '150', 'IDLE');
INSERT INTO `car` VALUES ('121', '沃尔沃S90', '蓝色哑光', '沃尔沃S90.jpg', '浙B·55677', '160', 'IDLE');
INSERT INTO `car` VALUES ('122', '雪佛兰科鲁兹', '红色', '雪佛兰科鲁兹.jpg', '浙B·55678', '180', 'IDLE');
INSERT INTO `car` VALUES ('123', '上汽大通G10', '白色', '上汽大通G10.jpg', '浙B·55679', '160', 'IDLE');
INSERT INTO `car` VALUES ('124', '别克凯越', '白色', '别克凯越.jpg', '浙B·55680', '300', 'IDLE');
INSERT INTO `car` VALUES ('125', '别克凯越', '白色', '别克凯越.jpg', '浙B·55681', '300', 'IDLE');
