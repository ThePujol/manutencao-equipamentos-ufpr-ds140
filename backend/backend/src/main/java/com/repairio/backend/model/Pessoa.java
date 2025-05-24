package com.repairio.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.*;

@Data
@EqualsAndHashCode(of = "id")
public class Pessoa {
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    @NotBlank(message = "Salt é obrigatório")
    private String salt;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}|\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF inválido")
    private String cpf;

    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}|\\d{5}-\\d{3}", message = "CEP inválido")
    private String cep;

    @NotBlank(message = "Logradouro é obrigatório")
    private String logradouro;

    @NotBlank(message = "Número é obrigatório")
    private String numero;

    private String complemento;

    @NotBlank(message = "Bairro é obrigatório")
    private String bairro;

    @NotBlank(message = "Localidade é obrigatória")
    private String localidade;

    @NotBlank(message = "UF é obrigatória")
    @Size(min = 2, max = 2, message = "UF deve ter 2 letras")
    private String uf;

    private String imagem;
}
