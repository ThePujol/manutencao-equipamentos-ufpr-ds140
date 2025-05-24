package com.repairio.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@EqualsAndHashCode(of = "id")
public class Solicitacao {
    private Long id;

    @NotNull(message = "Data da solicitação é obrigatória")
    private Date dataSolicitacao;

    @NotBlank(message = "Descrição do equipamento é obrigatória")
    private String descricaoEquipamento;

    @NotBlank(message = "Descrição do defeito é obrigatória")
    private String descricaoDefeito;

    @NotBlank(message = "Estado é obrigatório")
    private String estado;

    @NotNull(message = "Categoria é obrigatória")
    private Long categoriaId;

    @NotNull(message = "Funcionário é obrigatório")
    private Long funcionarioId;

    @NotNull(message = "Pessoa é obrigatória")
    private Long pessoaId;

    private Date dataOrcamento;
}