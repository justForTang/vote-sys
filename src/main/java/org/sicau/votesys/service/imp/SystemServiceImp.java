package org.sicau.votesys.service.imp;

import org.sicau.votesys.dao.AdminDao;
import org.sicau.votesys.dao.SystemDao;
import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.domain.VO.SystemConfVO;
import org.sicau.votesys.enums.ConstantEnum;
import org.sicau.votesys.service.SystemService;
import org.sicau.votesys.util.ResultUtil;
import org.sicau.votesys.util.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 20:00 2018/10/19
 * @Description:
 */
@Service
public class SystemServiceImp implements SystemService {

    @Autowired
    private AdminDao adminDao;
    @Autowired
    private ResultUtil resultUtil;
    @Autowired
    private SystemDao systemDao;


    @Override
    public ResultVO getSysConf() {
        SystemConfVO systemConfVO = systemDao.selectSystemTitle();
        if (systemConfVO != null){
            systemConfVO.setTimeOutLock(-1);
            systemConfVO.setScreenPassword(null);
            return resultUtil.success(systemConfVO);
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO getSysConfWithAdmin(HttpServletRequest request) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        SystemConfVO systemConfVO = systemDao.selectSystemTitle();
        if (systemConfVO != null){
            return resultUtil.success(systemConfVO);
        }
        return resultUtil.unknowError();
    }

    @Override
    public ResultVO setSystemConfig(HttpServletRequest request, SystemConfVO systemConfVO) {
        String sessionValue = SessionUtil.getSession(ConstantEnum.SESSION_NAME_ADMIN.getValue(),request.getSession());
        if (sessionValue ==null){
            return resultUtil.loginError();
        }else{
            if(adminDao.selectAdminNumById(sessionValue) == null) return resultUtil.loginError();
        }
        if(systemDao.setSystemConf(systemConfVO)){
            return resultUtil.success();
        }
        return resultUtil.unknowError();
    }
}
