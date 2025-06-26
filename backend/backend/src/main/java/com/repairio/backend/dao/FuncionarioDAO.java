package com.repairio.backend.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.repairio.backend.model.Funcionario;

@Repository
public class FuncionarioDao {

    private final JdbcTemplate jdbcTemplate;

    public FuncionarioDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Funcionario> findAll() {
        return jdbcTemplate.query("SELECT * FROM funcionario WHERE ativo = true",
                (rs, rowNum) -> {
                    Funcionario f = new Funcionario();
                    f.setId(rs.getLong("id"));
                    f.setNome(rs.getString("nome"));
                    f.setEmail(rs.getString("email"));
                    f.setSenha(rs.getString("senha"));
                    f.setSalt(rs.getString("salt"));
                    f.setDataNasc(rs.getDate("data_nasc").toLocalDate());
                    f.setAtivo(rs.getBoolean("ativo"));
                    return f;
                });
    }

    public Funcionario findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM funcionario WHERE id = ?",
                (rs, rowNum) -> {
                    Funcionario f = new Funcionario();
                    f.setId(rs.getLong("id"));
                    f.setNome(rs.getString("nome"));
                    f.setEmail(rs.getString("email"));
                    f.setSenha(rs.getString("senha"));
                    f.setSalt(rs.getString("salt"));
                    f.setDataNasc(rs.getDate("data_nasc").toLocalDate());
                    f.setAtivo(rs.getBoolean("ativo"));
                    return f;
                }, id);
    }

    public void save(Funcionario funcionario) {
        jdbcTemplate.update(
                "INSERT INTO funcionario (nome, email, senha, salt, data_nasc, ativo) VALUES (?, ?, ?, ?, ?, ?)",
                funcionario.getNome(), funcionario.getEmail(), funcionario.getSenha(),
                funcionario.getSalt(), Date.valueOf(funcionario.getDataNasc()), funcionario.getAtivo());
    }

    public void update(Funcionario funcionario) {
        jdbcTemplate.update(
                "UPDATE funcionario SET nome = ?, email = ?, senha = ?, salt = ?, data_nasc = ?, ativo = ? WHERE id = ?",
                funcionario.getNome(), funcionario.getEmail(), funcionario.getSenha(),
                funcionario.getSalt(), Date.valueOf(funcionario.getDataNasc()), funcionario.getAtivo(),
                funcionario.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("UPDATE funcionario SET ativo = false WHERE id = ?", id);
    }

    public Funcionario findByEmail(String email) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM funcionario WHERE email = ?",
                    (rs, rowNum) -> {
                        Funcionario f = new Funcionario();
                        f.setId(rs.getLong("id"));
                        f.setNome(rs.getString("nome"));
                        f.setEmail(rs.getString("email"));
                        f.setSenha(rs.getString("senha"));
                        f.setSalt(rs.getString("salt"));
                        f.setDataNasc(rs.getDate("data_nasc").toLocalDate());
                        f.setAtivo(rs.getBoolean("ativo"));
                        return f;
                    }, email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
