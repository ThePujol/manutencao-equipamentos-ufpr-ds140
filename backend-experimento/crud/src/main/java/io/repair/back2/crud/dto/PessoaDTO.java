package io.repair.back2.crud.dto;

import java.io.Serializable;

public class PessoaDTO implements Serializable {
    private Long id;
    private String email;
    private String senha;
    private String nome;
    private String cpf;
    private String tel;
    private String cep;
    private String estado;
    private String cidade;
    private String endereco;
    private String num;
    private String complemento;

    public PessoaDTO() {
    }

    public PessoaDTO(Long id, String email, String senha, String nome, String cpf,
            String tel, String cep, String estado, String cidade,
            String endereco, String num, String complemento) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.cpf = cpf;
        this.tel = tel;
        this.cep = cep;
        this.estado = estado;
        this.cidade = cidade;
        this.endereco = endereco;
        this.num = num;
        this.complemento = complemento;
    }

    // GETTERS E SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
}
