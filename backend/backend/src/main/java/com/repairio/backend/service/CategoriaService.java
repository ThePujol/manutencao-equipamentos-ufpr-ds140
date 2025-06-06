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

    public Categoria buscarPorId(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'buscarPorId'");
    }

    public Categoria criar(Categoria categoria) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'criar'");
    }

    public Categoria atualizar(Long id, Categoria categoria) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'atualizar'");
    }

    public void deletar(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletar'");
    }
}
