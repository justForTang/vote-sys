package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.AdminDao;
import org.sicau.votesys.domain.PO.AdminPO;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.enums.ConstantEnum;
import org.sicau.votesys.service.AdminService;
import org.sicau.votesys.util.ResultUtil;
import org.sicau.votesys.util.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 22:40 2018/10/6
 * @Description:
 */
@Service
public class AdminServiceImp implements AdminService {

    @Autowired
    private AdminDao adminDao;
    @Autowired
    private ResultUtil resultUtil;

    @Override
    public ResultVO login(String username, String password, HttpServletRequest request) {
        if(username !=null && password !=null){
            AdminPO adminPO = adminDao.queryAdminInfoByUsernameAndPassword(username,password);
            if(adminPO == null){
                return resultUtil.loginError("用户名或密码错误");
            }else{
                SessionUtil.setSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),adminPO.getId(),request.getSession());
                return resultUtil.success();
            }
        }else{
            return resultUtil.paramError("用户名或密码错误");
        }
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
