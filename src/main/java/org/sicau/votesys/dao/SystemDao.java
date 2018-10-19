package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.VO.SystemConfVO;

/**
 * @Author beifengtz
 * @Date Created in 20:01 2018/10/19
 * @Description:
 */
@Mapper
public interface SystemDao {
    SystemConfVO selectSystemTitle();

    boolean setSystemConf(@Param("systemConfVO") SystemConfVO systemConfVO);
}
