package io.repair.back2.crud.controller;

import io.repair.back2.crud.dto.PessoaDTO;
import io.repair.back2.crud.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = "http://localhost:4200")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    // GET /api/pessoas
    @GetMapping
    public ResponseEntity<List<PessoaDTO>> listarTodos() {
        return ResponseEntity.ok(pessoaService.buscarTodos());
    }

    // GET /api/pessoas/{id}
    @GetMapping("/{id}")
    public ResponseEntity<PessoaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pessoaService.buscarPorId(id));
    }

    // POST /api/pessoas
    @PostMapping
    public ResponseEntity<PessoaDTO> criar(@RequestBody PessoaDTO dto) {
        PessoaDTO criado = pessoaService.criar(dto);
        return ResponseEntity.status(201).body(criado);
    }

    // PUT /api/pessoas/{id}
    @PutMapping("/{id}")
    public ResponseEntity<PessoaDTO> atualizar(@PathVariable Long id,
            @RequestBody PessoaDTO dto) {
        return ResponseEntity.ok(pessoaService.atualizar(id, dto));
    }

    // DELETE /api/pessoas/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        pessoaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
