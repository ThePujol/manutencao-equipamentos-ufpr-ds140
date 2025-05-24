package com.repairio.backend.service;

import com.repairio.backend.dao.SolicitacaoDao;
import com.repairio.backend.model.Solicitacao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitacaoService {
    private final SolicitacaoDao solicitacaoDao;

    public SolicitacaoService(SolicitacaoDao solicitacaoDao) {
        this.solicitacaoDao = solicitacaoDao;
    }

    public List<Solicitacao> findAll() {
        return solicitacaoDao.findAll();
    }

    public Solicitacao findById(Long id) {
        return solicitacaoDao.findById(id);
    }

    public void save(Solicitacao solicitacao) {
        solicitacaoDao.save(solicitacao);
    }

    public void update(Solicitacao solicitacao) {
        solicitacaoDao.update(solicitacao);
    }

    public void delete(Long id) {
        solicitacaoDao.delete(id);
    }
}