// src/main/java/io/repair/back2/crud/repository/FuncionarioRepository.java
package io.repair.back2.crud.repository;

import io.repair.back2.crud.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    // opcional: List<Funcionario> findByNomeContaining(String nome);
}
