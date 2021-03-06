package com.nitmali.carrentsys.service;

import com.nitmali.carrentsys.entity.Car;
import com.nitmali.carrentsys.repository.CarRepository;
import com.nitmali.carrentsys.repository.RentingLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class CarService {
    private final CarRepository carRepository;
    private final RentingLogRepository rentingLogRepository;

    @Autowired
    public CarService(CarRepository carRepository, RentingLogRepository rentingLogRepository) {
        this.carRepository = carRepository;
        this.rentingLogRepository = rentingLogRepository;
    }

    public Car findOne(Long id) {
        return carRepository.findOne(id);
    }

    public void save(Car car) {
        carRepository.save(car);
    }

    public void delete(Long id) {
        carRepository.delete(id);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public List<Car> findByStatus(Car.Status status) {
        return carRepository.findByStatus(status);
    }

    public boolean existsByLicensePlate(String licensePlate) {
        return carRepository.existsByLicensePlate(licensePlate);
    }

    public Car findByLicensePlate(String licensePlate) {
        return carRepository.findByLicensePlate(licensePlate);
    }

    public Long countByStatus(Car.Status status) {
        return carRepository.countByStatus(status);
    }

    public List<Car> findByPriceOutof(Integer start, Integer end) {
        return carRepository.findByPriceOutof(start, end);
    }

    public List<Car> getAvailableCars(Timestamp planingLendStartTime, Timestamp planingLendEndTime) {
        if (planingLendEndTime.getTime() < planingLendStartTime.getTime()) return new ArrayList<>();
        List<Car> availableCars = new ArrayList<>(carRepository.findAll());
        availableCars.removeAll(rentingLogRepository.findUnavailableCars(planingLendStartTime, planingLendEndTime));
        availableCars.removeAll(carRepository.findByStatus(Car.Status.UNAVAILABLE));
        return availableCars;
    }

    public List<Car> getAvailableCars(Timestamp planingLendStartTime, Timestamp planingLendEndTime, int lowestPrice, int highestPrice) {
        if (lowestPrice >= highestPrice) return new ArrayList<>();
        List<Car> availableCars = getAvailableCars(planingLendStartTime, planingLendEndTime);
        availableCars.removeAll(carRepository.findByPriceOutof(lowestPrice, highestPrice));
        return availableCars;
    }
}
