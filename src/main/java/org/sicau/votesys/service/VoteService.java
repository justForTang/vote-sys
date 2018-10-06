package org.sicau.votesys.service;

import org.sicau.votesys.domain.VO.ResultVO;

import javax.servlet.http.HttpServletRequest;

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
}
