package com.example.carrentsys.repository;

import com.example.carrentsys.entity.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client,Integer> {
    Client findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByIdCard(String idCard);
}
