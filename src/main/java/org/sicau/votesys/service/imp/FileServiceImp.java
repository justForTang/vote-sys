package org.sicau.votesys.service.imp;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.sicau.votesys.service.FileService;
import org.sicau.votesys.util.ExcelUtil;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

/**
 * @Author beifengtz
 * @Site www.beifengtz.com
 * @Date Created in 16:32 2018/11/5
 * @Description:
 */
@Service
public class FileServiceImp implements FileService {
    @Override
    public void excelTest(HttpServletRequest request, HttpServletResponse response) {
        // excel标题
        String[] title = {"名称","性别","年龄"};

        // excel文件名
        String fileName = "学生信息表"+System.currentTimeMillis()+".xls";

        // sheet名
        String sheetName = "学生信息表";

        String [][] content = {{"hahha","lalall","151"},{"lalalla","lolololo","222"}} ;

        HSSFWorkbook wb = ExcelUtil.getHSSFWorkbook(sheetName,title,content,null);

        try{
            this.setResponseHeader(response,fileName);
            OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void setResponseHeader(HttpServletResponse response, String fileName) {
        try{
            fileName = new String(fileName.getBytes(),"utf-8");
            response.setContentType("application/octet-stream;charset=utf-8");
            response.setHeader("Content-Disposition","attachment;filename="+fileName);
            response.addHeader("Pargam","no-cache");
            response.addHeader("Cache-Control","no-cache");
        }catch (UnsupportedEncodingException e){
            e.printStackTrace();
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }
}
