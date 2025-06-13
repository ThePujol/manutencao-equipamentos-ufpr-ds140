package com.repairio.backend.dao;

import com.repairio.backend.model.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class SolicitacaoDao {
    private final JdbcTemplate jdbcTemplate;
    private final CategoriaDao categoriaDao;
    private final PessoaDao pessoaDao;
    private final FuncionarioDao funcionarioDao;

    public SolicitacaoDao(JdbcTemplate jdbcTemplate, CategoriaDao categoriaDao, PessoaDao pessoaDao,
            FuncionarioDao funcionarioDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.categoriaDao = categoriaDao;
        this.pessoaDao = pessoaDao;
        this.funcionarioDao = funcionarioDao;
    }

    public List<Solicitacao> findAll() {
        return jdbcTemplate.query("SELECT * FROM solicitacao",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDescricao(rs.getString("descricao"));
                    s.setCategoria(categoriaDao.findById(rs.getLong("categoria_id")));
                    s.setDefeito(rs.getString("defeito"));
                    s.setOrcamento(rs.getDouble("orcamento"));
                    s.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                    s.setCliente(pessoaDao.findById(rs.getLong("cliente_id")));
                    Long funcionarioId = rs.getLong("funcionario_id");
                    if (!rs.wasNull()) {
                        s.setFuncionario(funcionarioDao.findById(funcionarioId));
                    }
                    return s;
                });
    }

    public Solicitacao findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM solicitacao WHERE id = ?",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDescricao(rs.getString("descricao"));
                    s.setCategoria(categoriaDao.findById(rs.getLong("categoria_id")));
                    s.setDefeito(rs.getString("defeito"));
                    s.setOrcamento(rs.getDouble("orcamento"));
                    s.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                    s.setCliente(pessoaDao.findById(rs.getLong("cliente_id")));
                    Long funcionarioId = rs.getLong("funcionario_id");
                    if (!rs.wasNull()) {
                        s.setFuncionario(funcionarioDao.findById(funcionarioId));
                    }
                    return s;
                }, id);
    }

    public Solicitacao save(Solicitacao solicitacao) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO solicitacao (descricao, categoria_id, defeito, orcamento, situacao, cliente_id, funcionario_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, solicitacao.getDescricao());
            ps.setLong(2, solicitacao.getCategoria().getId());
            ps.setString(3, solicitacao.getDefeito());
            ps.setDouble(4, solicitacao.getOrcamento());
            ps.setString(5, solicitacao.getSituacao().name());
            ps.setLong(6, solicitacao.getCliente().getId());
            if (solicitacao.getFuncionario() != null) {
                ps.setLong(7, solicitacao.getFuncionario().getId());
            } else {
                ps.setNull(7, java.sql.Types.BIGINT);
            }
            return ps;
        }, keyHolder);
        solicitacao.setId(keyHolder.getKey().longValue());
        return solicitacao;
    }

    public void update(Solicitacao solicitacao) {
        jdbcTemplate.update(
                "UPDATE solicitacao SET descricao = ?, categoria_id = ?, defeito = ?, orcamento = ?, situacao = ?, cliente_id = ?, funcionario_id = ? WHERE id = ?",
                solicitacao.getDescricao(),
                solicitacao.getCategoria().getId(),
                solicitacao.getDefeito(),
                solicitacao.getOrcamento(),
                solicitacao.getSituacao().name(),
                solicitacao.getCliente().getId(),
                solicitacao.getFuncionario() != null ? solicitacao.getFuncionario().getId() : null,
                solicitacao.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM solicitacao WHERE id = ?", id);
    }
}