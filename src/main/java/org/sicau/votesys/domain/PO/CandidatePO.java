package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 14:08 2018/10/6
 * @Description:
 */
public class CandidatePO {
    /**
     * 竞选人id
     * */
    private String id;

    /**
     * 竞选人所在学院id
     * */
    private String collegeId;

    /**
     * 竞选人名字
     * */
    private String candidateName;

    /**
     * 竞选人学号
     * */
    private String candidateNumber;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getCandidateNumber() {
        return candidateNumber;
    }

    public void setCandidateNumber(String candidateNumber) {
        this.candidateNumber = candidateNumber;
    }
}
