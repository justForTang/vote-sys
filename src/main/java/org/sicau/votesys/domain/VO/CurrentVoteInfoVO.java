package org.sicau.votesys.domain.VO;

import org.sicau.votesys.domain.PO.CampusPO;
import org.sicau.votesys.domain.PO.CollegePO;

/**
 * @Author beifengtz
 * @Date Created in 14:32 2018/10/6
 * @Description:
 */
public class CurrentVoteInfoVO {

    /**
     * 唯一id
     * */
    private String id;
    /**
     * 是否开启投票系统
     * */
    private boolean startVote;
    /**
     * 是否开启学院投票
     * */
    private boolean startVoteCollege;
    /**
     * 当前投票场次（第一轮、第二轮）
     * */
    private int currentField;
    /**
     * 当前投票校区
     * */
    private CampusPO currentCampus;
    /**
     * 当前投票学院
     * */
    private CollegePO currentCollege;

    public boolean isStartVote() {
        return startVote;
    }

    public void setStartVote(boolean startVote) {
        this.startVote = startVote;
    }

    public boolean isStartVoteCollege() {
        return startVoteCollege;
    }

    public void setStartVoteCollege(boolean startVoteCollege) {
        this.startVoteCollege = startVoteCollege;
    }

    public int getCurrentField() {
        return currentField;
    }

    public void setCurrentField(int currentField) {
        this.currentField = currentField;
    }

    public CampusPO getCurrentCampus() {
        return currentCampus;
    }

    public void setCurrentCampus(CampusPO currentCampus) {
        this.currentCampus = currentCampus;
    }

    public CollegePO getCurrentCollege() {
        return currentCollege;
    }

    public void setCurrentCollege(CollegePO currentCollege) {
        this.currentCollege = currentCollege;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
