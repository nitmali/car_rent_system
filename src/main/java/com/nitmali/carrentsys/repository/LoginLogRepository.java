package com.nitmali.carrentsys.repository;

import com.nitmali.carrentsys.entity.LoginLog;
import org.springframework.data.repository.CrudRepository;

public interface LoginLogRepository extends CrudRepository<LoginLog, Long> {
}
