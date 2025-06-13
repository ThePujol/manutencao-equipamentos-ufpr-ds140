package com.repairio.backend.service;

import com.repairio.backend.dao.PessoaDao;
import com.repairio.backend.model.Pessoa;
import com.repairio.backend.util.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {
    private static final Logger logger = LoggerFactory.getLogger(PessoaService.class);
    private final PessoaDao pessoaDao;

    public PessoaService(PessoaDao pessoaDao) {
        this.pessoaDao = pessoaDao;
    }

    public List<Pessoa> findAll() {
        logger.info("Buscando todas as pessoas");
        return pessoaDao.findAll();
    }

    public Optional<Pessoa> findById(Long id) {
        logger.info("Buscando pessoa por id: {}", id);
        return Optional.ofNullable(pessoaDao.findById(id));
    }

    public void save(Pessoa pessoa, String plainPassword) {
        try {
            logger.info("Salvando pessoa: {}", pessoa.getEmail());
            if (plainPassword == null || plainPassword.length() < 6) {
                throw new IllegalArgumentException("Senha deve ter pelo menos 6 caracteres");
            }
            String salt = PasswordUtil.generateSalt();
            String hashed = PasswordUtil.hashPassword(plainPassword, salt);
            pessoa.setSenha(hashed);
            pessoa.setSalt(salt);
            pessoaDao.save(pessoa);
            logger.info("Pessoa salva com sucesso: {}", pessoa.getEmail());
        } catch (Exception e) {
            logger.error("Erro ao salvar pessoa: {}", pessoa.getEmail(), e);
            throw e;




































}    }        return Optional.ofNullable(pessoaDao.findByEmail(email));        logger.info("Buscando pessoa por email: {}", email);    public Optional<Pessoa> findByEmail(String email) {    }        }            throw e;            logger.error("Erro ao deletar pessoa: {}", id, e);        } catch (Exception e) {            logger.info("Pessoa deletada com sucesso: {}", id);            pessoaDao.delete(id);            }                throw new IllegalArgumentException("Pessoa não encontrada para exclusão");            if (pessoaDao.findById(id) == null) {            logger.info("Deletando pessoa: {}", id);        try {    public void delete(Long id) {    }        }            throw e;            logger.error("Erro ao atualizar pessoa: {}", pessoa.getId(), e);        } catch (Exception e) {            logger.info("Pessoa atualizada com sucesso: {}", pessoa.getId());            pessoaDao.update(pessoa);            }                throw new IllegalArgumentException("Pessoa não encontrada para atualização");            if (pessoaDao.findById(pessoa.getId()) == null) {            logger.info("Atualizando pessoa: {}", pessoa.getId());        try {    public void update(Pessoa pessoa) {    }        }        }
    }

    public void update(Pessoa pessoa) {
        try {
            logger.info("Atualizando pessoa: {}", pessoa.getId());
            if (pessoaDao.findById(pessoa.getId()) == null) {
                throw new IllegalArgumentException("Pessoa não encontrada para atualização");
            }
            pessoaDao.update(pessoa);
            logger.info("Pessoa atualizada com sucesso: {}", pessoa.getId());
        } catch (Exception e) {
            logger.error("Erro ao atualizar pessoa: {}", pessoa.getId(), e);
            throw e;
        }
    }

    public void delete(Long id) {
        try {
            logger.info("Deletando pessoa: {}", id);
            if (pessoaDao.findById(id) == null) {
                throw new IllegalArgumentException("Pessoa não encontrada para exclusão");
            }
            pessoaDao.delete(id);
            logger.info("Pessoa deletada com sucesso: {}", id);
        } catch (Exception e) {
            logger.error("Erro ao deletar pessoa: {}", id, e);
            throw e;
        }
    }

    public Optional<Pessoa> findByEmail(String email) {
        logger.info("Buscando pessoa por email: {}", email);
        return Optional.ofNullable(pessoaDao.findByEmail(email));
    }
}