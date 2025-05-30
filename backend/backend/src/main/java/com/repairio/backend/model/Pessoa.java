package com.repairio.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

@Data
@EqualsAndHashCode(of = "id")
public class Pessoa {
    private Long id;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    private String salt;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}|\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF inválido")
    private String cpf;

    @NotBlank(message = "Telefone é obrigatório")
    private String tel;

    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}|\\d{5}-\\d{3}", message = "CEP inválido")
    private String cep;

    @Size(min = 2, max = 2, message = "UF deve ter 2 letras")
    private String estado;

    private String cidade;

    private String endereco;

    @NotBlank(message = "Número é obrigatório")
    private String num;

    private String complemento;
}