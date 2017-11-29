package com.example.carrentsys.service;

import com.example.carrentsys.entity.Client;
import com.example.carrentsys.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client findByUsername(String username) {
        return clientRepository.findByUsername(username);
    }

    public boolean existsByUsername(String username) {
        return clientRepository.existsByUsername(username);
    }

    public boolean existsByIdCard(String idCard) {
        return clientRepository.existsByIdCard(idCard);
    }

    public void save(Client client) {
        clientRepository.save(client);
    }
}
