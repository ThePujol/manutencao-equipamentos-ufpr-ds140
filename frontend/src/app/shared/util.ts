import { Categoria } from './models/categoria.model';
import { Funcionario } from './models/funcionario.model';
import { Solicitacao } from './models/solicitacao.model';

export class Util {
	public static tokenExpired(token: string): boolean {
		const expiry = JSON.parse(atob(token.split('.')[1])).exp;
		return Math.floor(new Date().getTime() / 1000) >= expiry;
	}

	public static pesquisarSolicitacao(
		listaCompleta: Solicitacao[],
		query: string,
		estado: string,
		dataMin?: Date,
		dataMax?: Date
	) {
		const listaFiltrada = listaCompleta.filter(
			(s) => this.checkEstado(s, estado) && this.checkQuery(s, query) && this.checkDate(s, dataMin, dataMax)
		);
		return listaFiltrada;
	}

	public static pesquisarFuncionario(listaCompleta: Funcionario[], query: string) {
		const listaFiltrada = listaCompleta.filter(
			(f) => f.nome.toLowerCase().includes(query.toLowerCase()) || f.email.toLowerCase().includes(query.toLowerCase())
		);
		return listaFiltrada;
	}

	public static pesquisarCategoria(listaCompleta: Categoria[], query: string) {
		const listaFiltrada = listaCompleta.filter((c) => c.descricao.toLowerCase().includes(query.toLowerCase()));
		return listaFiltrada;
	}

	// Funções para usar dentro das pesquisas
	private static checkEstado(s: Solicitacao, estado: string): boolean {
		return estado === 'todos' ? true : s.situacao.toLowerCase() === estado.toLowerCase();
	}

	private static checkQuery(s: Solicitacao, query: string) {
		return (
			s.cliente.nome.toLowerCase().includes(query.toLowerCase()) ||
			s.descricao.toLowerCase().includes(query.toLowerCase())
		);
	}

	private static checkDate(s: Solicitacao, min?: Date, max?: Date) {
		const itemDate = s.dataSolicitacaoAbertura;

		if (max) max.setHours(23, 59, 59, 999);

		console.log('Max: ' + max);
		console.log('Min: ' + min);

		const afterMin = !min || (itemDate as Date) >= min;
		const beforeMax = !max || (itemDate as Date) <= max;

		return afterMin && beforeMax;
	}
}
