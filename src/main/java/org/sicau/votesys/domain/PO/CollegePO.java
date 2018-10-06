package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 14:04 2018/10/6
 * @Description:
 */
public class CollegePO {
    /**
     * 学院id
     * */
    private String id;

    /**
     * 对应校区id
     * */
    private String campusId;

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

    public String getCampusId() {
        return campusId;
    }

    public void setCampusId(String campusId) {
        this.campusId = campusId;
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
