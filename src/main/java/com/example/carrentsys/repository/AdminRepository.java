package com.example.carrentsys.repository;

import com.example.carrentsys.entity.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin,InternalError>{
    Admin findByUsername(String username);
    boolean existsByUsername(String username);
}
