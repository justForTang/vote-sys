package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author beifengtz
 * @Date Created in 12:13 2018/10/5
 * @Description:
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResultVO login(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam(name = "loginBrowserInfo",required = false) String loginBrowserInfo,
                          HttpServletRequest request,
                          HttpServletResponse response){
        return userService.login(username,password,loginBrowserInfo,request,response);
    }

    @GetMapping("/check")
    public ResultVO checkLogStats(HttpServletRequest request){
        return userService.checkLogStats(request);
    }

    @GetMapping("/logout")
    public ResultVO logout(HttpServletRequest request){
        return userService.logout(request);
    }
}
