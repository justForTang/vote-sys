package org.sicau.votesys.domain.VO;

/**
 * @Author beifengtz
 * @Date Created in 14:22 2018/10/19
 * @Description:
 */
public class UserCountVO {
    private int total;

    private int teacher;

    private int student;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getTeacher() {
        return teacher;
    }

    public void setTeacher(int teacher) {
        this.teacher = teacher;
    }

    public int getStudent() {
        return student;
    }

    public void setStudent(int student) {
        this.student = student;
    }
}
