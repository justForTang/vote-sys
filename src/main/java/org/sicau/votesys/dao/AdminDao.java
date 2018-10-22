package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.PO.AdminPO;

/**
 * @Author beifengtz
 * @Date Created in 22:41 2018/10/6
 * @Description:
 */
public interface AdminDao {
    AdminPO queryAdminInfoByUsernameAndPassword(@Param("username") String username,
                                                @Param("password") String password);

    String selectAdminNumById(@Param("id") String id);

    AdminPO queryAdminInfoByIdAndPassword(@Param("id")String id,@Param("password") String password);
}
