package org.sicau.votesys.service;

import org.sicau.votesys.domain.VO.ResultVO;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 12:14 2018/10/5
 * @Description:
 */
public interface UserService {

    ResultVO login(String username, String password, HttpServletRequest request);

}
