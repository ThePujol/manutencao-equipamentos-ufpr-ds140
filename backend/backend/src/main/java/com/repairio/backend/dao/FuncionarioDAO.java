package com.repairio.backend.dao;

import com.repairio.backend.model.Funcionario;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class FuncionarioDao {
    private final JdbcTemplate jdbcTemplate;

    public FuncionarioDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Funcionario> findAll() {
        return jdbcTemplate.query("SELECT * FROM funcionario",
                (rs, rowNum) -> {
                    Funcionario f = new Funcionario();
                    f.setId(rs.getLong("id"));
                    f.setNome(rs.getString("nome"));
                    f.setEmail(rs.getString("email"));
                    f.setSenha(rs.getString("senha"));
                    f.setSalt(rs.getString("salt"));
                    f.setDataNasc(rs.getDate("data_nasc").toLocalDate());
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
                    return f;
                }, id);
    }

    public Funcionario save(Funcionario funcionario) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO funcionario (nome, email, senha, salt, data_nasc) VALUES (?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, funcionario.getNome());
            ps.setString(2, funcionario.getEmail());
            ps.setString(3, funcionario.getSenha());
            ps.setString(4, funcionario.getSalt());
            ps.setDate(5, java.sql.Date.valueOf(funcionario.getDataNasc()));
            return ps;
        }, keyHolder);
        funcionario.setId(keyHolder.getKey().longValue());
        return funcionario;
    }

    public void update(Funcionario funcionario) {
        jdbcTemplate.update(
                "UPDATE funcionario SET nome = ?, email = ?, senha = ?, salt = ?, data_nasc = ? WHERE id = ?",
                funcionario.getNome(), funcionario.getEmail(), funcionario.getSenha(),
                funcionario.getSalt(), Date.valueOf(funcionario.getDataNasc()), funcionario.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM funcionario WHERE id = ?", id);
    }

    public Funcionario findByEmail(String email) {
        return jdbcTemplate.queryForObject("SELECT * FROM funcionario WHERE email = ?",
                (rs, rowNum) -> {
                    Funcionario f = new Funcionario();
                    f.setId(rs.getLong("id"));
                    f.setNome(rs.getString("nome"));
                    f.setEmail(rs.getString("email"));
                    f.setSenha(rs.getString("senha"));
                    f.setSalt(rs.getString("salt"));
                    f.setDataNasc(rs.getDate("data_nasc").toLocalDate());
                    return f;
                }, email);
    }
}