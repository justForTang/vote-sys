package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.UserDao;
import org.sicau.votesys.domain.PO.UserPO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.UserService;
import org.sicau.votesys.util.ActionLogUtil;
import org.sicau.votesys.util.NetUtil;
import org.sicau.votesys.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 12:14 2018/10/5
 * @Description:
 */
@Service
public class UserServiceImp implements UserService {

    @Autowired
    private ResultUtil resultUtil;
    @Autowired
    private NetUtil netUtil;
    @Autowired
    private ActionLogUtil actionLogUtil;
    @Autowired
    private UserDao userDao;

    @Override
    public ResultVO login(String username, String password, HttpServletRequest request) {
        if (netUtil.filterSqlString(username) && netUtil.filterSqlString(password)){
            String ip = netUtil.getIpAddress(request);
            UserPO userPO = userDao.selectUserByUsernameAndPassword(username,password);
            actionLogUtil.logLogin(userPO.getId(),ip);
            return resultUtil.success(userPO);
        }else{
            return resultUtil.paramError("输入非法");
        }
    }
}
