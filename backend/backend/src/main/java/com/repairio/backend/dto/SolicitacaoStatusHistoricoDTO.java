package com.repairio.backend.dto;

import com.repairio.backend.model.Funcionario;
import com.repairio.backend.model.Situacao;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SolicitacaoStatusHistoricoDTO {
    private Long id;
    private Situacao situacao;
    private LocalDateTime dataHora;
    private String observacao;
    private Funcionario funcionarioResponsavel;
    private Funcionario funcionarioRedirecionado;

    private String motivoRejeicao;
    private String orientacoes;
    private String descricaoManutencao;
    private Double orcamento;
}
