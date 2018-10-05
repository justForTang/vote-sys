package org.sicau.votesys.domain.POJO;

/**
 * @Author beifengtz
 * @Date Created in 9:46 2018/10/5
 * @Description:
 */
public class Teacher extends User {
    /**
     * 角色,默认teacher
     * */
    private String role;

    public Teacher(){
        this.role = "teacher";
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
