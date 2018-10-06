package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/uploadResult")
    public ResultVO uploadResult(
                                 @RequestParam("voteCandidateResult") String voteCandidateResult,
                                 @RequestParam("currentCollegeId") String currentCollegeId,
                                 @RequestParam("voteField") int voteField,
                                 HttpServletRequest request){
        return voteService.updateResult(voteCandidateResult,currentCollegeId,voteField,request);
    }

    @GetMapping("/getCollegeListByAdmin")
    private ResultVO getCollegeListByAdmin(HttpServletRequest request){
        return voteService.getCollegeListByAdmin(request);
    }
}
