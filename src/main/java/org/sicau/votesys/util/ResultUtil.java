package org.sicau.votesys.util;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.enums.ResultEnum;
import org.springframework.stereotype.Component;

/**
 * @Author beifengtz
 * @Date Created in 12:16 2018/10/5
 * @Description:
 */
@Component
public class ResultUtil {
    /**
     * 成功
     * */
    public ResultVO success(){
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(ResultEnum.SUCCESS.getCode());
        resultVO.setMsg(ResultEnum.SUCCESS.getMsg());
        return resultVO;
    }
    public ResultVO success(String msg){
        ResultVO resultVO = this.success();
        resultVO.setMsg(msg);
        return resultVO;
    }
    public ResultVO success(Object data){
        ResultVO resultVO = this.success();
        resultVO.setData(data);
        return resultVO;
    }
    public ResultVO success(String msg,Object data){
        ResultVO resultVO = this.success();
        resultVO.setMsg(msg);
        resultVO.setData(data);
        return resultVO;
    }

    /**
     * 未知错误
     * */
    public ResultVO unknowError(){
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(ResultEnum.UNKNOW_ERROR.getCode());
        resultVO.setMsg(ResultEnum.UNKNOW_ERROR.getMsg());
        return resultVO;
    }
    public ResultVO unknowError(String msg){
        ResultVO resultVO = this.unknowError();
        resultVO.setMsg(msg);
        return resultVO;
    }
    public ResultVO unknowError(Object data){
        ResultVO resultVO = this.unknowError();
        resultVO.setData(data);
        return resultVO;
    }
    public ResultVO unknowError(String msg,Object data){
        ResultVO resultVO = this.unknowError();
        resultVO.setMsg(msg);
        resultVO.setData(data);
        return resultVO;
    }
    /**
     * 登录错误
     * */
    public ResultVO loginError(){
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(ResultEnum.LOGIN_ERROR.getCode());
        resultVO.setMsg(ResultEnum.LOGIN_ERROR.getMsg());
        return resultVO;
    }
    public ResultVO loginError(Object data){
        ResultVO resultVO = this.loginError();
        resultVO.setData(data);
        return resultVO;
    }
    public ResultVO loginError(String msg){
        ResultVO resultVO = this.loginError();
        resultVO.setMsg(msg);
        return resultVO;
    }
    public ResultVO loginError(String msg,Object data){
        ResultVO resultVO = this.loginError();
        resultVO.setMsg(msg);
        resultVO.setData(data);
        return resultVO;
    }

    /**
     * 资源未找到
     * */
    public ResultVO sourceNotFoundError(){
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(ResultEnum.SOURCE_NOT_FOUND.getCode());
        resultVO.setMsg(ResultEnum.SOURCE_NOT_FOUND.getMsg());
        return resultVO;
    }
    public ResultVO sourceNotFoundError(Object data){
        ResultVO resultVO = this.sourceNotFoundError();
        resultVO.setData(data);
        return resultVO;
    }
    public ResultVO sourceNotFoundError(String msg){
        ResultVO resultVO = this.sourceNotFoundError();
        resultVO.setMsg(msg);
        return resultVO;
    }
    public ResultVO sourceNotFoundError(String msg,Object data){
        ResultVO resultVO = this.sourceNotFoundError();
        resultVO.setMsg(msg);
        resultVO.setData(data);
        return resultVO;
    }
    /**
     * 资源已存在
     * */
    public ResultVO sourceExistError(){
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(ResultEnum.SOURCE_EXIST.getCode());
        resultVO.setMsg(ResultEnum.SOURCE_EXIST.getMsg());
        return resultVO;
    }
    public ResultVO sourceExistError(Object data){
        ResultVO resultVO = this.sourceExistError();
        resultVO.setData(data);
        return resultVO;
    }
    public ResultVO sourceExistError(String msg){
        ResultVO resultVO = this.sourceExistError();
        resultVO.setMsg(msg);
        return resultVO;
    }
    public ResultVO sourceExistError(String msg,Object data){
        ResultVO resultVO = this.sourceExistError();
        resultVO.setMsg(msg);
        resultVO.setData(data);
        return resultVO;
    }

    /**
     * 输入错误
     * */
    public ResultVO paramError(){
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(ResultEnum.PARAM_ERROR.getCode());
        resultVO.setMsg(ResultEnum.PARAM_ERROR.getMsg());
        return resultVO;
    }
    public ResultVO paramError(Object data){
        ResultVO resultVO = this.paramError();
        resultVO.setData(data);
        return resultVO;
    }
    public ResultVO paramError(String msg){
        ResultVO resultVO = this.paramError();
        resultVO.setMsg(msg);
        return resultVO;
    }
    public ResultVO paramError(String msg,Object data){
        ResultVO resultVO = this.paramError();
        resultVO.setMsg(msg);
        resultVO.setData(data);
        return resultVO;
    }
}
