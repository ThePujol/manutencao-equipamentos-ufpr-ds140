// src/main/java/io/repair/back2/crud/controller/FuncionarioController.java
package io.repair.back2.crud.controller;

import io.repair.back2.crud.dto.FuncionarioDTO;
import io.repair.back2.crud.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "http://localhost:4200")
public class FuncionarioController {

    @Autowired
    private FuncionarioService service;

    @GetMapping
    public ResponseEntity<List<FuncionarioDTO>> listarTodos() {
        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<FuncionarioDTO> criar(@RequestBody FuncionarioDTO dto) {
        FuncionarioDTO criado = service.criar(dto);
        return ResponseEntity.status(201).body(criado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioDTO> atualizar(@PathVariable Long id,
            @RequestBody FuncionarioDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.ok().build();
    }
}
