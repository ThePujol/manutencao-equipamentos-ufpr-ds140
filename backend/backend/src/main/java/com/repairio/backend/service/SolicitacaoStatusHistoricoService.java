package com.repairio.backend.service;

import com.repairio.backend.dao.SolicitacaoStatusHistoricoDao;
import com.repairio.backend.model.SolicitacaoStatusHistorico;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitacaoStatusHistoricoService {

    private final SolicitacaoStatusHistoricoDao historicoDao;

    public SolicitacaoStatusHistoricoService(SolicitacaoStatusHistoricoDao historicoDao) {
        this.historicoDao = historicoDao;
    }

    public void registrarHistorico(SolicitacaoStatusHistorico historico) {
        historicoDao.save(historico);
    }

    public List<SolicitacaoStatusHistorico> listarPorSolicitacao(Long solicitacaoId) {
        return historicoDao.findBySolicitacao(solicitacaoId);
    }
}