package org.sicau.votesys.util;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author beifengtz
 * @Date Created in 12:51 2018/10/5
 * @Description:
 */
public class NetUtil {
    /**
     * 获取ip地址
     * */
    public static String getIpAddress(HttpServletRequest request){
        String ip = request.getHeader("X-Forwarded-For");
        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = ip.indexOf(",");
            if(index != -1){
                return ip.substring(0,index);
            }else{
                return ip;
            }
        }
        ip = request.getHeader("X-Real-IP");
        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            return ip;
        }
        return request.getRemoteAddr();
    }
    /**
     * sql敏感词过滤
     * */
    public static boolean filterSqlString(String str){
        String[] sqlList = {",","*","#","&","'","<",">","script","div"};
        for (String sqlStr : sqlList){
            if(sqlStr.indexOf(str) != -1) return false;
        }
        return true;
    }
}
