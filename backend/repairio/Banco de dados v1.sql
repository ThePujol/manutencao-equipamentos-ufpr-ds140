
CREATE TABLE pessoa (
    id TEXT PRIMARY KEY,
    nome TEXT,
    cpf TEXT,
    email TEXT,
    senha TEXT,
    telefone TEXT,
    tipo TEXT ('cliente', 'funcionario'),
);
CREATE TABLE funcionario (
    id TEXT PRIMARY KEY,
    id_usuario TEXT REFERENCES pessoa(id),
    cargo TEXT,
    salario NUMERIC
);
CREATE TABLE endereco (
    id TEXT PRIMARY KEY,
    id_usuario TEXT REFERENCES pessoa(id),
    cep TEXT,
    logradouro TEXT,
    numero TEXT,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
);


CREATE TABLE categoria (
    id TEXT PRIMARY KEY,
    nome_categoria TEXT
);


CREATE TABLE equipamento (
    id TEXT PRIMARY KEY,
    id_categoria TEXT REFERENCES categoria(id),
    descricao TEXT
);


CREATE TABLE solicitacao (
    id TEXT PRIMARY KEY,
    id_usuario_cliente TEXT REFERENCES pessoa(id),
    id_equipamento TEXT REFERENCES equipamento(id),
    descricao_defeito TEXT,
    estado TEXT,
    data_abertura TIMESTAMP
);


CREATE TABLE historico_status (
    id TEXT PRIMARY KEY,
    id_solicitacao TEXT REFERENCES solicitacao(id),
    id_usuario_funcionario TEXT REFERENCES pessoa(id),
    estado_anterior TEXT,
    estado_atual TEXT,
    data_hora TIMESTAMP
);


CREATE TABLE orcamento (
    id TEXT PRIMARY KEY,
    id_solicitacao TEXT REFERENCES solicitacao(id),
    id_funcionario TEXT REFERENCES pessoa(id),
    valor NUMERIC,
    data_hora TIMESTAMP
);


CREATE TABLE devolucao (
    id TEXT PRIMARY KEY,
    id_solicitacao TEXT REFERENCES solicitacao(id),
    id_funcionario TEXT REFERENCES pessoa(id),
    data_devolucao TIMESTAMP,
    observacoes TEXT
);

CREATE TABLE pagamento (
    id TEXT PRIMARY KEY,
    id_orcamento TEXT REFERENCES orcamento(id),
    id_funcionario TEXT REFERENCES pessoa(id),
    valor NUMERIC,
    data_hora TIMESTAMP
);