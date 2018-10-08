package org.sicau.votesys;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ServletComponentScan //druid用于扫描所有的Servlet、filter、listener+
@MapperScan("org.sicau.votesys.dao") //扫描mybatis的mapper
@EnableTransactionManagement
public class VoteSysApplication {

    public static void main(String[] args) {
        SpringApplication.run(VoteSysApplication.class, args);
    }
}
