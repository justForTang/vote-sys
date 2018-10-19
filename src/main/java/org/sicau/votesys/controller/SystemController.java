package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.domain.VO.SystemConfVO;
import org.sicau.votesys.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 19:59 2018/10/19
 * @Description:
 */
@RestController
@RequestMapping("/system")
public class SystemController {

    @Autowired
    private SystemService systemService;

    @GetMapping("/getSysConf")
    public ResultVO getSysConf(){
        return systemService.getSysConf();
    }

    @GetMapping("/getSysConfWithAdmin")
    public ResultVO getSysConfWithAdmin(HttpServletRequest request){
        return systemService.getSysConfWithAdmin(request);
    }

    @PostMapping("/setSysTitle")
    public ResultVO setSystemTitle(@RequestParam("title") String title,
                                   @RequestParam("singleTitle") String singleTitle,
                                   HttpServletRequest request){
        SystemConfVO systemConfVO = new SystemConfVO();
        systemConfVO.setSingleTitle(singleTitle);
        systemConfVO.setTitle(title);
        return systemService.setSystemConfig(request,systemConfVO);
    }
}
