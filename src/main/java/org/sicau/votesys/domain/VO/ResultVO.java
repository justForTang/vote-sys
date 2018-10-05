package org.sicau.votesys.domain.VO;

/**
 * @Author beifengtz
 * @Date Created in 12:25 2018/10/5
 * @Description:
 */
public class ResultVO {
    private int code;

    private String msg;

    private Object data;

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

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
