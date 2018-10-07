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
    public ResultVO uploadResult(@RequestParam("voteCandidateResult") String voteCandidateResult,
                                 @RequestParam("currentCollegeId") String currentCollegeId,
                                 @RequestParam("voteField") int voteField,
                                 HttpServletRequest request){
        return voteService.updateResult(voteCandidateResult,currentCollegeId,voteField,request);
    }

    @GetMapping("/getVoteStatsByAdmin")
    public ResultVO getVoteStatsByAdmin(HttpServletRequest request){
        return voteService.getVoteStatsByAdmin(request);
    }

    @GetMapping("/getCollegeListByAdmin")
    public ResultVO getCollegeListByAdmin(HttpServletRequest request){
        return voteService.getCollegeListByAdmin(request);
    }

    @PostMapping("/updateCurrentStats")
    public ResultVO updateCurrentStats(@RequestParam("startVote") int startVote,
                                       @RequestParam("currentField") int currentField,
                                       @RequestParam("currentCollegeId") String currentCollegeId,
                                       HttpServletRequest request){
        return voteService.updateCurrentStats(startVote,currentField,currentCollegeId,request);
    }

    @GetMapping("/startVote")
    public ResultVO startVote(HttpServletRequest request){
        return voteService.startVote(request);
    }

    @GetMapping("/stopVote")
    public ResultVO stopVote(HttpServletRequest request){
        return voteService.stopVote(request);
    }

    @GetMapping("/getFirstVoteResult")
    public ResultVO getFirstVoteResult(){
        return voteService.getFirstVoteResult();
    }
}
