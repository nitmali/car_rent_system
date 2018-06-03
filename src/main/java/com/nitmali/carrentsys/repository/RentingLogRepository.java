package com.nitmali.carrentsys.repository;

import com.nitmali.carrentsys.entity.Car;
import com.nitmali.carrentsys.entity.Client;
import com.nitmali.carrentsys.entity.RentingLog;
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

    @Query(value = "SELECT DISTINCT r.car FROM RentingLog r WHERE (r.planingLendStartTime <?2 AND r.planingLendEndTime>?1) AND r.status LIKE 'PENDING' OR r.status LIKE 'PASS'")
    List<Car> findUnavailableCars(Timestamp planingStartTime, Timestamp planingEndTime);

    Long countByCar(Car car);

    List<RentingLog> findByClient(Client client);

    List<RentingLog> findByClientAndStatus(Client client, RentingLog.Status status);
}
