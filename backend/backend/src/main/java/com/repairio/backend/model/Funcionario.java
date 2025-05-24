package com.repairio.backend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(of = "id")
public class Funcionario {
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

    @NotNull(message = "Data de nascimento é obrigatória")
    private LocalDate dataNasc;
}