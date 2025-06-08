package com.repairio.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.repairio.backend.dao.PessoaDao;
import com.repairio.backend.model.Pessoa;
import com.repairio.backend.util.PasswordUtil;

@Service
public class PessoaService {

    private final PessoaDao pessoaDao;

    public PessoaService(PessoaDao pessoaDao) {
        this.pessoaDao = pessoaDao;
    }

    public List<Pessoa> findAll() {
        return pessoaDao.findAll();
    }

    public Pessoa findById(Long id) {
        return pessoaDao.findById(id);
    }

    public void save(Pessoa pessoa, String plainPassword) {
        String salt = PasswordUtil.generateSalt();
        String hashed = PasswordUtil.hashPassword(plainPassword, salt);
        pessoa.setSenha(hashed);
        pessoa.setSalt(salt);
        pessoaDao.save(pessoa);
    }

    public void update(Pessoa pessoa) {
        pessoaDao.update(pessoa);
    }

    public void delete(Long id) {
        pessoaDao.delete(id);
    }

    public Pessoa findByEmail(String email) {
        return pessoaDao.findByEmail(email);
    }
}
