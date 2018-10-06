package org.sicau.votesys.service;

import org.sicau.votesys.domain.VO.ResultVO;

/**
 * @Author beifengtz
 * @Date Created in 0:59 2018/10/7
 * @Description:
 */
public interface StatisticsService {
    ResultVO stats();

    ResultVO getFirstList(String collegeId);

    ResultVO getFirstCurrentData(String collegeId,int voteField);
}
