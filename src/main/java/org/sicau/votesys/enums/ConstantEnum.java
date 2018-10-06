package org.sicau.votesys.enums;

/**
 * @Author beifengtz
 * @Date Created in 9:00 2018/10/6
 * @Description:
 */
public enum  ConstantEnum {

    COOKIE_NAME("sicau_vote_cookieid"),
    COOKIE_NAME_ADMIN("sicau_vote_admin_cookieid"),
    SESSION_NAME("sicau_vote_sessionid"),
    SESSION_NAME_ADMIN("sicau_vote_admin_sessionid");

    private String value;

    ConstantEnum(String value){
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
