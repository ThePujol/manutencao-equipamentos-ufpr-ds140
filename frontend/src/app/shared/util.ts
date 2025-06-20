import { Categoria } from './models/categoria.model';
import { Funcionario } from './models/funcionario.model';
import { Solicitacao } from './models/solicitacao.model';

export class Util {
	public static tokenExpired(token: string): boolean {
		const expiry = JSON.parse(atob(token.split('.')[1])).exp;
		return Math.floor(new Date().getTime() / 1000) >= expiry;
	}

	public static pesquisarSolicitacao(listaCompleta: Solicitacao[], query: string) {
		const listaFiltrada = listaCompleta.filter(
			(s) => s.cliente.nome.toLowerCase().includes(query) || s.descricao.toLowerCase().includes(query)
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
}
