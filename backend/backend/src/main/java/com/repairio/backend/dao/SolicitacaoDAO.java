package com.repairio.backend.dao;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.repairio.backend.model.Situacao;
import com.repairio.backend.model.Solicitacao;

@Repository
public class SolicitacaoDao {

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
        return jdbcTemplate.query("SELECT * FROM solicitacao",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDescricao(rs.getString("descricao"));
                    s.setCategoria(categoriaDao.findById(rs.getLong("categoria_id")));
                    s.setDefeito(rs.getString("defeito"));
                    s.setOrcamento(rs.getObject("orcamento", Double.class));
                    s.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                    s.setCliente(pessoaDao.findById(rs.getLong("cliente_id")));
                    Long funcionarioId = rs.getLong("funcionario_id");
                    if (!rs.wasNull()) {
                        s.setFuncionario(funcionarioDao.findById(funcionarioId));
                    }
                    s.setDataSolicitacao(rs.getTimestamp("dataSolicitacao") != null
                            ? rs.getTimestamp("dataSolicitacao").toLocalDateTime()
                            : null);
                    s.setDataOrcamento(rs.getDate("dataOrcamento"));
                    s.setDescricaoManutencao(rs.getString("descricaoManutencao"));
                    s.setDataManutencao(rs.getDate("dataManutencao"));
                    s.setOrientacoes(rs.getString("orientacoes"));
                    s.setDataFinalizacao(rs.getDate("dataFinalizacao"));
                    s.setMotivoRejeicao(rs.getString("motivoRejeicao"));
                    return s;
                });
    }

    public Solicitacao findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM solicitacao WHERE id = ?",
                (rs, rowNum) -> {
                    Solicitacao s = new Solicitacao();
                    s.setId(rs.getLong("id"));
                    s.setDescricao(rs.getString("descricao"));
                    s.setCategoria(categoriaDao.findById(rs.getLong("categoria_id")));
                    s.setDefeito(rs.getString("defeito"));
                    s.setOrcamento(rs.getObject("orcamento", Double.class));
                    s.setSituacao(Situacao.valueOf(rs.getString("situacao")));
                    s.setCliente(pessoaDao.findById(rs.getLong("cliente_id")));
                    Long funcionarioId = rs.getLong("funcionario_id");
                    if (!rs.wasNull()) {
                        s.setFuncionario(funcionarioDao.findById(funcionarioId));
                    }
                    s.setDataSolicitacao(rs.getTimestamp("dataSolicitacao") != null
                            ? rs.getTimestamp("dataSolicitacao").toLocalDateTime()
                            : null);
                    s.setDataOrcamento(rs.getDate("dataOrcamento"));
                    s.setDescricaoManutencao(rs.getString("descricaoManutencao"));
                    s.setDataManutencao(rs.getDate("dataManutencao"));
                    s.setOrientacoes(rs.getString("orientacoes"));
                    s.setDataFinalizacao(rs.getDate("dataFinalizacao"));
                    s.setMotivoRejeicao(rs.getString("motivoRejeicao"));
                    return s;
                }, id);
    }

    public void save(Solicitacao solicitacao) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(
                    "INSERT INTO solicitacao (descricao, categoria_id, defeito, orcamento, situacao, cliente_id, funcionario_id, dataSolicitacao, dataOrcamento, descricaoManutencao, dataManutencao, orientacoes, dataFinalizacao, motivoRejeicao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    new String[] { "id" });
            ps.setString(1, solicitacao.getDescricao());
            ps.setLong(2, solicitacao.getCategoria().getId());
            ps.setString(3, solicitacao.getDefeito());
            if (solicitacao.getOrcamento() != null) {
                ps.setDouble(4, solicitacao.getOrcamento());
            } else {
                ps.setNull(4, java.sql.Types.DOUBLE);
            }
            ps.setString(5, solicitacao.getSituacao().name());
            ps.setLong(6, solicitacao.getCliente().getId());
            if (solicitacao.getFuncionario() != null) {
                ps.setLong(7, solicitacao.getFuncionario().getId());
            } else {
                ps.setNull(7, java.sql.Types.BIGINT);
            }
            // Corrigido: setar dataSolicitacao corretamente
            ps.setTimestamp(8, Timestamp.valueOf(solicitacao.getDataSolicitacao()));
            ps.setTimestamp(9,
                    solicitacao.getDataOrcamento() != null ? new Timestamp(solicitacao.getDataOrcamento().getTime())
                            : null);
            ps.setString(10, solicitacao.getDescricaoManutencao());
            ps.setTimestamp(11,
                    solicitacao.getDataManutencao() != null ? new Timestamp(solicitacao.getDataManutencao().getTime())
                            : null);
            ps.setString(12, solicitacao.getOrientacoes());
            ps.setDate(13,
                    solicitacao.getDataFinalizacao() != null
                            ? new java.sql.Date(solicitacao.getDataFinalizacao().getTime())
                            : null);
            ps.setString(14, solicitacao.getMotivoRejeicao());
            return ps;
        }, keyHolder);
        if (keyHolder.getKey() != null) {
            solicitacao.setId(keyHolder.getKey().longValue());
        }
    }

    public void update(Solicitacao solicitacao) {
        jdbcTemplate.update(
                "UPDATE solicitacao SET "
                        + "descricao = ?, categoria_id = ?, defeito = ?, orcamento = ?, situacao = ?, cliente_id = ?, funcionario_id = ?, "
                        + "dataSolicitacao = ?, dataOrcamento = ?, descricaoManutencao = ?, dataManutencao = ?, "
                        + "orientacoes = ?, dataFinalizacao = ?, motivoRejeicao = ? "
                        + "WHERE id = ?",
                solicitacao.getDescricao(),
                solicitacao.getCategoria().getId(),
                solicitacao.getDefeito(),
                solicitacao.getOrcamento(),
                solicitacao.getSituacao().name(),
                solicitacao.getCliente().getId(),
                solicitacao.getFuncionario() != null ? solicitacao.getFuncionario().getId() : null,
                Timestamp.valueOf(solicitacao.getDataSolicitacao()),
                solicitacao.getDataOrcamento(),
                solicitacao.getDescricaoManutencao(),
                solicitacao.getDataManutencao(),
                solicitacao.getOrientacoes(),
                solicitacao.getDataFinalizacao(),
                solicitacao.getMotivoRejeicao(),
                solicitacao.getId());
    }

    public void delete(Long id) {
        jdbcTemplate.update("DELETE FROM solicitacao WHERE id = ?", id);
    }
}
