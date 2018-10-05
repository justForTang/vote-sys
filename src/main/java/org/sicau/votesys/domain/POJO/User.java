package org.sicau.votesys.domain.POJO;

/**
 * @Author beifengtz
 * @Date Created in 9:43 2018/10/5
 * @Description:
 */
public class User {
    /**
     * 用户唯一识别id
     * */
    private String id;

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
}
