package com.repairio.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repairio.backend.dao.FuncionarioDao;
import com.repairio.backend.model.Funcionario;
import com.repairio.backend.util.PasswordUtil;

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

    public void update(Funcionario funcionario, String plainPassword) {
        String salt = PasswordUtil.generateSalt();
        String hashed = PasswordUtil.hashPassword(plainPassword, salt);
        funcionario.setSenha(hashed);
        funcionario.setSalt(salt);
        funcionarioDao.update(funcionario);
    }

    public void delete(Long id) {
        funcionarioDao.delete(id);
    }

    public Funcionario findByEmail(String email) {
        return funcionarioDao.findByEmail(email);
    }
}
