package org.sicau.votesys.domain.VO;

/**
 * @Author beifengtz
 * @Date Created in 13:07 2018/10/7
 * @Description:
 */
public class FirstVoteResultVO {

    /**
     * 得票人id
     * */
    private String candidateId;

    /**
     * 得票人姓名
     * */
    private String candidateName;

    /**
     * 得票人所在学院
     * */
    private String collegeName;

    /**
     * 总票数
     * */
    private int sum;

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public int getSum() {
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }
}
