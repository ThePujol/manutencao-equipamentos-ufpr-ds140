package com.backend.repairio.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.backend.repairio.dao.FuncionarioDAO;
import com.backend.repairio.model.Funcionario;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioDAO funcionarioDAO;

    public Funcionario salvar(Funcionario funcionario) {
        return funcionarioDAO.salvar(funcionario);
    }

    public List<Funcionario> listar() {
        return funcionarioDAO.listarTodos();
    }

    public void excluir(Long id) {
        funcionarioDAO.excluir(id);
    }
}
