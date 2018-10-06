package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.PO.CollegePO;
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

    Object queryHasVote(@Param("raterId") String raterId,
                         @Param("voteField") int voteField,
                         @Param("currentCollegeId") String currentCollegeId);

    boolean insertVoteResult(@Param("id") String id,
                             @Param("raterId") String raterId,
                             @Param("voteCandidateResult") String voteCandidateResult,
                             @Param("currentCollegeId") String currentCollegeId,
                             @Param("voteField") int voteField);

    List<CollegePO> queryAllCollegeList();
}
