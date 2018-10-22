package org.sicau.votesys.controller;

import org.sicau.votesys.domain.PO.CandidatePO;
import org.sicau.votesys.domain.PO.CollegePO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.VoteService;
import org.sicau.votesys.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

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

    @GetMapping("/getCurrentCount")
    public ResultVO getCurrentCount(){
        return voteService.getCurrentCount();
    }

    @PostMapping("/checkHasVoted")
    public ResultVO checkHasVoted(@RequestParam("raterId") String raterId,
                                  @RequestParam("voteField") int voteField,
                                  @RequestParam("currentCollegeId") String currentCollegeId,
                                  HttpServletRequest request){
        return voteService.checkHasVoted(raterId,voteField,currentCollegeId,request);
    }

    @GetMapping("/getSecondVoteData")
    public ResultVO getSecondVoteData(HttpServletRequest request){
        return voteService.getSecondVoteData(request);
    }

    @PostMapping("/uploadSecondVoteData")
    public ResultVO uploadSecondVoteData(@RequestParam("raterId") String raterId,
                                         @RequestParam("candidateIdList") ArrayList<String> candidateIdList,
                                         HttpServletRequest request){
        return voteService.uploadSecondVoteData(raterId,candidateIdList,request);
    }

    @GetMapping("/getSecondVotedNum")
    public ResultVO getSecondVotedNum(){
        return voteService.getSecondVotedNum();
    }

    @GetMapping("/getSecondCurrentData")
    public ResultVO getSecondCurrentData(){
        return voteService.getSecondCurrentData();
    }

    @PostMapping("/delCollegeById")
    public ResultVO delCollegeById(HttpServletRequest request,@RequestParam("id") String id){
        return voteService.delCollegeById(id,request);
    }

    @PostMapping("/addCollege")
    public ResultVO addCollege(@RequestParam("campusId") String campusId,
                               @RequestParam("collegeName") String collegeName,
                               @RequestParam("candidateNum") String candidateNum,
                               HttpServletRequest request){
        CollegePO collegePO = new CollegePO();
        collegePO.setCandidateNum(candidateNum);
        collegePO.setCollegeName(collegeName);
        collegePO.setId(IdUtil.getUUID());
        collegePO.setCampusId(campusId);
        return voteService.addCollege(collegePO,request);
    }

    @GetMapping("/getCandidateListByAdmin")
    public ResultVO getCandidateListByAdmin(@RequestParam("page") int page,
                                            @RequestParam("limit") int limit,
                                            HttpServletRequest request){
        return voteService.getCandidateListByAdmin(page,limit,request);
    }

    @GetMapping("/deleteFirstCandidate")
    public ResultVO deleteFirstCandidate(@RequestParam("id") String id,HttpServletRequest request){
        return voteService.deleteFirstCandidate(id,request);
    }

    @PostMapping("/addFirstCandidate")
    public ResultVO addFirstCandidate(@RequestParam("collegeId") String collegeId,
                                      @RequestParam("candidateName") String candidateName,
                                      HttpServletRequest request){
        CandidatePO candidatePO = new CandidatePO(IdUtil.getUUID(),collegeId,candidateName);
        return voteService.addFirstCandidate(candidatePO,request);
    }

    @PostMapping("/deleteFirstVoteCollegeLog")
    public ResultVO deleteFirstVoteCollegeLog(@RequestParam("voteCollegeId") String voteCollegeId,HttpServletRequest request){
        return voteService.deleteFirstVoteCollegeLog(voteCollegeId,request);
    }

    @PostMapping("/deleteFirstVoteAllCollegeLog")
    public ResultVO deleteFirstVoteAllCollegeLog(HttpServletRequest request){
        return voteService.deleteFirstVoteAllCollegeLog(request);
    }
}
