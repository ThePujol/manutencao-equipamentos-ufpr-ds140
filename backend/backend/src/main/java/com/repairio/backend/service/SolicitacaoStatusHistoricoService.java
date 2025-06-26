package com.repairio.backend.service;

import com.repairio.backend.dao.SolicitacaoStatusHistoricoDao;
import com.repairio.backend.dto.SolicitacaoStatusHistoricoDTO;
import com.repairio.backend.model.Solicitacao;
import com.repairio.backend.model.SolicitacaoStatusHistorico;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<SolicitacaoStatusHistoricoDTO> listarHistoricoParaFrontend(Long solicitacaoId) {
        List<SolicitacaoStatusHistorico> historicos = historicoDao.findBySolicitacao(solicitacaoId);

        return historicos.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private SolicitacaoStatusHistoricoDTO converterParaDTO(SolicitacaoStatusHistorico historico) {
        SolicitacaoStatusHistoricoDTO dto = new SolicitacaoStatusHistoricoDTO();
        Solicitacao solicitacao = historico.getSolicitacao();

        dto.setId(historico.getId());
        dto.setSituacao(historico.getSituacao());
        dto.setDataHora(historico.getDataHora());

        if (solicitacao != null) {
            switch (historico.getSituacao()) {
                case ORÇADA:
                    dto.setOrcamento(solicitacao.getOrcamento());
                    dto.setObservacao(historico.getObservacao());
                    break;

                case REJEITADA:
                    dto.setMotivoRejeicao(solicitacao.getMotivoRejeicao());

                    if (historico.getObservacao() != null &&
                            !historico.getObservacao().contains("Motivo: ")) {
                        dto.setObservacao(historico.getObservacao());
                    }
                    break;

                case FINALIZADA:
                    dto.setOrientacoes(solicitacao.getOrientacoes());
                    dto.setDescricaoManutencao(solicitacao.getDescricaoManutencao());
                    dto.setObservacao(historico.getObservacao());
                    break;

                case REDIRECIONADA:

                    extrairInformacoesRedirecionamento(dto, historico, solicitacao);
                    break;

                default:
                    dto.setObservacao(historico.getObservacao());
                    break;
            }
        } else {
            dto.setObservacao(historico.getObservacao());
        }

        return dto;
    }

    private void extrairInformacoesRedirecionamento(SolicitacaoStatusHistoricoDTO dto,
            SolicitacaoStatusHistorico historico,
            Solicitacao solicitacao) {
        String observacao = historico.getObservacao();

        System.out.println("DEBUG: Processando redirecionamento - Observação: " + observacao);

        if (observacao != null && observacao.contains(" de ") && observacao.contains(" para ")) {

            int deIndex = observacao.indexOf(" de ");
            int paraIndex = observacao.indexOf(" para ");

            if (deIndex > 0 && paraIndex > deIndex) {
                String nomeAntigo = observacao.substring(deIndex + 4, paraIndex).trim();
                String nomeNovo = observacao.substring(paraIndex + 6).trim();

                System.out.println("DEBUG: Extraído - De: " + nomeAntigo + ", Para: " + nomeNovo);

                com.repairio.backend.model.Funcionario funcionarioAntigo = new com.repairio.backend.model.Funcionario();
                funcionarioAntigo.setId(-1L);
                funcionarioAntigo.setNome(nomeAntigo);

                com.repairio.backend.model.Funcionario funcionarioNovo = new com.repairio.backend.model.Funcionario();
                funcionarioNovo.setId(-2L);
                funcionarioNovo.setNome(nomeNovo);

                dto.setFuncionarioResponsavel(funcionarioAntigo);
                dto.setFuncionarioRedirecionado(funcionarioNovo);

                dto.setObservacao(observacao);
            }
        } else if (observacao != null && observacao.contains(" para ")) {

            int paraIndex = observacao.indexOf(" para ");
            if (paraIndex > 0) {
                String nomeNovo = observacao.substring(paraIndex + 6).trim();

                System.out.println("DEBUG: Extraído - Apenas Para: " + nomeNovo);

                com.repairio.backend.model.Funcionario funcionarioNovo = new com.repairio.backend.model.Funcionario();
                funcionarioNovo.setId(-2L);
                funcionarioNovo.setNome(nomeNovo);

                dto.setFuncionarioRedirecionado(funcionarioNovo);
                dto.setObservacao(observacao);
            }
        } else {
            System.out.println("DEBUG: Usando fallback - Funcionário atual da solicitação");
            if (solicitacao.getFuncionario() != null) {
                dto.setFuncionarioRedirecionado(solicitacao.getFuncionario());
                dto.setObservacao("Redirecionado para " + solicitacao.getFuncionario().getNome());
            } else {
                dto.setObservacao(observacao != null ? observacao : "Solicitação redirecionada");
            }
        }

        System.out.println("DEBUG: DTO final - ResponsavelId: " +
                (dto.getFuncionarioResponsavel() != null ? dto.getFuncionarioResponsavel().getId() : "null") +
                ", RedirecionadoId: " +
                (dto.getFuncionarioRedirecionado() != null ? dto.getFuncionarioRedirecionado().getId() : "null"));
    }
}