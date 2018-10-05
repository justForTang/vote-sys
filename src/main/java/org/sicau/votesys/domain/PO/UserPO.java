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
     * 登录ip
     * */
    private String loginIp;

    /**
     * 存贮的cookie信息id
     * */
    private String logCookieId;


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public String getLogCookieId() {
        return logCookieId;
    }

    public void setLogCookieId(String logCookieId) {
        this.logCookieId = logCookieId;
    }
}
