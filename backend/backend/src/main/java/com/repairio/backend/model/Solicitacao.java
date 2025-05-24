package com.repairio.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class Solicitacao {
    private Long id;
    private Date dataSolicitacao;
    private String descricaoEquipamento;
    private String descricaoDefeito;
    private String estado;
    private Long categoriaId;
    private Long funcionarioId;
    private Date dataOrcamento;
}