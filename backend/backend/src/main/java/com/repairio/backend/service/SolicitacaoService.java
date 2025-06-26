package com.repairio.backend.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;

import com.repairio.backend.dao.SolicitacaoDao;
import com.repairio.backend.model.Solicitacao;
import com.repairio.backend.model.SolicitacaoStatusHistorico;

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
        historico.setDataHora(LocalDateTime.now(ZoneId.systemDefault()));
        historico.setObservacao("Solicitação criada");
        historicoService.registrarHistorico(historico);
    }

    public void update(Solicitacao solicitacao) {
        Solicitacao antiga = solicitacaoDao.findById(solicitacao.getId());
        if (!antiga.getSituacao().equals(solicitacao.getSituacao())) {
            SolicitacaoStatusHistorico historico = new SolicitacaoStatusHistorico();
            historico.setSolicitacao(solicitacao);
            historico.setSituacao(solicitacao.getSituacao());
            historico.setDataHora(LocalDateTime.now(ZoneId.systemDefault()));

            String observacao = criarObservacaoPersonalizada(solicitacao, antiga);
            historico.setObservacao(observacao);

            historicoService.registrarHistorico(historico);
        }
        solicitacaoDao.update(solicitacao);
    }

    private String criarObservacaoPersonalizada(Solicitacao nova, Solicitacao antiga) {
        switch (nova.getSituacao()) {
            case REJEITADA:
                if (nova.getMotivoRejeicao() != null && !nova.getMotivoRejeicao().isEmpty()) {
                    return "Solicitação rejeitada. Motivo: " + nova.getMotivoRejeicao();
                }
                return "Solicitação rejeitada";

            case REDIRECIONADA:
                String observacao = "Solicitação redirecionada";
                if (antiga.getFuncionario() != null && nova.getFuncionario() != null) {
                    observacao += " de " + antiga.getFuncionario().getNome() + " para "
                            + nova.getFuncionario().getNome();
                } else if (nova.getFuncionario() != null) {
                    observacao += " para " + nova.getFuncionario().getNome();
                }
                return observacao;

            case ORÇADA:
                if (nova.getOrcamento() != null) {
                    return "Orçamento criado no valor de R$ " + String.format("%.2f", nova.getOrcamento());
                }
                return "Orçamento criado";

            case ARRUMADA:
                if (nova.getDescricaoManutencao() != null && !nova.getDescricaoManutencao().isEmpty()) {
                    return "Manutenção concluída. Solução: " + nova.getDescricaoManutencao();
                }
                return "Manutenção concluída";

            case APROVADA:
                return "Orçamento aprovado pelo cliente";

            case PAGA:
                return "Pagamento realizado";

            case FINALIZADA:
                return "Solicitação finalizada";

            default:
                return "Status alterado para " + nova.getSituacao().toString().toLowerCase();
        }
    }

    public void delete(Long id) {
        solicitacaoDao.delete(id);
    }
}
