package com.nitmali.carrentsys.repository;

import com.nitmali.carrentsys.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByIdCard(String idCard);

    List<Client> findAll();
}
