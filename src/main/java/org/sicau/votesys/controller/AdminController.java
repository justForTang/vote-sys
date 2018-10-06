package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 22:36 2018/10/6
 * @Description:
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResultVO login(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          HttpServletRequest request){
        return adminService.login(username,password,request);
    }
}
