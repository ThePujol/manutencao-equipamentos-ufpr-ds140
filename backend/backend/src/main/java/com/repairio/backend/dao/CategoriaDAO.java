package com.repairio.backend.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.repairio.backend.model.Categoria;

@Repository
public class CategoriaDao {

    private final JdbcTemplate jdbcTemplate;

    public CategoriaDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Categoria> findAll() {
        return jdbcTemplate.query("SELECT * FROM categoria WHERE ativo = true",
                (rs, rowNum) -> {
                    Categoria c = new Categoria();
                    c.setId(rs.getLong("id"));
                    c.setDescricao(rs.getString("descricao"));
                    c.setAtivo(rs.getBoolean("ativo"));
                    return c;
                });
    }

    public Categoria findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM categoria WHERE id = ?",
                (rs, rowNum) -> {
                    Categoria c = new Categoria();
                    c.setId(rs.getLong("id"));
                    c.setDescricao(rs.getString("descricao"));
                    c.setAtivo(rs.getBoolean("ativo"));
                    return c;
                }, id);
    }

    public void save(Categoria categoria) {
        jdbcTemplate.update("INSERT INTO categoria (descricao, ativo) VALUES (?, ?)",
                categoria.getDescricao(), categoria.getAtivo());
    }

    public void update(Categoria categoria) {
        jdbcTemplate.update("UPDATE categoria SET descricao = ?, ativo = ? WHERE id = ?",
                categoria.getDescricao(), categoria.getAtivo(), categoria.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("UPDATE categoria SET ativo = false WHERE id = ?", id);
    }
}
