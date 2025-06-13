package com.repairio.backend.dao;

import com.repairio.backend.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SolicitacaoDao {
    private static final Logger logger = LoggerFactory.getLogger(SolicitacaoDao.class);
    private final JdbcTemplate jdbcTemplate;
    private final CategoriaDao categoriaDao;
    private final PessoaDao pessoaDao;
    private final FuncionarioDao funcionarioDao;

    public SolicitacaoDao(JdbcTemplate jdbcTemplate, CategoriaDao categoriaDao, PessoaDao pessoaDao,
            FuncionarioDao funcionarioDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.categoriaDao = categoriaDao;
        this.pessoaDao = pessoaDao;
        this.funcionarioDao = funcionarioDao;
    }

    public List<Solicitacao> findAll() {
        logger.info("Buscando todas as solicitações");
        try {
            return jdbcTemplate.query("SELECT * FROM solicitacao",
                    (rs, rowNum) -> {
                        Solicitacao s = new Solicitacao();
                        s.setId(rs.getLong("id"));
                        s.setDescricao(rs.getString("descricao"));
                        s.setCategoria(categoriaDao.findById(rs.getLong("categoria_id")));
                        s.setDefeito(rs.getString("defeito"));
                        s.setOrcamento(rs.getDouble("orcamento"));
                        s.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                        s.setCliente(pessoaDao.findById(rs.getLong("cliente_id")));
                        Long funcionarioId = rs.getLong("funcionario_id");
                        if (!rs.wasNull()) {
                            s.setFuncionario(funcionarioDao.findById(funcionarioId));
                        }
                        return s;
                    });
        } catch (Exception e) {
            logger.error("Erro ao buscar solicitações", e);
            throw e;
        }
    }

    public Solicitacao findById(Long id) {
        logger.info("Buscando solicitação por id: {}", id);
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM solicitacao WHERE id = ?",
                    (rs, rowNum) -> {
                        Solicitacao s = new Solicitacao();
                        s.setId(rs.getLong("id"));
                        s.setDescricao(rs.getString("descricao"));
                        s.setCategoria(categoriaDao.findById(rs.getLong("categoria_id")));
                        s.setDefeito(rs.getString("defeito"));
                        s.setOrcamento(rs.getDouble("orcamento"));
                        s.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                        s.setCliente(pessoaDao.findById(rs.getLong("cliente_id")));
                        Long funcionarioId = rs.getLong("funcionario_id");
                        if (!rs.wasNull()) {
                            s.setFuncionario(funcionarioDao.findById(funcionarioId));
                        }
                        return s;
                    }, id);
        } catch (Exception e) {
            logger.error("Erro ao buscar solicitação por id: {}", id, e);
            throw e;
        }
    }

    public void save(Solicitacao solicitacao) {
        logger.info("Salvando solicitação");
        if (solicitacao.getDescricao() == null || solicitacao.getDescricao().isEmpty()) {
            throw new IllegalArgumentException("Descrição é obrigatória");
        }
        try {
            jdbcTemplate.update(
                    "INSERT INTO solicitacao (descricao, categoria_id, defeito, orcamento, situacao, cliente_id, funcionario_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    solicitacao.getDescricao(),
                    solicitacao.getCategoria().getId(),
                    solicitacao.getDefeito(),
                    solicitacao.getOrcamento(),
                    solicitacao.getSituacao().name(),
                    solicitacao.getCliente().getId(),
                    solicitacao.getFuncionario() != null ? solicitacao.getFuncionario().getId() : null);
            logger.info("Solicitação salva com sucesso");
        } catch (Exception e) {
            logger.error("Erro ao salvar solicitação", e);
            throw e;
        }
    }

    public void update(Solicitacao solicitacao) {
        logger.info("Atualizando solicitação: {}", solicitacao.getId());
        if (findById(solicitacao.getId()) == null) {
            throw new IllegalArgumentException("Solicitação não encontrada para atualização");
        }
        try {
            jdbcTemplate.update(
                    "UPDATE solicitacao SET descricao = ?, categoria_id = ?, defeito = ?, orcamento = ?, situacao = ?, cliente_id = ?, funcionario_id = ? WHERE id = ?",
                    solicitacao.getDescricao(),
                    solicitacao.getCategoria().getId(),
                    solicitacao.getDefeito(),
                    solicitacao.getOrcamento(),
                    solicitacao.getSituacao().name(),
                    solicitacao.getCliente().getId(),
                    solicitacao.getFuncionario() != null ? solicitacao.getFuncionario().getId() : null,
                    solicitacao.getId());
            logger.info("Solicitação atualizada com sucesso: {}", solicitacao.getId());
        } catch (Exception e) {
            logger.error("Erro ao atualizar solicitação: {}", solicitacao.getId(), e);
            throw e;
        }
    }

    public void delete(Long id) {
        logger.info("Deletando solicitação: {}", id);
        if (findById(id) == null) {
            throw new IllegalArgumentException("Solicitação não encontrada para exclusão");
        }
        try {
            jdbcTemplate.update("DELETE FROM solicitacao WHERE id = ?", id);
            logger.info("Solicitação deletada com sucesso: {}", id);
        } catch (Exception e) {
            logger.error("Erro ao deletar solicitação: {}", id, e);
            throw e;
        }
    }
}