package com.repairio.backend.service;

import com.repairio.backend.dao.PessoaDao;
import com.repairio.backend.model.Pessoa;
import com.repairio.backend.util.PasswordUtil;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Pessoa save(Pessoa pessoa, String plainPassword) {
        String salt = PasswordUtil.generateSalt();
        String hashed = PasswordUtil.hashPassword(plainPassword, salt);
        pessoa.setSenha(hashed);
        pessoa.setSalt(salt);
        return pessoaDao.save(pessoa);
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