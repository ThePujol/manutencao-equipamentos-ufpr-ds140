package com.repairio.backend.controller;

import com.repairio.backend.dto.SolicitacaoStatusHistoricoDTO;
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
    public ResponseEntity<List<SolicitacaoStatusHistoricoDTO>> listarHistorico(@PathVariable Long solicitacaoId) {
        List<SolicitacaoStatusHistoricoDTO> historico = historicoService.listarHistoricoParaFrontend(solicitacaoId);
        return ResponseEntity.ok(historico);
    }
}
