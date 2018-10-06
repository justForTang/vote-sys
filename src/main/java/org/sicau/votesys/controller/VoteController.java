package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 14:18 2018/10/6
 * @Description:
 */
@RestController
@RequestMapping("/vote")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @GetMapping("/stats")
    public ResultVO getVoteStats(HttpServletRequest request){
        return voteService.getVoteStats(request);
    }

    @GetMapping("/getFirstList")
    public ResultVO getFirstList(@RequestParam("collegeId") String collegeId,
                                 HttpServletRequest request){
        return voteService.getFirstList(collegeId,request);
    }
}
