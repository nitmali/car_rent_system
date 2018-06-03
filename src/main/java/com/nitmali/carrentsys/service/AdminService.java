package com.nitmali.carrentsys.service;

import com.nitmali.carrentsys.entity.Admin;
import com.nitmali.carrentsys.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class AdminService {
    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return adminRepository.existsByUsername(username);
    }

    public void save(Admin admin) {
        adminRepository.save(admin);
    }

    public void delete(Long id) {
        adminRepository.delete(id);
    }

    public List<Admin> findAll() {
        return adminRepository.findAll();
    }
}
