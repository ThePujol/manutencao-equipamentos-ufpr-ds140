package com.repairio.backend.controller;

import com.repairio.backend.model.SolicitacaoStatusHistorico;
import com.repairio.backend.service.SolicitacaoStatusHistoricoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitacoes/{solicitacaoId}/historico")
@CrossOrigin(origins = "*")
public class SolicitacaoStatusHistoricoController {

    private final SolicitacaoStatusHistoricoService historicoService;

    public SolicitacaoStatusHistoricoController(SolicitacaoStatusHistoricoService historicoService) {
        this.historicoService = historicoService;
    }

    @GetMapping
    public ResponseEntity<List<SolicitacaoStatusHistorico>> listarHistorico(@PathVariable Long solicitacaoId) {
        List<SolicitacaoStatusHistorico> historico = historicoService.listarPorSolicitacao(solicitacaoId);
        return ResponseEntity.ok(historico);
    }
}
