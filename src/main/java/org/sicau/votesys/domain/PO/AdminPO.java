package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 22:47 2018/10/6
 * @Description:
 */
public class AdminPO {
    private String id;

    private String username;

    private String password;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsernam(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
