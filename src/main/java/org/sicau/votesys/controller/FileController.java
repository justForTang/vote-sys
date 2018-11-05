package org.sicau.votesys.controller;

import org.sicau.votesys.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author beifengtz
 * @Site www.beifengtz.com
 * @Date Created in 16:30 2018/11/5
 * @Description:
 */
@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping("/export")
    public void export(HttpServletRequest request, HttpServletResponse response){
        fileService.excelTest(request,response);
    }
}
