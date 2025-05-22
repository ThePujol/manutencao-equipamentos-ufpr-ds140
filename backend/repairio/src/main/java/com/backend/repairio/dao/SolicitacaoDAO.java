package com.backend.repairio.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.backend.repairio.model.Solicitacao;
import com.backend.repairio.repository.SolicitacaoRepository;

@Repository
public class SolicitacaoDAO {
    @Autowired
    private SolicitacaoRepository repo;

    public Solicitacao salvar(Solicitacao solicitacao) {
        return repo.save(solicitacao);
    }

    public List<Solicitacao> listarTodos() {
        return repo.findAll();
    }

    public Optional<Solicitacao> buscarPorId(Long id) {
        return repo.findById(id);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }
}
