package com.backend.repairio.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.backend.repairio.model.Endereco;
import com.backend.repairio.repository.EnderecoRepository;

@Repository
public class EnderecoDAO {
    @Autowired
    private EnderecoRepository repo;

    public Endereco salvar(Endereco endereco) {
        return repo.save(endereco);
    }
}
