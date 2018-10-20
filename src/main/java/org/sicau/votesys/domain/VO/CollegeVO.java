package org.sicau.votesys.domain.VO;

/**
 * @Author beifengtz
 * @Date Created in 16:56 2018/10/20
 * @Description:
 */
public class CollegeVO {
    /**
     * 学院id
     * */
    private String id;

    /**
     * 对应校区id
     * */
    private String campusName;

    /**
     * 学院名称
     * */
    private String collegeName;

    /**
     * 当前学院评选人数
     * */
    private String candidateNum;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCandidateNum() {
        return candidateNum;
    }

    public void setCandidateNum(String candidateNum) {
        this.candidateNum = candidateNum;
    }
}
