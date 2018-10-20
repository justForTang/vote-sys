package org.sicau.votesys.service;

import org.sicau.votesys.domain.PO.CandidatePO;
import org.sicau.votesys.domain.PO.CollegePO;
import org.sicau.votesys.domain.VO.ResultVO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Author beifengtz
 * @Date Created in 14:18 2018/10/6
 * @Description:
 */
public interface VoteService {
    ResultVO getVoteStats(HttpServletRequest request);

    ResultVO getFirstList(String collegeId,HttpServletRequest request);

    ResultVO updateResult(String voteCandidateResult, String currentCollegeId, int voteField, HttpServletRequest request);

    ResultVO getVoteStatsByAdmin(HttpServletRequest request);

    ResultVO getCollegeListByAdmin(HttpServletRequest request);

    ResultVO updateCurrentStats(int startVote, int currentField, String currentCollegeId, HttpServletRequest request);

    ResultVO startVote(HttpServletRequest request);

    ResultVO stopVote(HttpServletRequest request);

    ResultVO getFirstVoteResult();

    ResultVO getCurrentCount();

    ResultVO checkHasVoted(String raterId, int voteField, String currentCollegeId, HttpServletRequest request);

    ResultVO getSecondVoteData(HttpServletRequest request);


    ResultVO uploadSecondVoteData(String raterId, List<String> candidateIdList, HttpServletRequest request);

    ResultVO getSecondVotedNum();

    ResultVO getSecondCurrentData();

    ResultVO delCollegeById(String id, HttpServletRequest request);

    ResultVO addCollege(CollegePO collegePO, HttpServletRequest request);

    ResultVO getCandidateListByAdmin(int page,int limit,HttpServletRequest request);


    ResultVO deleteFirstCandidate(String id, HttpServletRequest request);

    ResultVO addFirstCandidate(CandidatePO candidatePO, HttpServletRequest request);
}
