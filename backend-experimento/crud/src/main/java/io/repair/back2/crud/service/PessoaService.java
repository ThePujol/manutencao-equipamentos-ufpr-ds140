package io.repair.back2.crud.service;

import io.repair.back2.crud.dto.PessoaDTO;
import io.repair.back2.crud.exception.BadRequestException;
import io.repair.back2.crud.exception.ResourceNotFoundException;
import io.repair.back2.crud.model.Pessoa;
import io.repair.back2.crud.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepo;

    // ===== MÉTODOS DE CONVERSÃO ENTRE ENTITY ↔ DTO =====

    private PessoaDTO toDTO(Pessoa p) {
        return new PessoaDTO(
                p.getId(),
                p.getEmail(),
                p.getSenha(),
                p.getNome(),
                p.getCpf(),
                p.getTel(),
                p.getCep(),
                p.getEstado(),
                p.getCidade(),
                p.getEndereco(),
                p.getNum(),
                p.getComplemento());
    }

    private Pessoa toEntity(PessoaDTO dto) {
        Pessoa p = new Pessoa();
        p.setEmail(dto.getEmail());
        p.setSenha(dto.getSenha());
        p.setNome(dto.getNome());
        p.setCpf(dto.getCpf());
        p.setTel(dto.getTel());
        p.setCep(dto.getCep());
        p.setEstado(dto.getEstado());
        p.setCidade(dto.getCidade());
        p.setEndereco(dto.getEndereco());
        p.setNum(dto.getNum());
        p.setComplemento(dto.getComplemento());
        return p;
    }

    // ===== CRUD SIMPLES =====

    public List<PessoaDTO> buscarTodos() {
        return pessoaRepo.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PessoaDTO buscarPorId(Long id) {
        Pessoa p = pessoaRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com id " + id));
        return toDTO(p);
    }

    public PessoaDTO criar(PessoaDTO dto) {
        // Exemplo de validação: e-mail e CPF únicos
        pessoaRepo.findByEmail(dto.getEmail()).ifPresent(p -> {
            throw new BadRequestException("Já existe pessoa cadastrada com e-mail " + dto.getEmail());
        });
        pessoaRepo.findByCpf(dto.getCpf()).ifPresent(p -> {
            throw new BadRequestException("Já existe pessoa cadastrada com CPF " + dto.getCpf());
        });

        Pessoa salvo = pessoaRepo.save(toEntity(dto));
        return toDTO(salvo);
    }

    public PessoaDTO atualizar(Long id, PessoaDTO dto) {
        Pessoa existente = pessoaRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com id " + id));

        // Se o e-mail estiver sendo alterado, verificar duplicidade
        if (!existente.getEmail().equals(dto.getEmail())) {
            pessoaRepo.findByEmail(dto.getEmail()).ifPresent(p -> {
                throw new BadRequestException("Já existe pessoa cadastrada com e-mail " + dto.getEmail());
            });
        }
        // Se o CPF estiver sendo alterado, verificar duplicidade
        if (!existente.getCpf().equals(dto.getCpf())) {
            pessoaRepo.findByCpf(dto.getCpf()).ifPresent(p -> {
                throw new BadRequestException("Já existe pessoa cadastrada com CPF " + dto.getCpf());
            });
        }

        // Atualizar campos permitidos
        existente.setEmail(dto.getEmail());
        existente.setSenha(dto.getSenha());
        existente.setNome(dto.getNome());
        existente.setCpf(dto.getCpf());
        existente.setTel(dto.getTel());
        existente.setCep(dto.getCep());
        existente.setEstado(dto.getEstado());
        existente.setCidade(dto.getCidade());
        existente.setEndereco(dto.getEndereco());
        existente.setNum(dto.getNum());
        existente.setComplemento(dto.getComplemento());

        Pessoa atualizado = pessoaRepo.save(existente);
        return toDTO(atualizado);
    }

    public void excluir(Long id) {
        Pessoa existente = pessoaRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa não encontrada com id " + id));
        pessoaRepo.delete(existente);
    }
}
