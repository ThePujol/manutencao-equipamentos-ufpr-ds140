package com.repairio.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.repairio.backend.dto.LoginRequest;
import com.repairio.backend.dto.LoginResponse;
import com.repairio.backend.model.Funcionario;
import com.repairio.backend.model.Pessoa;
import com.repairio.backend.service.FuncionarioService;
import com.repairio.backend.service.PessoaService;
import com.repairio.backend.util.JwtUtil;
import com.repairio.backend.util.PasswordUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final PessoaService pessoaService;
    private final FuncionarioService funcionarioService;

    public AuthController(PessoaService pessoaService, FuncionarioService funcionarioService) {
        this.pessoaService = pessoaService;
        this.funcionarioService = funcionarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Pessoa pessoa = pessoaService.findByEmail(loginRequest.getEmail());
        if (pessoa != null) {
            String hash = PasswordUtil.hashPassword(loginRequest.getSenha(), pessoa.getSalt());

            if (hash.equals(pessoa.getSenha())) {
                String token = JwtUtil.generateToken(pessoa.getEmail(), "pessoa");
                return ResponseEntity
                        .ok(new LoginResponse(token, "pessoa", pessoa.getId(), pessoa.getNome(), pessoa.getEmail()));
            }
        }

        Funcionario funcionario = funcionarioService.findByEmail(loginRequest.getEmail());
        if (funcionario != null) {
            String hash = PasswordUtil.hashPassword(loginRequest.getSenha(), funcionario.getSalt());
            if (hash.equals(funcionario.getSenha())) {
                String token = JwtUtil.generateToken(funcionario.getEmail(), "funcionario");
                return ResponseEntity.ok(new LoginResponse(token, "funcionario", funcionario.getId(),
                        funcionario.getNome(), funcionario.getEmail()));
            }
        }
        return ResponseEntity.status(401).body("Email ou senha inválidos");
    }
}
