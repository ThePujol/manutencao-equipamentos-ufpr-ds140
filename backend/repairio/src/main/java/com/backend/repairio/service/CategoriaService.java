package com.backend.repairio.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.backend.repairio.dao.CategoriaDAO;
import com.backend.repairio.model.Categoria;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaDAO categoriaDAO;

    public Categoria salvar(Categoria categoria) {
        return categoriaDAO.salvar(categoria);
    }

    public List<Categoria> listar() {
        return categoriaDAO.listarTodos();
    }

    public void excluir(Long id) {
        categoriaDAO.excluir(id);
    }
}
