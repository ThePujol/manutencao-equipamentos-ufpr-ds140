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

import com.repairio.backend.model.Solicitacao;
import com.repairio.backend.service.SolicitacaoService;

@RestController
@RequestMapping("/api/solicitacoes")
@CrossOrigin(origins = "*")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @GetMapping
    public ResponseEntity<List<Solicitacao>> getAll() {
        return ResponseEntity.ok(solicitacaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitacao> getById(@PathVariable Long id) {
        try {
            Solicitacao solicitacao = solicitacaoService.findById(id);
            return ResponseEntity.ok(solicitacao);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Solicitacao> create(@RequestBody Solicitacao solicitacao) {
        solicitacaoService.save(solicitacao);
        return ResponseEntity.status(201).body(solicitacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Solicitacao> update(@PathVariable Long id, @RequestBody Solicitacao solicitacao) {
        solicitacao.setId(id);
        solicitacaoService.update(solicitacao);
        return ResponseEntity.ok(solicitacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        solicitacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
