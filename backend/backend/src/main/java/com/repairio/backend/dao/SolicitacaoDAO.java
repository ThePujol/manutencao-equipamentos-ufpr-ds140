package com.repairio.backend.dao;

import java.sql.Timestamp;
import java.util.Date;
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
                    s.setDataOrcamento(rs.getDate("dataOrcamento"));
                    s.setDescricaoManutencao(rs.getString("descricaoManutencao"));
                    s.setDataManutencao(rs.getDate("dataManutencao"));
                    s.setOrientacoes(rs.getString("orientacoes"));
                    s.setDataFinalizacao(rs.getDate("dataFinalizacao"));
                    s.setMotivoRejeicao(rs.getString("motivoRejeicao"));
                    // Buscar a data de abertura (primeira do histórico)
                    Date dataAbertura = jdbcTemplate.query(
                            "SELECT data_hora FROM solicitacao_status_historico WHERE solicitacao_id = ? ORDER BY data_hora ASC LIMIT 1",
                            (rsh) -> rsh.next() ? new Date(rsh.getTimestamp("data_hora").getTime()) : null,
                            s.getId());
                    s.setDataSolicitacaoAbertura(dataAbertura);
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
                    s.setDataOrcamento(rs.getDate("dataOrcamento"));
                    s.setDescricaoManutencao(rs.getString("descricaoManutencao"));
                    s.setDataManutencao(rs.getDate("dataManutencao"));
                    s.setOrientacoes(rs.getString("orientacoes"));
                    s.setDataFinalizacao(rs.getDate("dataFinalizacao"));
                    s.setMotivoRejeicao(rs.getString("motivoRejeicao"));
                    // Buscar a data de abertura (primeira do histórico)
                    Date dataAbertura = jdbcTemplate.query(
                            "SELECT data_hora FROM solicitacao_status_historico WHERE solicitacao_id = ? ORDER BY data_hora ASC LIMIT 1",
                            (rsh) -> rsh.next() ? new Date(rsh.getTimestamp("data_hora").getTime()) : null,
                            s.getId());
                    s.setDataSolicitacaoAbertura(dataAbertura);
                    return s;
                }, id);
    }

    public List<Solicitacao> findByCategoryId(Long id) {
        return jdbcTemplate.query("SELECT * FROM solicitacao WHERE categoria_id = ?",
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
                    s.setDataOrcamento(rs.getDate("dataOrcamento"));
                    s.setDescricaoManutencao(rs.getString("descricaoManutencao"));
                    s.setDataManutencao(rs.getDate("dataManutencao"));
                    s.setOrientacoes(rs.getString("orientacoes"));
                    s.setDataFinalizacao(rs.getDate("dataFinalizacao"));
                    s.setMotivoRejeicao(rs.getString("motivoRejeicao"));
                    // Buscar a data de abertura (primeira do histórico)
                    Date dataAbertura = jdbcTemplate.query(
                            "SELECT data_hora FROM solicitacao_status_historico WHERE solicitacao_id = ? ORDER BY data_hora ASC LIMIT 1",
                            (rsh) -> rsh.next() ? new Date(rsh.getTimestamp("data_hora").getTime()) : null,
                            s.getId());
                    s.setDataSolicitacaoAbertura(dataAbertura);
                    return s;
                }, id);
    }

    public List<Solicitacao> findByFuncionarioId(Long id) {
        return jdbcTemplate.query("SELECT * FROM solicitacao WHERE funcionario_id = ?",
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
                    s.setDataOrcamento(rs.getDate("dataOrcamento"));
                    s.setDescricaoManutencao(rs.getString("descricaoManutencao"));
                    s.setDataManutencao(rs.getDate("dataManutencao"));
                    s.setOrientacoes(rs.getString("orientacoes"));
                    s.setDataFinalizacao(rs.getDate("dataFinalizacao"));
                    s.setMotivoRejeicao(rs.getString("motivoRejeicao"));
                    // Buscar a data de abertura (primeira do histórico)
                    Date dataAbertura = jdbcTemplate.query(
                            "SELECT data_hora FROM solicitacao_status_historico WHERE solicitacao_id = ? ORDER BY data_hora ASC LIMIT 1",
                            (rsh) -> rsh.next() ? new Date(rsh.getTimestamp("data_hora").getTime()) : null,
                            s.getId());
                    s.setDataSolicitacaoAbertura(dataAbertura);
                    return s;
                }, id);
    }

    public void save(Solicitacao solicitacao) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            var ps = connection.prepareStatement(
                    "INSERT INTO solicitacao (descricao, categoria_id, defeito, orcamento, situacao, cliente_id, funcionario_id, dataOrcamento, descricaoManutencao, dataManutencao, orientacoes, dataFinalizacao, motivoRejeicao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    new String[]{"id"});
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
            ps.setTimestamp(8,
                    solicitacao.getDataOrcamento() != null ? new Timestamp(solicitacao.getDataOrcamento().getTime())
                    : null);
            ps.setString(9, solicitacao.getDescricaoManutencao());
            ps.setTimestamp(10,
                    solicitacao.getDataManutencao() != null ? new Timestamp(solicitacao.getDataManutencao().getTime())
                    : null);
            ps.setString(11, solicitacao.getOrientacoes());
            ps.setDate(12,
                    solicitacao.getDataFinalizacao() != null
                    ? new java.sql.Date(solicitacao.getDataFinalizacao().getTime())
                    : null);
            ps.setString(13, solicitacao.getMotivoRejeicao());
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
                + "dataOrcamento = ?, descricaoManutencao = ?, dataManutencao = ?, "
                + "orientacoes = ?, dataFinalizacao = ?, motivoRejeicao = ? "
                + "WHERE id = ?",
                solicitacao.getDescricao(),
                solicitacao.getCategoria().getId(),
                solicitacao.getDefeito(),
                solicitacao.getOrcamento(),
                solicitacao.getSituacao().name(),
                solicitacao.getCliente().getId(),
                solicitacao.getFuncionario() != null ? solicitacao.getFuncionario().getId() : null,
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
