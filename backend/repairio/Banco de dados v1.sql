
CREATE DATABASE manutencao_equipamentos;
\c manutencao_equipamentos;


CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha_hash VARCHAR(255) NOT NULL,
    endereco_cep VARCHAR(9),
    endereco_logradouro VARCHAR(100),
    endereco_numero VARCHAR(10),
    endereco_complemento VARCHAR(50),
    endereco_bairro VARCHAR(50),
    endereco_cidade VARCHAR(50),
    endereco_uf VARCHAR(2)
);


CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de Categorias de Equipamento
CREATE TABLE categoria_equipamento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE solicitacao (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES cliente(id),
    categoria_id INTEGER NOT NULL REFERENCES categoria_equipamento(id),
    descricao_equipamento VARCHAR(100) NOT NULL,
    descricao_defeito TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ABERTA',
    data_hora_abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE historico_status (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER NOT NULL REFERENCES solicitacao(id),
    estado_anterior VARCHAR(20),
    estado_novo VARCHAR(20) NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    funcionario_id INTEGER REFERENCES funcionario(id)
);


CREATE TABLE orcamento (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER UNIQUE NOT NULL REFERENCES solicitacao(id),
    valor NUMERIC(10, 2) NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    funcionario_id INTEGER NOT NULL REFERENCES funcionario(id)
);


CREATE TABLE manutencao (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER UNIQUE NOT NULL REFERENCES solicitacao(id),
    funcionario_id INTEGER NOT NULL REFERENCES funcionario(id),
    descricao_servico TEXT NOT NULL,
    orientacoes_cliente TEXT,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE redirecionamento (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER NOT NULL REFERENCES solicitacao(id),
    funcionario_origem_id INTEGER NOT NULL REFERENCES funcionario(id),
    funcionario_destino_id INTEGER NOT NULL REFERENCES funcionario(id),
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT redirecionamento_distinto CHECK (funcionario_origem_id <> funcionario_destino_id)
);


CREATE TABLE pagamento (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER UNIQUE NOT NULL REFERENCES solicitacao(id),
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER UNIQUE NOT NULL REFERENCES solicitacao(id),
    nota INTEGER CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notificacao (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES cliente(id),
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);