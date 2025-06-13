// src/main/java/io/repair/back2/crud/dto/FuncionarioDTO.java
package io.repair.back2.crud.dto;

import java.time.LocalDate;

public class FuncionarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private LocalDate dataNasc;

    public FuncionarioDTO() {
    }

    public FuncionarioDTO(Long id, String nome, String email,
            String senha, LocalDate dataNasc) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataNasc = dataNasc;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDate getDataNasc() {
        return dataNasc;
    }

    public void setDataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
    }
}
