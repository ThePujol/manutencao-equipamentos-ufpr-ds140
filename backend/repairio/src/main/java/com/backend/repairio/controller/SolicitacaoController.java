package com.backend.repairio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.backend.repairio.service.SolicitacaoService;
import com.backend.repairio.model.Solicitacao;

@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoController {
    @Autowired
    private SolicitacaoService service;

    @PostMapping
    public ResponseEntity<Solicitacao> criar(@RequestBody Solicitacao solicitacao) {
        Solicitacao salvo = service.salvar(solicitacao);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public List<Solicitacao> listar() {
        return service.listar();
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}