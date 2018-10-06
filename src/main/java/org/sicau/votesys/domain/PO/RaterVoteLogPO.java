package org.sicau.votesys.domain.PO;

import java.util.Date;

/**
 * @Author beifengtz
 * @Date Created in 14:14 2018/10/6
 * @Description:
 */
public class RaterVoteLogPO {
    /**
     * 投票日志id
     * */
    private String id;

    /**
     * 投票者id ，对应User表
     * */
    private String raterId;

    /**
     * 投票轮次
     * */
    private int voteField;

    /**
     * 投票结果
     * */
    private String voteCandidateResult;

    /**
     * 投票时间
     * */
    private Date voteTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRaterId() {
        return raterId;
    }

    public void setRaterId(String raterId) {
        this.raterId = raterId;
    }

    public String getVoteCandidateResult() {
        return voteCandidateResult;
    }

    public void setVoteCandidateResult(String voteCandidateResult) {
        this.voteCandidateResult = voteCandidateResult;
    }

    public Date getVoteTime() {
        return voteTime;
    }

    public void setVoteTime(Date voteTime) {
        this.voteTime = voteTime;
    }

    public int getVoteField() {
        return voteField;
    }

    public void setVoteField(int voteField) {
        this.voteField = voteField;
    }
}
