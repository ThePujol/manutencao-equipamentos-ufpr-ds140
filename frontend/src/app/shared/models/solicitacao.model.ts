import { Categoria } from './categoria.model';
import { Funcionario } from './funcionario.model';
import { Pessoa } from './pessoa.model';

export enum Situacao {
	aberta = 'Aberta',
	orcada = 'Orçada',
	rejeitada = 'Rejeitada',
	redirecionada = 'Redirecionada',
	aprovada = 'Aprovada',
	arrumada = 'Arrumada',
	paga = 'Paga',
	finalizada = 'Finalizada',
}
export class Solicitacao {
	constructor(
		public id: number,
		public descricao: string,
		public categoria: Categoria,
		public defeito: string,
		public situacao: Situacao,
		public dataSolicitacao: Date,
		public cliente: Pessoa,
		public funcionario?: Funcionario,
		public orcamento?: number,
		public dataOrcamento?: Date,
		public descricaoManutencao?: string,
		public dataManutencao?: Date,
		public orientacoes?: string,
		public dataFinalizacao?: Date,
		public motivoRejeicao?: string
	) {}
}
