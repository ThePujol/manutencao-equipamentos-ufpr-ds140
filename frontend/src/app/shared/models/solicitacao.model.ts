import { Categoria } from './categoria.model';
import { Funcionario } from './funcionario.model';
import { Pessoa } from './pessoa.model';

export enum Situacao {
	aberta = 'ABERTA',
	orcada = 'ORÇADA',
	rejeitada = 'REJEITADA',
	redirecionada = 'REDIRECIONADA',
	aprovada = 'APROVADA',
	arrumada = 'ARRUMADA',
	paga = 'PAGA',
	finalizada = 'FINALIZADA',
}
export class Solicitacao {
	constructor(
		public id: number,
		public descricao: string,
		public categoria: Categoria,
		public defeito: string,
		public situacao: Situacao,
		public cliente: Pessoa,
		/**
		 * Campo vindo do backend, representa a data da primeira entrada no histórico de status.
		 * Pode ser null se não houver histórico.
		 */
		public dataSolicitacaoAbertura?: Date | null,
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
