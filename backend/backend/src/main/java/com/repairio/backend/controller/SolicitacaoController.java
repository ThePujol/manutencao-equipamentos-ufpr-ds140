package com.repairio.backend.controller;

import com.repairio.backend.model.Solicitacao;
import com.repairio.backend.service.SolicitacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        Solicitacao saved = solicitacaoService.save(solicitacao);
        return ResponseEntity.status(201).body(saved);
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