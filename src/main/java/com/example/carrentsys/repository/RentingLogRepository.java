package com.example.carrentsys.repository;

import com.example.carrentsys.entity.Car;
import com.example.carrentsys.entity.RentingLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface RentingLogRepository extends JpaRepository<RentingLog, Long> {

    List<RentingLog> findByStatus(@Param("status") RentingLog.Status status);

    @Query(value = "SELECT r FROM RentingLog r WHERE r.status='PASS' AND r.lendEndTime IS NULL")
    List<RentingLog> findGivebackLogs();

    @Query(value = "SELECT DISTINCT r.car FROM RentingLog r WHERE (r.planingLendStartTime BETWEEN ?1 AND ?2 OR r.planingLendEndTime BETWEEN ?1 AND ?2) AND r.status LIKE 'PENDING' OR r.status LIKE 'USING'")
    List<Car> findUnavailableCars(Timestamp planingStartTime, Timestamp planingEndTime);

    Long countByCar(Car car);
}
