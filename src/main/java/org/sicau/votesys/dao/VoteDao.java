package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.VO.CandidateVO;
import org.sicau.votesys.domain.VO.CurrentVoteInfoVO;

import java.util.List;

/**
 * @Author beifengtz
 * @Date Created in 14:19 2018/10/6
 * @Description:
 */
@Mapper
public interface VoteDao {

    CurrentVoteInfoVO queryCurrentVoteInfo();

    List<CandidateVO> queryFirstVoteList(@Param("collegeId") String collegeId);
}
