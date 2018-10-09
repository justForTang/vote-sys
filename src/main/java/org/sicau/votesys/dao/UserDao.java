package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.sicau.votesys.domain.PO.UserPO;

import java.util.List;

/**
 * @Author beifengtz
 * @Date Created in 10:14 2018/10/5
 * @Description:
 */
@Mapper
public interface UserDao {

    List<UserPO> selectAllUserInfo();

    UserPO selectUserByUsernameAndPassword(@Param("username") String username,
                                           @Param("password") String password);

    boolean updateUserInfoById(@Param("id") String id,
                               @Param("hasLog") boolean hasLog,
                               @Param("loginIp") String ip,
                               @Param("loginBrowserInfo") String loginBrowserInfo,
                               @Param("logCookieId") String logCookieId);

    String selectUserNumById(@Param("id") String id);

    boolean updateUserLogStatsByUsername(@Param("username") String username);

    boolean deleteUserByUsername(@Param("username") String username);

    boolean updateAllUserLogStats();

    UserPO selectUserById(@Param("id") String id);
}
