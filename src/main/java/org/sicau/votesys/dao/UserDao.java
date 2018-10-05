package org.sicau.votesys.dao;

import org.apache.ibatis.annotations.Mapper;
import org.sicau.votesys.domain.VO.User;

/**
 * @Author beifengtz
 * @Date Created in 10:14 2018/10/5
 * @Description:
 */
@Mapper
public interface UserDao {

    User selectAllUserInfo();
}
