package com.repairio.backend.dao;

import com.repairio.backend.model.Solicitacao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SolicitacaoDao {
    private final JdbcTemplate jdbcTemplate;

    public SolicitacaoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Solicitacao> findAll() {
        return jdbcTemplate.query("SELECT * FROM solicitacao",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDescricaoEquipamento(rs.getString("descricaoEquipamento"));
                    s.setDescricaoDefeito(rs.getString("descricaoDefeito"));
                    s.setEstado(rs.getString("estado"));
                    s.setCategoriaId(rs.getLong("categoriaId"));
                    s.setFuncionarioId(rs.getLong("funcionarioId"));
                    s.setPessoaId(rs.getLong("pessoaId"));
                    return s;
                });
    }

    public Solicitacao findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM solicitacao WHERE id = ?",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDescricaoEquipamento(rs.getString("descricaoEquipamento"));
                    s.setDescricaoDefeito(rs.getString("descricaoDefeito"));
                    s.setEstado(rs.getString("estado"));
                    s.setCategoriaId(rs.getLong("categoriaId"));
                    s.setFuncionarioId(rs.getLong("funcionarioId"));
                    s.setPessoaId(rs.getLong("pessoaId"));
                    return s;
                }, id);
    }

    public void save(Solicitacao solicitacao) {
        jdbcTemplate.update(
            "INSERT INTO solicitacao (descricaoEquipamento, descricaoDefeito, estado, categoriaId, funcionarioId, pessoaId) VALUES (?, ?, ?, ?, ?, ?)",
            solicitacao.getDescricaoEquipamento(), solicitacao.getDescricaoDefeito(), solicitacao.getEstado(),
            solicitacao.getCategoriaId(), solicitacao.getFuncionarioId(), solicitacao.getPessoaId()
        );
    }

    public void update(Solicitacao solicitacao) {
        jdbcTemplate.update(
            "UPDATE solicitacao SET descricaoEquipamento = ?, descricaoDefeito = ?, estado = ?, categoriaId = ?, funcionarioId = ?, pessoaId = ? WHERE id = ?",
            solicitacao.getDescricaoEquipamento(), solicitacao.getDescricaoDefeito(), solicitacao.getEstado(),
            solicitacao.getCategoriaId(), solicitacao.getFuncionarioId(), solicitacao.getPessoaId(), solicitacao.getId()
        );
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM solicitacao WHERE id = ?", id);
    }
}