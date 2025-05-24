package com.repairio.backend.controller;

import com.repairio.backend.model.Pessoa;
import com.repairio.backend.model.ViaCepResponse;
import com.repairio.backend.service.EmailService;
import com.repairio.backend.service.PessoaService;
import com.repairio.backend.service.ViaCepService;
import com.repairio.backend.util.PasswordUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = "*")
public class PessoaController {
    private final PessoaService pessoaService;
    private final ViaCepService viaCepService;
    private final EmailService emailService;

    public PessoaController(PessoaService pessoaService, ViaCepService viaCepService, EmailService emailService) {
        this.pessoaService = pessoaService;
        this.viaCepService = viaCepService;
        this.emailService = emailService;
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> getAll() {
        return ResponseEntity.ok(pessoaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> getById(@PathVariable Long id) {
        try {
            Pessoa pessoa = pessoaService.findById(id);
            return ResponseEntity.ok(pessoa);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Pessoa> create(@RequestBody Pessoa pessoa) {
        if (pessoa.getCep() != null && pessoa.getCep().length() == 8) {
            ViaCepResponse viaCep = viaCepService.buscarEnderecoPorCep(pessoa.getCep());
            if (viaCep != null && viaCep.getCep() != null) {
                pessoa.setLogradouro(viaCep.getLogradouro());
                pessoa.setBairro(viaCep.getBairro());
                pessoa.setLocalidade(viaCep.getLocalidade());
                pessoa.setUf(viaCep.getUf());
            }
        }

        String plainPassword = PasswordUtil.generateRandomPassword();
        pessoaService.save(pessoa, plainPassword);
        emailService.sendPasswordEmail(pessoa.getEmail(), plainPassword);

        return ResponseEntity.status(201).body(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> update(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        pessoa.setId(id);
        pessoaService.update(pessoa);
        return ResponseEntity.ok(pessoa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        pessoaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}