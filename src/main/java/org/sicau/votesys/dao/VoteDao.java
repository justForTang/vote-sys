package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.PO.CollegePO;
import org.sicau.votesys.domain.VO.CandidateVO;
import org.sicau.votesys.domain.VO.CurrentVoteInfoVO;
import org.sicau.votesys.domain.VO.RaterVoteLogVO;

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

    boolean updateCurrentStats(@Param("startVote") int startVote,
                               @Param("currentField") int currentField,
                               @Param("currentCollegeId") String currentCollegeId);

    boolean startAndStopVote(@Param("msg") String msg);

    List<RaterVoteLogVO> queryRaterVoteLogList(@Param("voteField") int voteField,
                                               @Param("collegeId") String collegeId);
}
