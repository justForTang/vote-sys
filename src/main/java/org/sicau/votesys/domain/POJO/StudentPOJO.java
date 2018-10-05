package org.sicau.votesys.domain.POJO;

/**
 * @Author beifengtz
 * @Date Created in 9:48 2018/10/5
 * @Description:
 */
public class StudentPOJO extends UserPOJO {

    /**
     * 角色，默认student
     * */
    private String role;

    public StudentPOJO(){
        this.role = "student";
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
