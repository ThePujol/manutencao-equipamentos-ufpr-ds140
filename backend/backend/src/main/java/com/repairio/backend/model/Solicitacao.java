package com.repairio.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

@Data
@EqualsAndHashCode(of = "id")
public class Solicitacao {
    private Long id;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotNull(message = "Categoria é obrigatória")
    private Categoria categoria;

    @NotBlank(message = "Defeito é obrigatório")
    private String defeito;

    @NotNull(message = "Orçamento é obrigatório")
    private Double orcamento;

    @NotNull(message = "Situação é obrigatória")
    private Situacao situacao;

    @NotNull(message = "Cliente é obrigatório")
    private Pessoa cliente;

    private Funcionario funcionario;
}