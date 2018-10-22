package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.AdminDao;
import org.sicau.votesys.dao.UserDao;
import org.sicau.votesys.dao.VoteDao;
import org.sicau.votesys.domain.PO.*;
import org.sicau.votesys.domain.VO.*;
import org.sicau.votesys.enums.ConstantEnum;
import org.sicau.votesys.service.VoteService;
import org.sicau.votesys.util.IdUtil;
import org.sicau.votesys.util.ResultUtil;
import org.sicau.votesys.util.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
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
        SecondDataPO secondDataPO = voteDao.querySecondData();
        List<SecondCandidatePO> secondCandidatePOList = voteDao.getSecondVoteData();
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("passNum",secondDataPO.getPassNum());
        resMap.put("showType",secondDataPO.getShowType());
        resMap.put("voteRole",secondDataPO.getPassNum());
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

        SecondDataPO secondDataPO = voteDao.querySecondData();
        boolean isAllowed = false;
        switch (secondDataPO.getVoteRule()){
            case 1:// 允许老师和学生
                if("teacher".equals(userPO.getRole()) || "student".equals(userPO.getRole())){
                    isAllowed = true;
                }
                break;
            case 2:// 仅允许老师
                if("teacher".equals(userPO.getRole())){
                    isAllowed = true;
                }
                break;
            case 3:// 仅允许学生
                if("student".equals(userPO.getRole())){
                    isAllowed = true;
                }
                break;
        }
        if(isAllowed){
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
            return resultUtil.sourceNotFoundError("权限不足，该角色不可参与本轮投票");
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
            SecondDataPO secondDataPO = voteDao.querySecondData();
            Map<String,Object> resMap = new HashMap<>();
            resMap.put("passNum",secondDataPO.getPassNum());
            resMap.put("showType",secondDataPO.getShowType());
            resMap.put("voteRule",secondDataPO.getVoteRule());
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
    public ResultVO getCandidateListByAdmin(int page,int limit,HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        List<CandidateVO> candidateVOList = voteDao.selectCandidateList((page-1)*limit,limit);
        int candidateCount = voteDao.selectCandidateCount();
        if(candidateVOList!=null && candidateCount >= 0){
            Map<String,Object> resMap = new HashMap<>();
            resMap.put("candidateList",candidateVOList);
            resMap.put("total",candidateCount);
            return resultUtil.success(resMap);
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO deleteFirstCandidate(String id, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.deleteFirstCandidate(id)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO addFirstCandidate(CandidatePO candidatePO, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.canInsertFirstCandidate(candidatePO.getCollegeId()) == null){
            if(voteDao.insertFirstCandidate(candidatePO)){
                return resultUtil.success();
            }
        }else{
            return resultUtil.sourceExistError("组别人数已上线");
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO deleteFirstVoteCollegeLog(String voteCollegeId, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.deleteFirstVoteCollegeLog(voteCollegeId)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO deleteFirstVoteAllCollegeLog(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.deleteFirstVoteAllCollegeLog()){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO updateSecondVoteRule(int passNum, int voteRule,int showType, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.updateSecondVoteData(passNum,voteRule,showType)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO addSecondCandidate(SecondCandidatePO secondCandidatePO, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.insertSecondCandidate(secondCandidatePO)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO deleteSecondCandidate(String id, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.deleteSecondCandidate(id)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO deleteSecondCandidates(List<String> idList, HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.deleteSecondCandidates(idList)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO getSecondData() {
        SecondDataPO secondDataPO = voteDao.selectSecondData();
        if(secondDataPO!= null){
            return resultUtil.success(secondDataPO);
        }
        return resultUtil.unknowError();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public ResultVO clearSecondVote(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(voteDao.initSecondCandidateVoteNum() && voteDao.deleteSecondVoteLog()){
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
