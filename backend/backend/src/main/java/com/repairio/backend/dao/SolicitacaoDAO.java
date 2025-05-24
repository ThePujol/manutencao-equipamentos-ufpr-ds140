package com.repairio.backend.dao;

import com.repairio.backend.model.Solicitacao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
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
                    s.setDataSolicitacao(rs.getDate("data_solicitacao"));
                    s.setDescricaoEquipamento(rs.getString("descricao_equipamento"));
                    s.setDescricaoDefeito(rs.getString("descricao_defeito"));
                    s.setEstado(rs.getString("estado"));
                    s.setCategoriaId(rs.getLong("categoria_id"));
                    s.setFuncionarioId(rs.getLong("funcionario_id"));
                    s.setPessoaId(rs.getLong("pessoa_id"));
                    s.setDataOrcamento(rs.getDate("data_orcamento"));
                    return s;
                });
    }

    public Solicitacao findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM solicitacao WHERE id = ?",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDataSolicitacao(rs.getDate("data_solicitacao"));
                    s.setDescricaoEquipamento(rs.getString("descricao_equipamento"));
                    s.setDescricaoDefeito(rs.getString("descricao_defeito"));
                    s.setEstado(rs.getString("estado"));
                    s.setCategoriaId(rs.getLong("categoria_id"));
                    s.setFuncionarioId(rs.getLong("funcionario_id"));
                    s.setPessoaId(rs.getLong("pessoa_id"));
                    s.setDataOrcamento(rs.getDate("data_orcamento"));
                    return s;
                }, id);
    }

    public void save(Solicitacao solicitacao) {
        jdbcTemplate.update(
                "INSERT INTO solicitacao (data_solicitacao, descricao_equipamento, descricao_defeito, estado, categoria_id, funcionario_id, pessoa_id, data_orcamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                new Date(solicitacao.getDataSolicitacao().getTime()),
                solicitacao.getDescricaoEquipamento(),
                solicitacao.getDescricaoDefeito(),
                solicitacao.getEstado(),
                solicitacao.getCategoriaId(),
                solicitacao.getFuncionarioId(),
                solicitacao.getPessoaId(),
                solicitacao.getDataOrcamento() != null ? new Date(solicitacao.getDataOrcamento().getTime()) : null);
    }

    public void update(Solicitacao solicitacao) {
        jdbcTemplate.update(
                "UPDATE solicitacao SET data_solicitacao = ?, descricao_equipamento = ?, descricao_defeito = ?, estado = ?, categoria_id = ?, funcionario_id = ?, pessoa_id = ?, data_orcamento = ? WHERE id = ?",
                new Date(solicitacao.getDataSolicitacao().getTime()),
                solicitacao.getDescricaoEquipamento(),
                solicitacao.getDescricaoDefeito(),
                solicitacao.getEstado(),
                solicitacao.getCategoriaId(),
                solicitacao.getFuncionarioId(),
                solicitacao.getPessoaId(),
                solicitacao.getDataOrcamento() != null ? new Date(solicitacao.getDataOrcamento().getTime()) : null,
                solicitacao.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM solicitacao WHERE id = ?", id);
    }
}