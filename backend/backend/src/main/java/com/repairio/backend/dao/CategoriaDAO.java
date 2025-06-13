package com.repairio.backend.dao;

import com.repairio.backend.model.Categoria;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CategoriaDao {
    private final JdbcTemplate jdbcTemplate;

    public CategoriaDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Categoria> findAll() {
        return jdbcTemplate.query("SELECT * FROM categoria",
                (rs, rowNum) -> {
                    Categoria c = new Categoria();
                    c.setId(rs.getLong("id"));
                    c.setDescricao(rs.getString("descricao"));
                    return c;
                });
    }

    public Categoria findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM categoria WHERE id = ?",
                (rs, rowNum) -> {
                    Categoria c = new Categoria();
                    c.setId(rs.getLong("id"));
                    c.setDescricao(rs.getString("descricao"));
                    return c;
                }, id);
    }

    public Categoria save(Categoria categoria) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO categoria (descricao) VALUES (?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, categoria.getDescricao());
            return ps;
        }, keyHolder);
        categoria.setId(keyHolder.getKey().longValue());
        return categoria;
    }

    public void update(Categoria categoria) {
        jdbcTemplate.update("UPDATE categoria SET descricao = ? WHERE id = ?",
                categoria.getDescricao(), categoria.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM categoria WHERE id = ?", id);
    }
}