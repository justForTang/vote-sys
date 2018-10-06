package org.sicau.votesys.controller;

import org.sicau.votesys.domain.VO.ResultVO;
import org.sicau.votesys.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author beifengtz
 * @Date Created in 0:58 2018/10/7
 * @Description:
 */
@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/stats")
    public ResultVO stats(){
        return statisticsService.stats();
    }

    @GetMapping("/getFirstList")
    public ResultVO getFirstList(@RequestParam("collegeId") String collegeId){
        return statisticsService.getFirstList(collegeId);
    }

    @GetMapping("/getFirstCurrentData")
    public ResultVO getFirstCurrentData(@RequestParam("collegeId") String collegeId,
                                        @RequestParam("voteField") int voteField){
        return statisticsService.getFirstCurrentData(collegeId,voteField);
    }
}
