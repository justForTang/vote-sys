package org.sicau.votesys.domain.PO;

/**
 * @Author beifengtz
 * @Date Created in 14:06 2018/10/6
 * @Description:
 */
public class CampusPO {

    /**
     * 校区id
     * */
    private String id;

    /**
     * 校区名称
     * */
    private String campusName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }
}
