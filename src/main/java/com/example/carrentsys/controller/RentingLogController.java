package com.example.carrentsys.controller;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.entity.RentingLog;
import com.example.carrentsys.repository.AdminRepository;
import com.example.carrentsys.repository.CarRepository;
import com.example.carrentsys.repository.ClientRepository;
import com.example.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @RequestMapping("/test")
    @ResponseBody
    public Page<RentingLog> test(@PageableDefault(value = 15, sort = { "id" }, direction = Sort.Direction.ASC)Pageable pageable){
        return rentingLogRepository.findAll(pageable);
    }

}
