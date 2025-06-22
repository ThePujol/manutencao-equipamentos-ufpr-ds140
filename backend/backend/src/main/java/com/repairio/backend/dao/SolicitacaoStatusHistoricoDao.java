package com.repairio.backend.dao;

import com.repairio.backend.model.Solicitacao;
import com.repairio.backend.model.SolicitacaoStatusHistorico;
import com.repairio.backend.model.Situacao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class SolicitacaoStatusHistoricoDao {

    private final JdbcTemplate jdbcTemplate;
    private final SolicitacaoDao solicitacaoDao;

    public SolicitacaoStatusHistoricoDao(JdbcTemplate jdbcTemplate, SolicitacaoDao solicitacaoDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.solicitacaoDao = solicitacaoDao;
    }

    public void save(SolicitacaoStatusHistorico historico) {
        jdbcTemplate.update(
                "INSERT INTO solicitacao_status_historico (solicitacao_id, situacao, data_hora, observacao) VALUES (?, ?, ?, ?)",
                historico.getSolicitacao().getId(),
                historico.getSituacao().name(),
                Timestamp.valueOf(historico.getDataHora()),
                historico.getObservacao());
    }

    public List<SolicitacaoStatusHistorico> findBySolicitacao(Long solicitacaoId) {
        return jdbcTemplate.query(
                "SELECT * FROM solicitacao_status_historico WHERE solicitacao_id = ? ORDER BY data_hora ASC",
                (rs, rowNum) -> {
                    SolicitacaoStatusHistorico h = new SolicitacaoStatusHistorico();
                    h.setId(rs.getLong("id"));
                    Solicitacao solicitacao = solicitacaoDao.findById(rs.getLong("solicitacao_id"));
                    h.setSolicitacao(solicitacao);
                    h.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                    h.setDataHora(rs.getTimestamp("data_hora").toLocalDateTime());
                    h.setObservacao(rs.getString("observacao"));
                    return h;
                },
                solicitacaoId);
    }
}