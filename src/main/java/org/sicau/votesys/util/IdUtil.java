package org.sicau.votesys.util;

import java.util.UUID;

/**
 * @Author beifengtz
 * @Date Created in 14:34 2018/10/5
 * @Description:
 */
public class IdUtil {

    /**
     * @Author beifengtz
     * @Date Created in 2018/10/5 14:36
     * @Description: 获取UUID，去掉“-”符号
     * @param null
     * @return String
     */
    public static String getUUID(){
        return String.valueOf(UUID.randomUUID()).replace("-","");
    }
}
