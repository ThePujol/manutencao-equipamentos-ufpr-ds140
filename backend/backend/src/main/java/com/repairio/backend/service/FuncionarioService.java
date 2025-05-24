package com.repairio.backend.service;

import com.repairio.backend.dao.FuncionarioDao;
import com.repairio.backend.model.Funcionario;
import org.springframework.stereotype.Service;
import com.repairio.backend.util.PasswordUtil;

import java.util.List;

@Service
public class FuncionarioService {
    private final FuncionarioDao funcionarioDao;

    public FuncionarioService(FuncionarioDao funcionarioDao) {
        this.funcionarioDao = funcionarioDao;
    }

    public List<Funcionario> findAll() {
        return funcionarioDao.findAll();
    }

    public Funcionario findById(Long id) {
        return funcionarioDao.findById(id);
    }

    public void save(Funcionario funcionario, String plainPassword) {
        String salt = PasswordUtil.generateSalt();
        String hashed = PasswordUtil.hashPassword(plainPassword, salt);
        funcionario.setSenha(hashed);
        funcionario.setSalt(salt);
        funcionarioDao.save(funcionario);
    }

    public void update(Funcionario funcionario) {
        funcionarioDao.update(funcionario);
    }

    public void delete(Long id) {
        funcionarioDao.delete(id);
    }

    public Funcionario findByEmail(String email) {
        return funcionarioDao.findByEmail(email);
    }
}