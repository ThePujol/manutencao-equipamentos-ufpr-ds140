package com.backend.repairio.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.backend.repairio.dao.SolicitacaoDAO;
import com.backend.repairio.model.Solicitacao;

@Service
public class SolicitacaoService {
    @Autowired
    private SolicitacaoDAO solicitacaoDAO;

    public Solicitacao salvar(Solicitacao solicitacao) {
        return solicitacaoDAO.salvar(solicitacao);
    }

    public List<Solicitacao> listar() {
        return solicitacaoDAO.listarTodos();
    }

    public void excluir(Long id) {
        solicitacaoDAO.excluir(id);
    }
}
