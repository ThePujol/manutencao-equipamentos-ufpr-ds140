-- TABELA PESSOA (Cliente ou Funcionário)
DEFINE TABLE pessoa SCHEMAFULL;
DEFINE FIELD id ON pessoa TYPE string;
DEFINE FIELD nome ON pessoa TYPE string;
DEFINE FIELD cpf ON pessoa TYPE string;
DEFINE FIELD email ON pessoa TYPE string;
DEFINE FIELD senha ON pessoa TYPE string;
DEFINE FIELD telefone ON pessoa TYPE string;
DEFINE FIELD tipo ON pessoa TYPE string; 


DEFINE TABLE endereco SCHEMAFULL;
DEFINE FIELD id ON endereco TYPE string;
DEFINE FIELD id_usuario ON endereco TYPE record(pessoa);
DEFINE FIELD cep ON endereco TYPE string;
DEFINE FIELD logradouro ON endereco TYPE string;
DEFINE FIELD numero ON endereco TYPE string;
DEFINE FIELD complemento ON endereco TYPE string;
DEFINE FIELD bairro ON endereco TYPE string;
DEFINE FIELD cidade ON endereco TYPE string;
DEFINE FIELD estado ON endereco TYPE string;


DEFINE TABLE categoria SCHEMAFULL;
DEFINE FIELD id ON categoria TYPE string;
DEFINE FIELD nome_categoria ON categoria TYPE string;


DEFINE TABLE equipamento SCHEMAFULL;
DEFINE FIELD id ON equipamento TYPE string;
DEFINE FIELD id_categoria ON equipamento TYPE record(categoria);
DEFINE FIELD descricao ON equipamento TYPE string;


DEFINE TABLE solicitacao SCHEMAFULL;
DEFINE FIELD id ON solicitacao TYPE string;
DEFINE FIELD id_usuario_cliente ON solicitacao TYPE record(pessoa);
DEFINE FIELD id_equipamento ON solicitacao TYPE record(equipamento);
DEFINE FIELD descricao_defeito ON solicitacao TYPE string;
DEFINE FIELD estado ON solicitacao TYPE string; 
DEFINE FIELD data_abertura ON solicitacao TYPE datetime;


DEFINE TABLE historico_status SCHEMAFULL;
DEFINE FIELD id ON historico_status TYPE string;
DEFINE FIELD id_solicitacao ON historico_status TYPE record(solicitacao);
DEFINE FIELD id_usuario_funcionario ON historico_status TYPE record(pessoa);
DEFINE FIELD estado_anterior ON historico_status TYPE string;
DEFINE FIELD estado_atual ON historico_status TYPE string;
DEFINE FIELD data_hora ON historico_status TYPE datetime;


DEFINE TABLE orcamento SCHEMAFULL;
DEFINE FIELD id ON orcamento TYPE string;
DEFINE FIELD id_solicitacao ON orcamento TYPE record(solicitacao);
DEFINE FIELD id_funcionario ON orcamento TYPE record(pessoa);
DEFINE FIELD valor ON orcamento TYPE number;
DEFINE FIELD data_hora ON orcamento TYPE datetime;


DEFINE TABLE devolucao SCHEMAFULL;
DEFINE FIELD id ON devolucao TYPE string;
DEFINE FIELD id_solicitacao ON devolucao TYPE record(solicitacao);
DEFINE FIELD id_funcionario ON devolucao TYPE record(pessoa);
DEFINE FIELD data_devolucao ON devolucao TYPE datetime;
DEFINE FIELD observacoes ON devolucao TYPE string;
