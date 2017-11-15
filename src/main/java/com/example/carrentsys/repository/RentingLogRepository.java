package com.example.carrentsys.repository;

import com.example.carrentsys.entity.RentingLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface RentingLogRepository extends JpaRepository<RentingLog, Integer> {
    @RestResource(exported = false)
    @Override
    void delete(Integer id);

    long countRentingLogsBySubmitTimeBetween(Timestamp start, Timestamp end);

    List<RentingLog> findByStatus(@Param("status") RentingLog.Status status);
}
