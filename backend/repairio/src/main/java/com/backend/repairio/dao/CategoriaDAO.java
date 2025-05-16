package com.backend.repairio.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.backend.repairio.model.Categoria;
import com.backend.repairio.repository.CategoriaRepository;

@Repository
public class CategoriaDAO {
    @Autowired
    private CategoriaRepository repo;

    public Categoria salvar(Categoria categoria) {
        return repo.save(categoria);
    }

    public List<Categoria> listarTodos() {
        return repo.findAll();
    }

    public Optional<Categoria> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }
}
