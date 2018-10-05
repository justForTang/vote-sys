package org.sicau.votesys.enums;

/**
 * @Author beifengtz
 * @Date Created in 12:17 2018/10/5
 * @Description:
 */
public enum ResultEnum {

    UNKNOW_ERROR(-1,"未知错误"),
    SUCCESS(0,"成功"),
    LOGIN_ERROR(100001,"登录错误"),
    SOURCE_NOT_FOUND(100002,"资源未找到"),
    SOURCE_EXIST(100003,"资源已存在"),
    PARAM_ERROR(100004,"输入错误");

    private int code;
    private String msg;

    ResultEnum(int code,String msg){
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
