package com.repairio.backend.dao;

import com.repairio.backend.model.Pessoa;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
                    p.setNome(rs.getString("nome"));
                    p.setEmail(rs.getString("email"));
                    p.setSenha(rs.getString("senha"));
                    p.setSalt(rs.getString("salt"));
                    p.setTelefone(rs.getString("telefone"));
                    p.setCpf(rs.getString("cpf"));
                    p.setCep(rs.getString("cep"));
                    p.setLogradouro(rs.getString("logradouro"));
                    p.setNumero(rs.getString("numero"));
                    p.setComplemento(rs.getString("complemento"));
                    p.setBairro(rs.getString("bairro"));
                    p.setLocalidade(rs.getString("localidade"));
                    p.setUf(rs.getString("uf"));
                    p.setImagem(rs.getString("imagem"));
                    return p;
                });
    }

    public Pessoa findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM pessoa WHERE id = ?",
                (rs, rowNum) -> {
                    Pessoa p = new Pessoa();
                    p.setId(rs.getLong("id"));
                    p.setNome(rs.getString("nome"));
                    p.setEmail(rs.getString("email"));
                    p.setSenha(rs.getString("senha"));
                    p.setSalt(rs.getString("salt"));
                    p.setTelefone(rs.getString("telefone"));
                    p.setCpf(rs.getString("cpf"));
                    p.setCep(rs.getString("cep"));
                    p.setLogradouro(rs.getString("logradouro"));
                    p.setNumero(rs.getString("numero"));
                    p.setComplemento(rs.getString("complemento"));
                    p.setBairro(rs.getString("bairro"));
                    p.setLocalidade(rs.getString("localidade"));
                    p.setUf(rs.getString("uf"));
                    p.setImagem(rs.getString("imagem"));
                    return p;
                }, id);
    }

    public void save(Pessoa pessoa) {
        jdbcTemplate.update(
            "INSERT INTO pessoa (nome, email, senha, salt, telefone, cpf, cep, logradouro, numero, complemento, bairro, localidade, uf, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            pessoa.getNome(), pessoa.getEmail(), pessoa.getSenha(), pessoa.getSalt(),
            pessoa.getTelefone(), pessoa.getCpf(), pessoa.getCep(), pessoa.getLogradouro(),
            pessoa.getNumero(), pessoa.getComplemento(), pessoa.getBairro(), pessoa.getLocalidade(),
            pessoa.getUf(), pessoa.getImagem()
        );
    }

    public void update(Pessoa pessoa) {
        jdbcTemplate.update(
            "UPDATE pessoa SET nome = ?, email = ?, senha = ?, salt = ?, telefone = ?, cpf = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, localidade = ?, uf = ?, imagem = ? WHERE id = ?",
            pessoa.getNome(), pessoa.getEmail(), pessoa.getSenha(), pessoa.getSalt(),
            pessoa.getTelefone(), pessoa.getCpf(), pessoa.getCep(), pessoa.getLogradouro(),
            pessoa.getNumero(), pessoa.getComplemento(), pessoa.getBairro(), pessoa.getLocalidade(),
            pessoa.getUf(), pessoa.getImagem(), pessoa.getId()
        );
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM pessoa WHERE id = ?", id);
    }

    public Pessoa findByEmail(String email) {
    return jdbcTemplate.queryForObject("SELECT * FROM pessoa WHERE email = ?",
        (rs, rowNum) -> {
            Pessoa p = new Pessoa();
            p.setId(rs.getLong("id"));
            p.setNome(rs.getString("nome"));
            p.setEmail(rs.getString("email"));
            p.setSenha(rs.getString("senha"));
            p.setSalt(rs.getString("salt"));
            p.setTelefone(rs.getString("telefone"));
            p.setCpf(rs.getString("cpf"));
            p.setCep(rs.getString("cep"));
            p.setLogradouro(rs.getString("logradouro"));
            p.setNumero(rs.getString("numero"));
            p.setComplemento(rs.getString("complemento"));
            p.setBairro(rs.getString("bairro"));
            p.setLocalidade(rs.getString("localidade"));
            p.setUf(rs.getString("uf"));
            p.setImagem(rs.getString("imagem"));
            return p;
        }, email);
}
}