package org.sicau.votesys.domain.POJO;

/**
 * @Author beifengtz
 * @Date Created in 9:48 2018/10/5
 * @Description:
 */
public class Student extends User {

    /**
     * 角色，默认student
     * */
    private String role;

    public Student(){
        this.role = "student";
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
