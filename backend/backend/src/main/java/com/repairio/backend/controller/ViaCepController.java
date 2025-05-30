package com.repairio.backend.controller;

import com.repairio.backend.model.ViaCepResponse;
import com.repairio.backend.service.ViaCepService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/viacep")
@CrossOrigin(origins = "*")
public class ViaCepController {

    private final ViaCepService viaCepService;

    public ViaCepController(ViaCepService viaCepService) {
        this.viaCepService = viaCepService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<ViaCepResponse> buscarEndereco(@PathVariable String cep) {
        ViaCepResponse response = viaCepService.buscarEnderecoPorCep(cep);
        if (response == null || response.getCep() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}