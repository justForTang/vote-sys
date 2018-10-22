package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.PO.CandidatePO;
import org.sicau.votesys.domain.PO.CollegePO;
import org.sicau.votesys.domain.PO.SecondCandidatePO;
import org.sicau.votesys.domain.PO.SecondDataPO;
import org.sicau.votesys.domain.VO.*;

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

    List<CollegeVO> queryAllCollegeList();

    boolean updateCurrentStats(@Param("startVote") int startVote,
                               @Param("currentField") int currentField,
                               @Param("currentCollegeId") String currentCollegeId);

    boolean startAndStopVote(@Param("msg") String msg);

    List<RaterVoteLogVO> queryRaterVoteLogList(@Param("voteField") int voteField,
                                               @Param("collegeId") String collegeId);

    List<FirstVoteResultVO> queryFirstVoteResult();

    List<SecondCandidatePO> getSecondVoteData();

    String queryHasSecondVote(@Param("raterId") String raterId);

    boolean updateSecondVote(List<String> candidateIdList);

    boolean insertSecondVoteLog(@Param("id") String id,
                             @Param("raterId") String raterId);

    int querySecondVotedNum();

    List<SecondCandidatePO> getSecondVoteDataOrderByNum();

    boolean addCollege(@Param("collegePO") CollegePO collegePO);

    List<CandidateVO> selectCandidateList(@Param("page") int page,
                                          @Param("limit") int limit);

    int selectCandidateCount();

    boolean deleteFirstCandidate(@Param("id") String id);

    boolean insertFirstCandidate(@Param("candidatePO") CandidatePO candidatePO);

    CandidateVO canInsertFirstCandidate(@Param("collegeId") String collegeId);

    boolean deleteFirstVoteAllCollegeLog();

    boolean deleteFirstVoteCollegeLog(@Param("voteCollegeId") String voteCollegeId);

    SecondDataPO querySecondData();
}
