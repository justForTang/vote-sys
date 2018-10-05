package org.sicau.votesys.util;

import org.sicau.votesys.dao.LogDao;
import org.sicau.votesys.enums.ActionLogEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @Author beifengtz
 * @Date Created in 14:08 2018/10/5
 * @Description:
 */
@Component
public class ActionLogUtil {

    @Autowired
    private LogDao logDao;

    /**
     * 记录登录日志
     * */
    public void logLogin(String userId,String ip){
        logDao.insertActionLog(IdUtil.getUUID(),userId,new Date(),ip, ActionLogEnum.LOGIN.getAction());
    }

    /**
     * 记录投票日志
     * */
    public void logVote(String userId,String ip){
        logDao.insertActionLog(IdUtil.getUUID(),userId,new Date(),ip, ActionLogEnum.VOTE.getAction());
    }

    /**
     * 记录查看投票结果日志
     * */
    public void logLookVote(String userId,String ip){
        logDao.insertActionLog(IdUtil.getUUID(),userId,new Date(),ip, ActionLogEnum.LOOK_VOTE.getAction());
    }

    /**
     * 记录注销日志
     * */
    public void logLogOut(String userId,String ip){
        logDao.insertActionLog(IdUtil.getUUID(),userId,new Date(),ip, ActionLogEnum.LOGOUT.getAction());
    }

    /**
     * 记录自定义操作日志
     * */
    public void logByCustomAction(String userId,String ip,String action){
        logDao.insertActionLog(IdUtil.getUUID(),userId,new Date(),ip, action);
    }

}
