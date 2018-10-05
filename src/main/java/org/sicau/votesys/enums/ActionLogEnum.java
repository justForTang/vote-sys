package org.sicau.votesys.enums;

/**
 * @Author beifengtz
 * @Date Created in 14:01 2018/10/5
 * @Description:
 */
public enum ActionLogEnum {

    LOGIN(0100,"登录"),
    VOTE(0101,"投票"),
    LOOK_VOTE(0102,"查看投票"),
    LOGOUT(0103,"退出登录");

    private int code;

    private String action;

    ActionLogEnum(int code,String action){
        this.action = action;
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
