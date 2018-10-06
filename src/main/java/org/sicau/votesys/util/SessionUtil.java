package org.sicau.votesys.util;

import javax.servlet.http.HttpSession;

/**
 * @Author beifengtz
 * @Date Created in 8:50 2018/10/6
 * @Description:
 */
public class SessionUtil {

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/6 8:54
     * @Description: 存session
     * @param
     * @return
     */
    public static String setSession(String key,String value, HttpSession session){
        try{
            session.setAttribute(key,value);
        }catch (NullPointerException e){
            e.printStackTrace();
            return null;
        }
        return value;
    }

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/6 8:54
     * @Description: 获取session内容
     * @param
     * @return
     */
    public static String getSession(String key, HttpSession session){
        try{
            String value = (String) session.getAttribute(key);
            if(value!=null){
                return value;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
