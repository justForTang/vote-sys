package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.UserDao;
import org.sicau.votesys.dao.VoteDao;
import org.sicau.votesys.domain.VO.CandidateVO;
import org.sicau.votesys.domain.VO.CurrentVoteInfoVO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.enums.ConstantEnum;
import org.sicau.votesys.service.VoteService;
import org.sicau.votesys.util.ResultUtil;
import org.sicau.votesys.util.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Author beifengtz
 * @Date Created in 14:19 2018/10/6
 * @Description:
 */
@Service
public class VoteServiceImp implements VoteService {

    @Autowired
    private ResultUtil resultUtil;
    @Autowired
    private UserDao userDao;
    @Autowired
    private VoteDao voteDao;

    @Override
    public ResultVO getVoteStats(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) <= 0) return resultUtil.loginError();
        }
        CurrentVoteInfoVO currentVoteInfoVO = voteDao.queryCurrentVoteInfo();
        if(currentVoteInfoVO == null){
            return resultUtil.unknowError();
        }
        return resultUtil.success(currentVoteInfoVO);
    }

    @Override
    public ResultVO getFirstList(String collegeId, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) <= 0) return resultUtil.loginError();
        }
        List<CandidateVO> candidateVOList = voteDao.queryFirstVoteList(collegeId);
        if (candidateVOList!=null) return resultUtil.success(candidateVOList);
        return resultUtil.unknowError();
    }
}
