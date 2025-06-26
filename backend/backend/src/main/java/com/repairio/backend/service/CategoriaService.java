package com.repairio.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repairio.backend.dao.CategoriaDao;
import com.repairio.backend.model.Categoria;

@Service
public class CategoriaService {

    private final CategoriaDao categoriaDao;

    public CategoriaService(CategoriaDao categoriaDao) {
        this.categoriaDao = categoriaDao;
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
        categoriaDao.delete(id);
    }
}
