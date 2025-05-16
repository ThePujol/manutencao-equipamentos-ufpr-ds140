package com.backend.repairio.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.backend.repairio.model.Funcionario;
import com.backend.repairio.repository.FuncionarioRepository;

@Repository
public class FuncionarioDAO {
    @Autowired
    private FuncionarioRepository repo;

    public Funcionario salvar(Funcionario funcionario) {
        return repo.save(funcionario);
    }

    public List<Funcionario> listarTodos() {
        return repo.findAll();
    }

    public Optional<Funcionario> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }
}
