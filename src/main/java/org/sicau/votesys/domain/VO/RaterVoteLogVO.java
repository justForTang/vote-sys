package org.sicau.votesys.domain.VO;

import org.sicau.votesys.domain.PO.UserPO;

import java.util.Date;

/**
 * @Author beifengtz
 * @Date Created in 2:51 2018/10/7
 * @Description:
 */
public class RaterVoteLogVO {
    /**
     * 投票日志id
     * */
    private String id;

    /**
     * 投票者 ，对应User表
     * */
    private UserPO rater;

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

    public Object getRater() {
        return rater;
    }

    public void setRater(UserPO rater) {
        this.rater = rater;
    }

    public int getVoteField() {
        return voteField;
    }

    public void setVoteField(int voteField) {
        this.voteField = voteField;
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
}
