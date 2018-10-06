package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.UserDao;
import org.sicau.votesys.domain.PO.UserPO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.enums.ConstantEnum;
import org.sicau.votesys.service.UserService;
import org.sicau.votesys.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                userPO.setPassword(null);
                if(userPO.isHasLog()){
                    // 登陆过，检查cookie
                    if(!userPO.getLogCookieId().equals(CookieUtil.getCookie(request,ConstantEnum.COOKIE_NAME.getValue()))){
                        return resultUtil.loginError("您已有登录记录，该系统仅限在同一设备、同一浏览器登录，请使用首次登录设备和浏览器登录。");
                    }
                }else {
                    // 未登录，注入cookie
                    String logCookieId = IdUtil.getUUID();
                    CookieUtil.writeCookieWithTime(response, ConstantEnum.COOKIE_NAME.getValue(), logCookieId,"7d");
                    if(!userDao.updateUserInfoById(userPO.getId(),true,ip,loginBrowserInfo,logCookieId)){
                        return resultUtil.unknowError("系统错误：修改用户基本数据错误");
                    }
                }
                try{
                    actionLogUtil.logLogin(userPO.getId(),ip);
                }catch (Exception e){
                    e.printStackTrace();
                }
                SessionUtil.setSession(ConstantEnum.SESSION_NAME.getValue(),userPO.getId(),request.getSession());
                return resultUtil.success(userPO);
            }
        }else{
            return resultUtil.paramError("输入非法");
        }
    }

    @Override
    public ResultVO checkLogStats(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME.getValue(),request.getSession());
        if(sessionValue == null){
            return resultUtil.loginError("登录已失效");
        }else{
            if(userDao.selectUserNumById(sessionValue) > 0) return resultUtil.success();
        }
        return resultUtil.loginError();
    }

    @Override
    public ResultVO logout(HttpServletRequest request) {
        try{
            request.getSession().invalidate();
            return resultUtil.success();
        }catch (Exception e){
            return resultUtil.unknowError();
        }
    }
}
