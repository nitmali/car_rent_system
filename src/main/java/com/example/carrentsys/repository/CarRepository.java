package com.example.carrentsys.repository;

import com.example.carrentsys.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findAll();

    List<Car> findByStatus(Car.Status status);

    boolean existsByLicensePlate(String licensePlate);

    Car findByLicensePlate(String licensePlate);

    Long countByStatus(Car.Status status);

    @Query(value = "SELECT c FROM Car c WHERE c.price<=?1 OR c.price>=?2")
    List<Car> findByPriceOutof(Integer start, Integer end);
}
