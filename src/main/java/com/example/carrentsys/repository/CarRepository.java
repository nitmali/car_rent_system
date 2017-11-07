package com.example.carrentsys.repository;

import com.example.carrentsys.entity.Car;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CarRepository extends CrudRepository<Car,Integer> {
    List<Car> findAll();
    List<Car> findByStatus(Car.Status status);
    boolean existsByLicensePlate(String licensePlate);
    Car findByLicensePlate(String licensePlate);
}
