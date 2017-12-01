package com.example.carrentsys.service;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.entity.RentingLog;
import com.example.carrentsys.repository.CarRepository;
import com.example.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class RentService {
    private final RentingLogRepository rentingLogRepository;
    private final CarRepository carRepository;

    @Autowired
    public RentService(RentingLogRepository rentingLogRepository, CarRepository carRepository) {
        this.rentingLogRepository = rentingLogRepository;
        this.carRepository = carRepository;
    }

    public long countSubmits(Timestamp start, Timestamp end) {
        return rentingLogRepository.countRentingLogsBySubmitTimeBetween(start, end);
    }

    public List<RentingLog> findByStatus(RentingLog.Status status) {
        return rentingLogRepository.findByStatus(status);
    }

    public List<RentingLog> findGivebackLogs() {
        return rentingLogRepository.findGivebackLogs();
    }

    public List<RentingLog> findAll() {
        return rentingLogRepository.findAll();
    }

    public Page<RentingLog> findAll(PageRequest pageRequest) {
        return rentingLogRepository.findAll(pageRequest);
    }

    public RentingLog findOne(Integer id) {
        return rentingLogRepository.findOne(id);
    }

    public void save(RentingLog rentingLog) {
        rentingLogRepository.save(rentingLog);
    }

    public List<Map> countByCar() {
        List<Car> list = carRepository.findAll();
        List<Map> ret = new ArrayList<>();
        for (Car car : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("licensePlate", car.getLicensePlate());
            map.put("count", rentingLogRepository.countByCar(car));
            ret.add(map);
        }
        return ret;
    }
}
