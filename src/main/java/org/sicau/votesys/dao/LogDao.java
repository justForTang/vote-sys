package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;

/**
 * @Author beifengtz
 * @Date Created in 14:10 2018/10/5
 * @Description:
 */
@Mapper
public interface LogDao {

    int insertActionLog(@Param("id") String id,
                        @Param("userId") String userId,
                        @Param("logTime") Date logTime,
                        @Param("logIp") String logIp,
                        @Param("logAction") String logAction);
}
