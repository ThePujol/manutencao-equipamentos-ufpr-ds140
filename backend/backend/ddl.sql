USE manutencao_equipamentos;

CREATE TABLE categoria (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE funcionario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NULL,
    data_nasc DATE NOT NULL
);

CREATE TABLE pessoa (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tel VARCHAR(20) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    estado CHAR(2) NULL,
    cidade VARCHAR(100) NULL,
    endereco VARCHAR(255) NULL,
    num VARCHAR(10) NOT NULL,
    complemento VARCHAR(100) NULL
);

CREATE TABLE solicitacao (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(30) NOT NULL,
    defeito TEXT NOT NULL,
    situacao ENUM(
        'ABERTA',
        'ORÇADA',
        'REJEITADA',
        'REDIRECIONADA',
        'APROVADA',
        'ARRUMADA',
        'PAGA',
        'FINALIZADA'
    ) NOT NULL DEFAULT 'ABERTA',
    orcamento DECIMAL(10, 2) NULL,
	dataOrcamento DATETIME NULL,
    descricaoManutencao TEXT NULL,
    dataManutencao DATETIME NULL,
    orientacoes TEXT NULL,
    dataFinalizacao DATETIME NULL,
    motivoRejeicao TEXT NULL,
    -- Chaves Estrangeiras
    categoria_id BIGINT NOT NULL,
    cliente_id BIGINT NOT NULL,
    funcionario_id BIGINT NULL,
    -- Restrições de Chave Estrangeira (Constraints)
    CONSTRAINT fk_solicitacao_categoria 
        FOREIGN KEY (categoria_id) REFERENCES categoria(id),
    CONSTRAINT fk_solicitacao_cliente 
        FOREIGN KEY (cliente_id) REFERENCES pessoa(id),
    CONSTRAINT fk_solicitacao_funcionario 
        FOREIGN KEY (funcionario_id) REFERENCES funcionario(id)
);
 
CREATE TABLE solicitacao_status_historico (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    solicitacao_id BIGINT NOT NULL,
    situacao VARCHAR(20) NOT NULL,
    data_hora DATETIME NOT NULL,
    observacao VARCHAR(255),
    FOREIGN KEY (solicitacao_id) REFERENCES solicitacao(id)
);


