package org.sicau.votesys.service;

import org.sicau.votesys.domain.PO.UserPO;
import org.sicau.votesys.domain.VO.ResultVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @Author beifengtz
 * @Date Created in 12:14 2018/10/5
 * @Description:
 */
public interface UserService {

    ResultVO login(String username, String password, String loginBrowserInfo, HttpServletRequest request, HttpServletResponse response);

    ResultVO checkLogStats(HttpServletRequest request);

    ResultVO logout(HttpServletRequest request);

    ResultVO getAllUserListByAdmin(int page,int limit,HttpServletRequest request);

    ResultVO updateUserLogStats(String username, HttpServletRequest request);

    ResultVO updateAllUserLogStats(List<String> usernameList, HttpServletRequest request);

    ResultVO deleteUser(String id, HttpServletRequest request);

    ResultVO getUserCount();

    ResultVO insertUser(UserPO userPO, HttpServletRequest request);
}
