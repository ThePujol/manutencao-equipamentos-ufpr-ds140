package com.repairio.backend.dao;

import com.repairio.backend.model.Pessoa;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PessoaDao {
    private final JdbcTemplate jdbcTemplate;

    public PessoaDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Pessoa> findAll() {
        return jdbcTemplate.query("SELECT * FROM pessoa",
                (rs, rowNum) -> {
                    Pessoa p = new Pessoa();
                    p.setId(rs.getLong("id"));
                    p.setEmail(rs.getString("email"));
                    p.setSenha(rs.getString("senha"));
                    p.setSalt(rs.getString("salt"));
                    p.setNome(rs.getString("nome"));
                    p.setCpf(rs.getString("cpf"));
                    p.setTel(rs.getString("tel"));
                    p.setCep(rs.getString("cep"));
                    p.setEstado(rs.getString("estado"));
                    p.setCidade(rs.getString("cidade"));
                    p.setEndereco(rs.getString("endereco"));
                    p.setNum(rs.getString("num"));
                    p.setComplemento(rs.getString("complemento"));
                    return p;
                });
    }

    public Pessoa findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM pessoa WHERE id = ?",
                (rs, rowNum) -> {
                    Pessoa p = new Pessoa();
                    p.setId(rs.getLong("id"));
                    p.setEmail(rs.getString("email"));
                    p.setSenha(rs.getString("senha"));
                    p.setSalt(rs.getString("salt"));
                    p.setNome(rs.getString("nome"));
                    p.setCpf(rs.getString("cpf"));
                    p.setTel(rs.getString("tel"));
                    p.setCep(rs.getString("cep"));
                    p.setEstado(rs.getString("estado"));
                    p.setCidade(rs.getString("cidade"));
                    p.setEndereco(rs.getString("endereco"));
                    p.setNum(rs.getString("num"));
                    p.setComplemento(rs.getString("complemento"));
                    return p;
                }, id);
    }

    public Pessoa save(Pessoa pessoa) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO pessoa (email, senha, salt, nome, cpf, tel, cep, estado, cidade, endereco, num, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, pessoa.getEmail());
            ps.setString(2, pessoa.getSenha());
            ps.setString(3, pessoa.getSalt());
            ps.setString(4, pessoa.getNome());
            ps.setString(5, pessoa.getCpf());
            ps.setString(6, pessoa.getTel());
            ps.setString(7, pessoa.getCep());
            ps.setString(8, pessoa.getEstado());
            ps.setString(9, pessoa.getCidade());
            ps.setString(10, pessoa.getEndereco());
            ps.setString(11, pessoa.getNum());
            ps.setString(12, pessoa.getComplemento());
            return ps;
        }, keyHolder);
        pessoa.setId(keyHolder.getKey().longValue());
        return pessoa;
    }

    public void update(Pessoa pessoa) {
        jdbcTemplate.update(
                "UPDATE pessoa SET email = ?, senha = ?, salt = ?, nome = ?, cpf = ?, tel = ?, cep = ?, estado = ?, cidade = ?, endereco = ?, num = ?, complemento = ? WHERE id = ?",
                pessoa.getEmail(), pessoa.getSenha(), pessoa.getSalt(), pessoa.getNome(), pessoa.getCpf(),
                pessoa.getTel(), pessoa.getCep(), pessoa.getEstado(), pessoa.getCidade(), pessoa.getEndereco(),
                pessoa.getNum(), pessoa.getComplemento(), pessoa.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM pessoa WHERE id = ?", id);
    }

    public Pessoa findByEmail(String email) {
        return jdbcTemplate.queryForObject("SELECT * FROM pessoa WHERE email = ?",
                (rs, rowNum) -> {
                    Pessoa p = new Pessoa();
                    p.setId(rs.getLong("id"));
                    p.setEmail(rs.getString("email"));
                    p.setSenha(rs.getString("senha"));
                    p.setSalt(rs.getString("salt"));
                    p.setNome(rs.getString("nome"));
                    p.setCpf(rs.getString("cpf"));
                    p.setTel(rs.getString("tel"));
                    p.setCep(rs.getString("cep"));
                    p.setEstado(rs.getString("estado"));
                    p.setCidade(rs.getString("cidade"));
                    p.setEndereco(rs.getString("endereco"));
                    p.setNum(rs.getString("num"));
                    p.setComplemento(rs.getString("complemento"));
                    return p;
                }, email);
    }
}