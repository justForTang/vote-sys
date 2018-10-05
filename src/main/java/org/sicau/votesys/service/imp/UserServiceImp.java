package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.UserDao;
import org.sicau.votesys.domain.PO.UserPO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.UserService;
import org.sicau.votesys.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    private ActionLogUtil actionLogUtil;
    @Autowired
    private UserDao userDao;

    @Override
    public ResultVO login(String username, String password, String loginBrowserInfo, HttpServletRequest request, HttpServletResponse response) {
        if (NetUtil.filterSqlString(username) && NetUtil.filterSqlString(password)){
            String ip = NetUtil.getIpAddress(request);
            UserPO userPO = userDao.selectUserByUsernameAndPassword(username,password);
            if(userPO == null){
                return resultUtil.loginError("用户名或密码错误");
            }else{
                boolean hasLog = true;
                if(userPO.isHasLog()){
                    // 登陆过，检查cookie
                    CookieUtil.getCookie(request,"sicau_vote_cookieid");
                }else {
                    // 未登录，注入cookie
                    CookieUtil.writeCookieWithTime(response,"sicau_vote_cookieid", IdUtil.getUUID(),"12d");
                }
                actionLogUtil.logLogin(userPO.getId(),ip);
                return resultUtil.success(userPO);
            }
        }else{
            return resultUtil.paramError("输入非法");
        }
    }
}
