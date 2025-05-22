package com.backend.repairio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.backend.repairio.service.CategoriaService;
import com.backend.repairio.model.Categoria;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService service;

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria) {
        Categoria salvo = service.salvar(categoria);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public List<Categoria> listar() {
        return service.listar();
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
