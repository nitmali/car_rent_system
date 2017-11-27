package com.example.carrentsys.service;

import com.example.carrentsys.entity.RentingLog;
import com.example.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class RentService {
    private final RentingLogRepository rentingLogRepository;

    @Autowired
    public RentService(RentingLogRepository rentingLogRepository) {
        this.rentingLogRepository = rentingLogRepository;
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
}
