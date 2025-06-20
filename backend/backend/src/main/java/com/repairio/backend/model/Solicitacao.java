package com.repairio.backend.model;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = "id")
public class Solicitacao {

    private Long id;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotBlank(message = "Categoria é obrigatória")
    private Categoria categoria;

    @NotBlank(message = "Defeito é obrigatório")
    private String defeito;

    @NotBlank(message = "Situação é obrigatória")
    private Situacao situacao;

    @NotBlank(message = "Cliente é obrigatório")
    private Pessoa cliente;

    private Funcionario funcionario;
    private Double orcamento;
    private Date dataOrcamento;
    private String descricaoManutencao;
    private Date dataManutencao;
    private String orientacoes;
    private Date dataFinalizacao;
    private String motivoRejeicao;
    private Date dataSolicitacaoAbertura; // Não persistente, apenas para exibição

    public Date getDataSolicitacaoAbertura() {
        return dataSolicitacaoAbertura;
    }

    public void setDataSolicitacaoAbertura(Date dataSolicitacaoAbertura) {
        this.dataSolicitacaoAbertura = dataSolicitacaoAbertura;
    }
}
