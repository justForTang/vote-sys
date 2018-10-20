package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

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

    @GetMapping("/getAllUserList")
    public ResultVO getAllUserList(@RequestParam("page") int page,
                                   @RequestParam("limit") int limit,
                                   HttpServletRequest request){
        return userService.getAllUserListByAdmin(page,limit,request);
    }

    @PostMapping("/updateUserLogStats")
    public ResultVO updateUserLogStats(@RequestParam("username") String username,
                                       HttpServletRequest request){
        return userService.updateUserLogStats(username,request);
    }

    @PostMapping("/updateAllUserLogStats")
    public ResultVO updateAllUserLogStats(@RequestParam("usernameList") List<String> usernameList,
                                          HttpServletRequest request){
        return userService.updateAllUserLogStats(usernameList,request);
    }

    @PostMapping("deleteUser")
    public ResultVO deleteUser(@RequestParam("username") String username,
                                       HttpServletRequest request){
        return userService.deleteUser(username,request);
    }

    @GetMapping("getUserCount")
    public ResultVO getUserCount(){
        return userService.getUserCount();
    }
}
