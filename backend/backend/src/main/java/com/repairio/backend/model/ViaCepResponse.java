package com.repairio.backend.model;

import lombok.Data;

@Data
public class ViaCepResponse {
    private String cep;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;
    private Boolean erro;
}