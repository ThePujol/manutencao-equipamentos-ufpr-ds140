package com.backend.repairio.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.backend.repairio.model.Cliente;
import com.backend.repairio.repository.ClienteRepository;

@Repository
public class ClienteDAO {
    @Autowired
    private ClienteRepository repo;

    public Cliente salvar(Cliente cliente) {
        return repo.save(cliente);
    }

    public List<Cliente> listarTodos() {
        return repo.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }
}
