import { Categoria } from './shared/models/categoria.model';
import { Funcionario } from './shared/models/funcionario.model';
import { Situacao, Solicitacao } from './shared/models/solicitacao.model';

export const listaCategorias: Categoria[] = [
	new Categoria(1, 'Celular'),
	new Categoria(2, 'Notebook'),
	new Categoria(3, 'Desktop'),
	new Categoria(4, 'Teclado'),
	new Categoria(5, 'Impressora'),
	new Categoria(6, 'Mouse'),
	new Categoria(7, 'Monitor'),
];

export const listaFuncionarios: Funcionario[] = [
	new Funcionario(1, 'maria@gmail.com', 'Maria Silva', '12345', new Date('1989-02-05')),
	new Funcionario(2, 'mario@gmail.com', 'Mario Silva', '12345', new Date('1986-02-05')),
];

export const listaSolicitacoes: Solicitacao[] = [
	new Solicitacao(
		1,
		'Notebook acer',
		listaCategorias[5],
		'Quebrado',
		Situacao.arrumada,
		new Date('2025-03-10'),
		listaFuncionarios[0],
		92.45,
		new Date('2025-03-25')
	),
	new Solicitacao(
		2,
		'iPhone 12',
		listaCategorias[0],
		'Quebrado',
		Situacao.aprovada,
		new Date('2025-03-16'),
		listaFuncionarios[1],
		87.25,
		new Date('2025-03-23')
	),
	new Solicitacao(
		3,
		'Teclado Logitech',
		listaCategorias[3],
		'Quebrado',
		Situacao.orcada,
		new Date('2025-03-21'),
		listaFuncionarios[0],
		122.32,
		new Date('2025-03-23')
	),
	new Solicitacao(
		6,
		'Teclado multilaser',
		listaCategorias[3],
		'Quebrado',
		Situacao.rejeitada,
		new Date('2025-03-22'),
		listaFuncionarios[1],
		300.32,
		new Date('2025-03-24')
	),
	new Solicitacao(4, 'Mouse Razer', listaCategorias[5], 'Quebrado', Situacao.aberta, new Date('2025-03-22')),
	new Solicitacao(5, 'Monitor aoc', listaCategorias[6], 'Quebrado', Situacao.aberta, new Date('2025-03-24')),
];
