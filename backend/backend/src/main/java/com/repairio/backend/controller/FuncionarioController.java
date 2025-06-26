package com.repairio.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.repairio.backend.model.Funcionario;
import com.repairio.backend.service.FuncionarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public ResponseEntity<List<Funcionario>> getAll() {
        return ResponseEntity.ok(funcionarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> getById(@PathVariable Long id) {
        try {
            Funcionario funcionario = funcionarioService.findById(id);
            return ResponseEntity.ok(funcionario);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Funcionario> create(@Valid @RequestBody Funcionario funcionario) {
        String plainPassword = funcionario.getSenha();
        funcionarioService.save(funcionario, plainPassword);
        return ResponseEntity.status(201).body(funcionario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> update(@PathVariable Long id, @Valid @RequestBody Funcionario funcionario) {
        funcionario.setId(id);
        String plainPassword = funcionario.getSenha();
        funcionarioService.update(funcionario, plainPassword);
        return ResponseEntity.ok(funcionario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        funcionarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}