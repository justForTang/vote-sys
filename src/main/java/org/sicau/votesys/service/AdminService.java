package org.sicau.votesys.service;

import org.sicau.votesys.domain.VO.ResultVO;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 22:40 2018/10/6
 * @Description:
 */
public interface AdminService {
    ResultVO login(String username, String password, HttpServletRequest request);
}
