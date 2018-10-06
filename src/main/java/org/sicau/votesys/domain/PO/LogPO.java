package org.sicau.votesys.domain.PO;

import java.util.Date;

/**
 * @Author beifengtz
 * @Date Created in 14:10 2018/10/6
 * @Description:
 */
public class LogPO {
    /**
     * 日志id
     * */
    private String id;

    /**
     * 操作者id
     * */
    private String userId;

    /**
     * 操作时间
     * */
    private Date logTime;

    /**
     * 操作者访问ip
     * */
    private String logIp;

    /**
     * 记录操作内容
     * */
    private String logAction;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getLogTime() {
        return logTime;
    }

    public void setLogTime(Date logTime) {
        this.logTime = logTime;
    }

    public String getLogIp() {
        return logIp;
    }

    public void setLogIp(String logIp) {
        this.logIp = logIp;
    }

    public String getLogAction() {
        return logAction;
    }

    public void setLogAction(String logAction) {
        this.logAction = logAction;
    }
}
