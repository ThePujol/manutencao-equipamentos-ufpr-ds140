package com.repairio.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repairio.backend.dao.CategoriaDao;
import com.repairio.backend.dao.SolicitacaoDao;
import com.repairio.backend.exception.CategoriaConstraintException;
import com.repairio.backend.model.Categoria;

@Service
public class CategoriaService {

    private final CategoriaDao categoriaDao;
    private final SolicitacaoDao solicitacaoDao;

    public CategoriaService(CategoriaDao categoriaDao, SolicitacaoDao solicitacaoDao) {
        this.categoriaDao = categoriaDao;
        this.solicitacaoDao = solicitacaoDao;
    }

    public List<Categoria> findAll() {
        return categoriaDao.findAll();
    }

    public Categoria findById(Long id) {
        return categoriaDao.findById(id);
    }

    public void save(Categoria categoria) {
        categoriaDao.save(categoria);
    }

    public void update(Categoria categoria) {
        categoriaDao.update(categoria);
    }

    public void delete(Long id) {
        if (solicitacaoDao.findByCategoryId(id) != null) {
            throw new CategoriaConstraintException("Esta categoria está atrelada a uma ou mais solicitações.");
        }
        categoriaDao.delete(id);
    }
}
