package com.example.carrentsys.repository;

import com.example.carrentsys.entity.RentingLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
public interface RentingLogRepository extends PagingAndSortingRepository<RentingLog,Integer> {
    Page<RentingLog> findById(int id, Pageable pageable);
}
