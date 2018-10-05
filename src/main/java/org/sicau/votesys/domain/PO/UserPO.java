package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 10:13 2018/10/5
 * @Description:
 */
public class UserPO extends org.sicau.votesys.domain.POJO.UserPOJO {
    /**
     * 角色
     * */
    private String role;

    /**
     * 是否在线
     * */
    private String isActive;

    /**
     * 是否登录过
     * */
    private String hasLog;

    /**
     * 登录ip
     * */
    private String loginIp;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public String getHasLog() {
        return hasLog;
    }

    public void setHasLog(String hasLog) {
        this.hasLog = hasLog;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }
}
