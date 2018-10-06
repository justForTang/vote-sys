package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.VoteDao;
import org.sicau.votesys.domain.VO.CandidateVO;
import org.sicau.votesys.domain.VO.CurrentVoteInfoVO;
import org.sicau.votesys.domain.VO.RaterVoteLogVO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.StatisticsService;
import org.sicau.votesys.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author beifengtz
 * @Date Created in 0:59 2018/10/7
 * @Description:
 */
@Service
public class StatisticsServiceImp implements StatisticsService {

    @Autowired
    private ResultUtil resultUtil;
    @Autowired
    private VoteDao voteDao;

    @Override
    public ResultVO stats() {
        CurrentVoteInfoVO currentVoteInfoVO = voteDao.queryCurrentVoteInfo();
        if(currentVoteInfoVO == null){
            return resultUtil.unknowError();
        }
        return resultUtil.success(currentVoteInfoVO);
    }

    @Override
    public ResultVO getFirstList(String collegeId) {
        List<CandidateVO> candidateVOList = voteDao.queryFirstVoteList(collegeId);
        if (candidateVOList!=null) return resultUtil.success(candidateVOList);
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO getFirstCurrentData(String collegeId,int voteField) {
        List<RaterVoteLogVO> raterVoteLogVOList = voteDao.queryRaterVoteLogList(voteField,collegeId);
        if(raterVoteLogVOList !=null) return resultUtil.success(raterVoteLogVOList);
        return resultUtil.unknowError();
    }
}
