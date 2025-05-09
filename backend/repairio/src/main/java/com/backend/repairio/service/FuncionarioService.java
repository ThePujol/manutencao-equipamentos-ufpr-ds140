package com.backend.repairio.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.backend.repairio.dao.FuncionarioDAO;
import com.backend.repairio.dao.EnderecoDAO;
import com.backend.repairio.model.Endereco;
import com.backend.repairio.model.Funcionario;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioDAO funcionarioDAO;

    @Autowired
    private EnderecoDAO enderecoDAO;

    @Autowired
    private ViaCepService viaCepService;

    public Funcionario salvar(Funcionario funcionario) {
        Endereco enderecoViaCep = viaCepService.buscarEnderecoPorCep(funcionario.getEndereco().getCep());
        enderecoDAO.salvar(enderecoViaCep);
        funcionario.setEndereco(enderecoViaCep);
        return funcionarioDAO.salvar(funcionario);
    }

    public List<Funcionario> listar() {
        return funcionarioDAO.listarTodos();
    }

    public void excluir(Long id) {
        funcionarioDAO.excluir(id);
    }
}
