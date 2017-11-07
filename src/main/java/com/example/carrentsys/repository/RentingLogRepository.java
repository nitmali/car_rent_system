package com.example.carrentsys.repository;

import com.example.carrentsys.entity.RentingLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RentingLogRepository extends PagingAndSortingRepository<RentingLog,Integer> {
    Page<RentingLog> findAll(Pageable pageable);
}
