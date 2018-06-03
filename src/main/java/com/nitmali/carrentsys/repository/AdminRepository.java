package com.nitmali.carrentsys.repository;

import com.nitmali.carrentsys.entity.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {
    Admin findByUsername(String username);

    boolean existsByUsername(String username);

    List<Admin> findAll();
}
