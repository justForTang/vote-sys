package org.sicau.votesys.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author beifengtz
 * @Date Created in 16:53 2018/10/5
 * @Description:
 */
public class CookieUtil {
    private static final Object Expression = "cuowu ";

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/5 17:01
     * @Description: 通过cookieName获取cookie值
     * @param
     * @return
     */
    public static String getCookie(HttpServletRequest request, String cookieName){

        Cookie[] cookies =  request.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals(cookieName)){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/5 17:02
     * @Description: 存入cookie值，时间为1个小时
     * @param
     * @return
     */
    public static void writeCookie(HttpServletResponse response, String cookieName, String value){
        Cookie cookie = new Cookie(cookieName,value);
        cookie.setPath("/");
        cookie.setMaxAge(3600);
        response.addCookie(cookie);
    }

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/5 17:02
     * @Description: 存cookie值，自定义时间
     * @param
     * @return
     */
    public static void writeCookieWithTime(HttpServletResponse response, String sicau_vote_cookieid, String uuid, String maxAge) {

    }

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/5 17:08
     * @Description: 将字符串转换为秒数，支持d(D)、h(H)、s(S)标志,
     * 例如“1d”表示一天，“1h”表示一小时，“1s”表示一秒
     * 数字在前，标志在最后，必须遵守此格式，否则返回null
     * @param
     * @return Integer
     */
    private Integer getIntegerTimeByString(String time){
        String tag = time.substring(time.length()-1);
        switch (tag.toLowerCase()){
            case "d":
                Integer tempTime1 = Integer.valueOf(time.substring(0,time.length()-1));
                return tempTime1 * 86400;
            case "h":
                Integer tempTime2 = Integer.valueOf(time.substring(0,time.length()-1));
                return tempTime2 * 3600;
            case "s":
                Integer tempTime3 = Integer.valueOf(time.substring(0,time.length()-1));
                return tempTime3;
            default:
                return null;
        }
    }
}