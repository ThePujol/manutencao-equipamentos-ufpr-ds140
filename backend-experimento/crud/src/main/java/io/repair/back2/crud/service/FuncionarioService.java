// src/main/java/io/repair/back2/crud/service/FuncionarioService.java
package io.repair.back2.crud.service;

import io.repair.back2.crud.dto.FuncionarioDTO;
import io.repair.back2.crud.exception.ResourceNotFoundException;
import io.repair.back2.crud.model.Funcionario;
import io.repair.back2.crud.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository repo;

    private FuncionarioDTO toDTO(Funcionario f) {
        return new FuncionarioDTO(
                f.getId(),
                f.getNome(),
                f.getEmail(),
                f.getSenha(),
                f.getDataNasc());
    }

    private Funcionario toEntity(FuncionarioDTO dto) {
        Funcionario f = new Funcionario();
        f.setId(dto.getId());
        f.setNome(dto.getNome());
        f.setEmail(dto.getEmail());
        f.setSenha(dto.getSenha());
        f.setDataNasc(dto.getDataNasc());
        return f;
    }

    public List<FuncionarioDTO> buscarTodos() {
        return repo.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public FuncionarioDTO buscarPorId(Long id) {
        Funcionario f = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado: " + id));
        return toDTO(f);
    }

    public FuncionarioDTO criar(FuncionarioDTO dto) {
        Funcionario salvo = repo.save(toEntity(dto));
        return toDTO(salvo);
    }

    public FuncionarioDTO atualizar(Long id, FuncionarioDTO dto) {
        Funcionario existente = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado: " + id));
        existente.setNome(dto.getNome());
        existente.setEmail(dto.getEmail());
        existente.setSenha(dto.getSenha());
        existente.setDataNasc(dto.getDataNasc());
        Funcionario atualizado = repo.save(existente);
        return toDTO(atualizado);
    }

    public void excluir(Long id) {
        Funcionario existente = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado: " + id));
        repo.delete(existente);
    }
}
