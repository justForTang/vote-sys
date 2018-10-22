package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 22:20 2018/10/8
 * @Description:
 */
public class SecondCandidatePO {
    private String id;

    private String collegeName;

    private String candidateName;

    private String sicauId;

    private int votedNum;

    public SecondCandidatePO(){

    }

    public SecondCandidatePO(String id,String collegeName, String candidateName, String sicauId) {
        this.id = id;
        this.collegeName = collegeName;
        this.candidateName = candidateName;
        this.sicauId = sicauId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getSicauId() {
        return sicauId;
    }

    public void setSicauId(String sicauId) {
        this.sicauId = sicauId;
    }

    public int getVotedNum() {
        return votedNum;
    }

    public void setVotedNum(int votedNum) {
        this.votedNum = votedNum;
    }
}
