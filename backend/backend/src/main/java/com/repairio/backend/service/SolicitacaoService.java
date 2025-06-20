package com.repairio.backend.service;

import com.repairio.backend.dao.SolicitacaoDao;
import com.repairio.backend.model.Solicitacao;
import com.repairio.backend.model.SolicitacaoStatusHistorico;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SolicitacaoService {
    private final SolicitacaoDao solicitacaoDao;
    private final SolicitacaoStatusHistoricoService historicoService;

    public SolicitacaoService(SolicitacaoDao solicitacaoDao, SolicitacaoStatusHistoricoService historicoService) {
        this.solicitacaoDao = solicitacaoDao;
        this.historicoService = historicoService;
    }

    public List<Solicitacao> findAll() {
        return solicitacaoDao.findAll();
    }

    public Solicitacao findById(Long id) {
        return solicitacaoDao.findById(id);
    }

    public void save(Solicitacao solicitacao) {
        solicitacaoDao.save(solicitacao);
        if (solicitacao.getId() == null) {
            throw new IllegalStateException("ID da solicitação não foi gerado!");
        }
        SolicitacaoStatusHistorico historico = new SolicitacaoStatusHistorico();
        historico.setSolicitacao(solicitacao);
        historico.setSituacao(solicitacao.getSituacao());
        historico.setDataHora(LocalDateTime.now());
        historico.setObservacao("Solicitação criada");
        historicoService.registrarHistorico(historico);
    }

    public void update(Solicitacao solicitacao) {
        Solicitacao antiga = solicitacaoDao.findById(solicitacao.getId());
        if (!antiga.getSituacao().equals(solicitacao.getSituacao())) {
            SolicitacaoStatusHistorico historico = new SolicitacaoStatusHistorico();
            historico.setSolicitacao(solicitacao);
            historico.setSituacao(solicitacao.getSituacao());
            historico.setDataHora(LocalDateTime.now());
            historico.setObservacao("Alteração de status");
            historicoService.registrarHistorico(historico);
        }
        solicitacaoDao.update(solicitacao);
    }

    public void delete(Long id) {
        solicitacaoDao.delete(id);
    }
}