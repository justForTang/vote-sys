package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 11:14 2018/10/22
 * @Description:
 */
public class SecondDataPO {
    private String id;

    private int passNum;

    private int voteRule;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPassNum() {
        return passNum;
    }

    public void setPassNum(int passNum) {
        this.passNum = passNum;
    }

    public int getVoteRule() {
        return voteRule;
    }

    public void setVoteRule(int voteRule) {
        this.voteRule = voteRule;
    }
}
