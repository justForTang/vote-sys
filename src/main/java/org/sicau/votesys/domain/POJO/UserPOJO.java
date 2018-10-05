package org.sicau.votesys.domain.POJO;

/**
 * @Author beifengtz
 * @Date Created in 9:43 2018/10/5
 * @Description:
 */
public class UserPOJO {
    /**
     * 用户唯一识别id
     * */
    private String id;

    /**
     * 学号或工号
     * */
    private String sicauId;

    /**
     * 用户名
     * */
    private String username;

    /**
     * 真实姓名
     * */
    private String realName;

    /**
     * 用户密码
     * */
    private String password;

    /**
     * 用户校区
     * */
    private String campus;

    /**
     * 是否登陆过
     * */
    private boolean hasLog;

    /**
     * 首次登录设备信息
     * */
    private String loginBrowserInfo;

    public boolean isHasLog() {
        return hasLog;
    }

    public void setHasLog(boolean hasLog) {
        this.hasLog = hasLog;
    }

    public String getLoginBrowserInfo() {
        return loginBrowserInfo;
    }

    public void setLoginBrowserInfo(String loginBrowserInfo) {
        this.loginBrowserInfo = loginBrowserInfo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getSicauId() {
        return sicauId;
    }

    public void setSicauId(String sicauId) {
        this.sicauId = sicauId;
    }
}
