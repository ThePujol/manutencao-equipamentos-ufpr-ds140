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
			(f) => f.nome.toLowerCase().includes(query) || f.email.toLowerCase().includes(query)
		);
		return listaFiltrada;
	}

	public static pesquisarCategoria(listaCompleta: Categoria[], query: string) {
		const listaFiltrada = listaCompleta.filter((c) => c.descricao.toLowerCase().includes(query));
		return listaFiltrada;
	}

	// Funções para usar dentro das pesquisas
	private static checkEstado(s: Solicitacao, estado: string): boolean {
		return estado === 'todos' ? true : s.situacao.toLowerCase() === estado.toLowerCase();
	}

	private static checkQuery(s: Solicitacao, query: string) {
		return s.cliente.nome.toLowerCase().includes(query) || s.descricao.toLowerCase().includes(query);
	}

	private static checkDate(s: Solicitacao, min?: Date, max?: Date) {
		const itemDate = s.dataSolicitacao;
		console.log(itemDate);
		console.log(`minimo: ${min}`);
		console.log(`maximo: ${max}`);

		const afterMin = !min || itemDate >= min;
		const beforeMax = !max || itemDate <= max;

		return afterMin && beforeMax;
	}
}
