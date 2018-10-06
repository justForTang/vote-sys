package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 14:00 2018/10/6
 * @Description:
 */
public class CurrentVotePO {
    /**
     * 当前投票管理id
     * */
    private String id;

    /**
     * 是否开启投票系统
     * */
    private boolean isStartVote;

    /**
     * 当前投票学院
     * */
    private String currentCollegeId;

    /**
     * 当前投票场次（第一轮、第二轮）
     * */
    private int currentField;

    /**
     * 是否开启学院投票
     * */
    private boolean isStartVoteCollege;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isStartVote() {
        return isStartVote;
    }

    public void setStartVote(boolean startVote) {
        isStartVote = startVote;
    }

    public String getCurrentCollegeId() {
        return currentCollegeId;
    }

    public void setCurrentCollegeId(String currentCollegeId) {
        this.currentCollegeId = currentCollegeId;
    }

    public int getCurrentField() {
        return currentField;
    }

    public void setCurrentField(int currentField) {
        this.currentField = currentField;
    }

    public boolean isStartVoteCollege() {
        return isStartVoteCollege;
    }

    public void setStartVoteCollege(boolean startVoteCollege) {
        isStartVoteCollege = startVoteCollege;
    }
}
