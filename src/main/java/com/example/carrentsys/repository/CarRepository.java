package com.example.carrentsys.repository;

import com.example.carrentsys.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    @RestResource(exported = false)
    @Override
    void delete(Integer id);

    List<Car> findAll();

    List<Car> findByStatus(@Param("status") Car.Status status);

    boolean existsByLicensePlate(String licensePlate);

    Car findByLicensePlate(String licensePlate);

    int countByStatus(Car.Status status);
}
