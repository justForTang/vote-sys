package org.sicau.votesys.domain.VO;

import org.sicau.votesys.domain.PO.CandidatePO;

/**
 * @Author beifengtz
 * @Date Created in 18:03 2018/10/6
 * @Description:
 */
public class CandidateVO extends CandidatePO {
    private String collegeName;

    private String campusName;

    public CandidateVO() {
        super();
    }

    public CandidateVO(String id, String collegeId, String candidateName) {
        super(id, collegeId, candidateName);
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }
}
