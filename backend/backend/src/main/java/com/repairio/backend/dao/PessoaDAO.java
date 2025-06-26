package com.repairio.backend.dao;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.repairio.backend.model.Pessoa;

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

    public void save(Pessoa pessoa) {
        jdbcTemplate.update(
                "INSERT INTO pessoa (email, senha, salt, nome, cpf, tel, cep, estado, cidade, endereco, num, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                pessoa.getEmail(), pessoa.getSenha(), pessoa.getSalt(), pessoa.getNome(), pessoa.getCpf(),
                pessoa.getTel(), pessoa.getCep(), pessoa.getEstado(), pessoa.getCidade(), pessoa.getEndereco(),
                pessoa.getNum(), pessoa.getComplemento());
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
        try {
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
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM pessoa WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    public boolean existsByCpf(String cpf) {
        String sql = "SELECT COUNT(*) FROM pessoa WHERE cpf = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, cpf);
        return count != null && count > 0;
    }
}
