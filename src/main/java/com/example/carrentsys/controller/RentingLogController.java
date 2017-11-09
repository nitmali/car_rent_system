package com.example.carrentsys.controller;

import com.example.carrentsys.Utils;
import com.example.carrentsys.entity.RentingLog;
import com.example.carrentsys.repository.AdminRepository;
import com.example.carrentsys.repository.CarRepository;
import com.example.carrentsys.repository.ClientRepository;
import com.example.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class RentingLogController {
    private final RentingLogRepository rentingLogRepository;
    private final CarRepository carRepository;
    private final ClientRepository clientRepository;
    private final AdminRepository adminRepository;

    @Autowired
    public RentingLogController(RentingLogRepository rentingLogRepository, CarRepository carRepository, ClientRepository clientRepository, AdminRepository adminRepository) {
        this.rentingLogRepository = rentingLogRepository;
        this.carRepository = carRepository;
        this.clientRepository = clientRepository;
        this.adminRepository = adminRepository;
    }

    @RequestMapping("/getRentingLog")
    @ResponseBody
    public Map<String, Object> getRentingLog(HttpServletRequest request,
                                             @RequestParam(required = false) String callback,
                                             @RequestParam(required = false) String searchType,
                                             @RequestParam(value = "search[value]") String search,
                                             @RequestParam(required = false, defaultValue = "1") int draw,
                                             @RequestParam(required = false, defaultValue = "0") int start,
                                             @RequestParam(required = false, defaultValue = "10") int length) {
        PageRequest pagerequset = new PageRequest((start / length), length);
        Map<String, Object> maps = new HashMap<>();
        Page<RentingLog> page = rentingLogRepository.findAll(pagerequset);
        if (Utils.isNumeric(search)) {
            RentingLog rentingLog = rentingLogRepository.findOne(Integer.parseInt(search));
            List<RentingLog> list = new ArrayList<>();
            if (rentingLog != null) {
                list.add(rentingLog);
                maps.put("draw", draw);
                maps.put("recordsTotal", 1);
                maps.put("recordsFiltered", 1);
                maps.put("data", list);
            } else {
                list.add(new RentingLog());
                maps.put("draw", draw);
                maps.put("recordsTotal", 1);
                maps.put("recordsFiltered", 1);
                maps.put("data", list);
                maps.put("error", "无法找到相应编号");
            }
            return maps;
        }
        long totalCount = page.getTotalElements();
        maps.put("draw", draw);
        maps.put("recordsTotal", totalCount);
        maps.put("recordsFiltered", totalCount);
        maps.put("data", page.getContent());
        return maps;
    }
}
