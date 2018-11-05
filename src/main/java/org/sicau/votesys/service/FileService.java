package org.sicau.votesys.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author beifengtz
 * @Site www.beifengtz.com
 * @Date Created in 16:32 2018/11/5
 * @Description:
 */
public interface FileService {
    void excelTest(HttpServletRequest request, HttpServletResponse response);

    void setResponseHeader(HttpServletResponse response,String fileName);
}
