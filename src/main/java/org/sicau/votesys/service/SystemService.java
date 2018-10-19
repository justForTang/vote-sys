package org.sicau.votesys.service;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.domain.VO.SystemConfVO;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 20:00 2018/10/19
 * @Description:
 */
public interface SystemService {

    ResultVO getSysConf();

    ResultVO getSysConfWithAdmin(HttpServletRequest request);

    ResultVO setSystemConfig(HttpServletRequest request, SystemConfVO systemConfVO);
}
