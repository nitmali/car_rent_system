package com.example.carrentsys.service;

import com.example.carrentsys.entity.LoginLog;
import com.example.carrentsys.repository.LoginLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class LogService {
    private final LoginLogRepository loginLogRepository;

    @Autowired
    public LogService(LoginLogRepository loginLogRepository) {
        this.loginLogRepository = loginLogRepository;
    }

    public void save(LoginLog loginLog) {
        loginLogRepository.save(loginLog);
    }

}
