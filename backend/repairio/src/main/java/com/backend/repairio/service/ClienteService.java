package com.backend.repairio.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.backend.repairio.dao.ClienteDAO;
import com.backend.repairio.dao.EnderecoDAO;
import com.backend.repairio.model.Endereco;
import com.backend.repairio.model.Cliente;

@Service
public class ClienteService {
    @Autowired
    private ClienteDAO clienteDAO;

    @Autowired
    private EnderecoDAO enderecoDAO;

    @Autowired
    private ViaCepService viaCepService;

    public Cliente salvar(Cliente cliente) {
        Endereco enderecoViaCep = viaCepService.buscarEnderecoPorCep(cliente.getEndereco().getCep());
        enderecoDAO.salvar(enderecoViaCep);
        cliente.setEndereco(enderecoViaCep);
        return clienteDAO.salvar(cliente);
    }

    public List<Cliente> listar() {
        return clienteDAO.listarTodos();
    }

    public void excluir(Long id) {
        clienteDAO.excluir(id);
    }
}
