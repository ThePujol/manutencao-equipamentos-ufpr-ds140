package com.repairio.backend.model;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = "id")
public class SolicitacaoStatusHistorico {
    private Long id;
    private Solicitacao solicitacao;
    private Situacao situacao;
    private LocalDateTime dataHora;
    private String observacao;
}