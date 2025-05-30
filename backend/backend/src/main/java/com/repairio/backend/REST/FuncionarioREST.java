package com.backend.repairio.REST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.repairio.service.FuncionarioService;
import com.backend.repairio.model.Funcionario;
import java.util.List;


@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioREST {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public List<Funcionario> listarTodos() {
        return funcionarioService.listar();
    }

    @PostMapping
    public Funcionario criar(@RequestBody Funcionario funcionario) {
        return funcionarioService.salvar(funcionario);
    }

    @PutMapping("/{id}")
    public Funcionario atualizar(@PathVariable Long id, @RequestBody Funcionario funcionario) {
        return funcionarioService.salvar(funcionario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        funcionarioService.excluir(id);
    }
}
