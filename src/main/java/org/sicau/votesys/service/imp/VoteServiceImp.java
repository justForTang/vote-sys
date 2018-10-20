package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.AdminDao;
import org.sicau.votesys.dao.UserDao;
import org.sicau.votesys.dao.VoteDao;
import org.sicau.votesys.domain.PO.CollegePO;
import org.sicau.votesys.domain.PO.SecondCandidatePO;
import org.sicau.votesys.domain.PO.UserPO;
import org.sicau.votesys.domain.VO.*;
import org.sicau.votesys.enums.ConstantEnum;
import org.sicau.votesys.service.VoteService;
import org.sicau.votesys.util.IdUtil;
import org.sicau.votesys.util.ResultUtil;
import org.sicau.votesys.util.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private AdminDao adminDao;
    @Autowired
    private VoteDao voteDao;

    @Override
    public ResultVO getVoteStats(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) == null) return resultUtil.loginError();
        }
        CurrentVoteInfoVO currentVoteInfoVO = voteDao.queryCurrentVoteInfo();
        if(currentVoteInfoVO == null){
            return resultUtil.unknowError();
        }
        return resultUtil.success(currentVoteInfoVO);
    }

    @Override
    public ResultVO getVoteStatsByAdmin(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        CurrentVoteInfoVO currentVoteInfoVO = voteDao.queryCurrentVoteInfo();
        if(currentVoteInfoVO == null){
            return resultUtil.unknowError();
        }
        return resultUtil.success(currentVoteInfoVO);
    }

    @Override
    public ResultVO getCollegeListByAdmin(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        List<CollegeVO> collegePOList = voteDao.queryAllCollegeList();
        return resultUtil.success(collegePOList);
    }

    @Override
    public ResultVO updateCurrentStats(int startVote, int currentField, String currentCollegeId, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.updateCurrentStats(startVote,currentField,currentCollegeId)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO startVote(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.startAndStopVote("start")){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO stopVote(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.startAndStopVote("stop")){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO getFirstVoteResult() {
        List<FirstVoteResultVO> firstVoteResultVOList =  voteDao.queryFirstVoteResult();
        if(firstVoteResultVOList!=null) return resultUtil.success(firstVoteResultVOList);
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO getCurrentCount() {

        return null;
    }

    @Override
    public ResultVO checkHasVoted(String raterId, int voteField, String currentCollegeId, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.queryHasVote(raterId,voteField,currentCollegeId) != null){
            return resultUtil.success(true);
        }else{
            return resultUtil.success(false);
        }
    }

    @Transactional(rollbackFor=Exception.class)
    @Override
    public ResultVO getSecondVoteData(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) == null) return resultUtil.loginError();
        }
        int passNum = voteDao.querySecondPassNum();
        List<SecondCandidatePO> secondCandidatePOList = voteDao.getSecondVoteData();
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("passNum",passNum);
        resMap.put("candidateList",secondCandidatePOList);
        return resultUtil.success(resMap);
    }

    @Transactional(rollbackFor=Exception.class)
    @Override
    public ResultVO uploadSecondVoteData(String raterId, List<String> candidateIdList, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) == null) return resultUtil.loginError();
        }
        // 检查用户角色
        UserPO userPO = userDao.selectUserById(raterId);
        if("teacher".equals(userPO.getRole())){
            if(voteDao.queryHasSecondVote(raterId) != null){
                return resultUtil.sourceExistError();
            }else{
                if(voteDao.updateSecondVote(candidateIdList)){
                    if(voteDao.insertSecondVoteLog(IdUtil.getUUID(),raterId)){
                        return resultUtil.success();
                    }
                }
                return resultUtil.unknowError();
            }
        }else {
            return resultUtil.sourceNotFoundError("该轮学生不可投票");
        }
    }

    @Override
    public ResultVO getSecondVotedNum() {
        int votedNum = voteDao.querySecondVotedNum();
        if(votedNum >= 0){
            return resultUtil.success(votedNum);
        }else{
            return resultUtil.unknowError();
        }
    }

    @Override
    public ResultVO getSecondCurrentData() {
        List<SecondCandidatePO> secondCandidatePOList = voteDao.getSecondVoteDataOrderByNum();
        if(secondCandidatePOList!=null){
            int passNum = voteDao.querySecondPassNum();
            Map<String,Object> resMap = new HashMap<>();
            resMap.put("passNum",passNum);
            resMap.put("candidateList",secondCandidatePOList);
            return resultUtil.success(resMap);
        }else{
            return resultUtil.unknowError();
        }
    }

    @Override
    public ResultVO delCollegeById(String id, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(userDao.deleteCollegeById(id)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO addCollege(CollegePO collegePO, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.addCollege(collegePO)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }


    @Override
    public ResultVO getFirstList(String collegeId, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) == null) return resultUtil.loginError();
        }
        List<CandidateVO> candidateVOList = voteDao.queryFirstVoteList(collegeId);
        if (candidateVOList!=null) return resultUtil.success(candidateVOList);
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO updateResult(String voteCandidateResult, String currentCollegeId, int voteField, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(userDao.selectUserNumById(sessionValue) == null) return resultUtil.loginError();
        }
        String raterId = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if(voteDao.queryHasVote(raterId,voteField,currentCollegeId) != null){
            return resultUtil.sourceExistError("您已投票，无法重复投票");
        }else{
            if(voteDao.insertVoteResult(IdUtil.getUUID(),raterId,voteCandidateResult,currentCollegeId,voteField)) return resultUtil.success();
        }
        return resultUtil.unknowError();
    }
}
