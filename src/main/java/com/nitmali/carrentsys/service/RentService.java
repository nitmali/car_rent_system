package com.nitmali.carrentsys.service;

import com.nitmali.carrentsys.entity.Car;
import com.nitmali.carrentsys.entity.Client;
import com.nitmali.carrentsys.entity.RentingLog;
import com.nitmali.carrentsys.repository.CarRepository;
import com.nitmali.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public RentingLog findOne(Long id) {
        return rentingLogRepository.findOne(id);
    }

    public void save(RentingLog rentingLog) {
        rentingLogRepository.save(rentingLog);
    }

    public List<Map> countLogsByCar() {
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

    public List<RentingLog> findByClient(Client client) {
        return rentingLogRepository.findByClient(client);
    }

    public List<RentingLog> findByClientAndStatus(Client client, RentingLog.Status status) {
        return rentingLogRepository.findByClientAndStatus(client, status);
    }

    public double calAmount(RentingLog rentingLog) {
        Long timediff = rentingLog.getLendEndTime().getTime() - rentingLog.getLendStartTime().getTime();
        timediff /= 1000;
        double time = timediff * 1.0 / (3600 * 24);
        return rentingLog.getCar().getPrice() * time;
    }
}
