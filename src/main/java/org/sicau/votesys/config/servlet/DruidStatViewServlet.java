package org.sicau.votesys.config.servlet;

import com.alibaba.druid.support.http.StatViewServlet;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.Servlet;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

/**
 * @Author beifengtz
 * @Date Created in 9:55 2018/10/5
 * @Description:
 */
@WebServlet(
        urlPatterns= {"/beifeng/druid/*"},
        initParams= {
                @WebInitParam(name="allow",value="127.0.0.1"),
                @WebInitParam(name="loginUsername",value = "beifeng"),
                @WebInitParam(name="loginPassword",value="123456"),
                @WebInitParam(name="resetEnable",value="true")// 允许HTML页面上的“Reset All”功能
        }
)
public class DruidStatViewServlet extends StatViewServlet implements Servlet {
    private static final long serialVersionUID = 1L;
}
