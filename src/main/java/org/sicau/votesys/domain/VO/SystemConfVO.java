package org.sicau.votesys.domain.VO;

/**
 * @Author beifengtz
 * @Date Created in 20:03 2018/10/19
 * @Description:
 */
public class SystemConfVO {
    private String title;

    private String singleTitle;

    private String screenPassword;

    private int timeOutLock = -1;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSingleTitle() {
        return singleTitle;
    }

    public void setSingleTitle(String singleTitle) {
        this.singleTitle = singleTitle;
    }

    public String getScreenPassword() {
        return screenPassword;
    }

    public void setScreenPassword(String screenPassword) {
        this.screenPassword = screenPassword;
    }

    public int getTimeOutLock() {
        return timeOutLock;
    }

    public void setTimeOutLock(int timeOutLock) {
        this.timeOutLock = timeOutLock;
    }
}
