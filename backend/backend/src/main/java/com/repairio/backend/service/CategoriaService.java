package com.repairio.backend.service;

import com.repairio.backend.dao.CategoriaDao;
import com.repairio.backend.model.Categoria;
import org.springframework.stereotype.Service;

import java.util.List;

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
