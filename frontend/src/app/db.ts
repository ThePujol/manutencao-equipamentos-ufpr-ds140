export enum Estado {
	aberta = 'Aberta',
	orcada = 'Orçada',
	aprovada = 'Aprovada',
	rejeitada = 'Rejeitada',
	arrumada = 'Arrumada',
}

export interface Categoria {
	id: number;
	descricao: string;
}

export interface Funcionario {
	id: number;
	nome: string;
	cpf?: string;
	email?: string;
	senha?: string;
	telefone?: string;
}

export interface Solicitacao {
	id: number;
	dataSolicitacao: Date;
	descricaoEquipamento: string;
	descricaoDefeito: string;
	estado: Estado;
	categoria: Categoria;
	funcionario: Funcionario;
	dataOrcamento: Date;
}

export const listaCategorias: Categoria[] = [
	{
		id: 1,
		descricao: 'Notebook',
	},
	{
		id: 2,
		descricao: 'Desktop',
	},
	{
		id: 3,
		descricao: 'Impressora',
	},
	{
		id: 4,
		descricao: 'Teclado',
	},
	{
		id: 5,
		descricao: 'Mouse',
	},
];

export const listaFuncionarios: Funcionario[] = [
	{
		id: 1,
		nome: 'Maria',
	},
	{
		id: 2,
		nome: 'Mario',
	},
];

export const listaSolicitacoes: Solicitacao[] = [
	{
		id: 1,
		dataSolicitacao: new Date('2025-03-10'),
		descricaoEquipamento: 'Notebook acer',
		descricaoDefeito: 'Quebrado',
		estado: Estado.arrumada,
		categoria: listaCategorias[0],
		funcionario: listaFuncionarios[0],
		dataOrcamento: new Date('2025-03-25'),
	},
	{
		id: 2,
		dataSolicitacao: new Date('2025-03-16'),
		descricaoEquipamento: 'iPhone 12',
		descricaoDefeito: 'Quebrado',
		estado: Estado.aprovada,
		categoria: listaCategorias[2],
		funcionario: listaFuncionarios[1],
		dataOrcamento: new Date('2025-03-23'),
	},
	{
		id: 3,
		dataSolicitacao: new Date('2025-03-21'),
		descricaoEquipamento: 'Teclado LogiTech',
		descricaoDefeito: 'Quebrado',
		estado: Estado.orcada,
		categoria: listaCategorias[3],
		funcionario: listaFuncionarios[0],
		dataOrcamento: new Date('2025-03-23'),
	},
	{
		id: 4,
		dataSolicitacao: new Date('2025-03-22'),
		descricaoEquipamento: 'Mouse Razer',
		descricaoDefeito: 'Quebrado',
		estado: Estado.aberta,
		categoria: listaCategorias[1],
		funcionario: listaFuncionarios[1],
		dataOrcamento: new Date('2025-03-23'),
	},
	{
		id: 5,
		dataSolicitacao: new Date('2025-03-24'),
		descricaoEquipamento: 'Monitor aoc',
		descricaoDefeito: 'Quebrado',
		estado: Estado.aberta,
		categoria: listaCategorias[1],
		funcionario: listaFuncionarios[1],
		dataOrcamento: new Date('2025-03-29'),
	},
];
