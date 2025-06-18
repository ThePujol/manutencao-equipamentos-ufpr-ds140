import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Situacao, Solicitacao } from '../shared/models/solicitacao.model';
import { SolicitacaoService } from './solicitacao.service';

export interface ReceitaPorDia {
	data: Date;
	total: number;
}

export interface ReceitaPorCategoria {
	categoria: string;
	total: number;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
	constructor(private solicitacaoService: SolicitacaoService) {}

	getReceitaPorDia(dataInicio?: Date, dataFim?: Date): Observable<ReceitaPorDia[]> {
		/* O codigo de antes nao funcionava em um contexto assincrono, entao eu alterei. Faz a mesma coisa, mas funciona com o padrao Observable */
		return this.solicitacaoService.listarSolicitacoes().pipe(
			map((solicitacoes) => {
				const solicitacoesPagas = solicitacoes.filter((s) => s.situacao === Situacao.paga);

				const solicitacoesFiltradas = solicitacoesPagas.filter((s) => {
					const dataDaSolicitacao = s.dataFinalizacao ? new Date(s.dataFinalizacao) : new Date(s.dataSolicitacao);

					const aposInicio = !dataInicio || dataDaSolicitacao >= dataInicio;
					const antesFim = !dataFim || dataDaSolicitacao <= dataFim;

					return aposInicio && antesFim;
				});

				const mapa = new Map<string, number>();
				solicitacoesFiltradas.forEach((s) => {
					const dataDaSolicitacao = s.dataFinalizacao ? new Date(s.dataFinalizacao) : new Date(s.dataSolicitacao);
					// A chave do mapa será a data no formato 'YYYY-MM-DD' para garantir o agrupamento correto
					const key = dataDaSolicitacao.toISOString().substring(0, 10);
					mapa.set(key, (mapa.get(key) || 0) + (s.orcamento ?? 0));
				});

				const resultadoFinal = Array.from(mapa.entries())
					.map(([key, total]) => ({ data: new Date(key), total }))
					.sort((a, b) => a.data.getTime() - b.data.getTime());

				return resultadoFinal;
			})
		);
	}

	getReceitaPorCategoria(): Observable<ReceitaPorCategoria[]> {
		/* Mesma coisa pra esse codigo. */
		return this.solicitacaoService.listarSolicitacoes().pipe(
			map((solicitacoes: Solicitacao[]) => {
				const solicitacoesPagas = solicitacoes.filter((s) => s.situacao === Situacao.paga);

				const mapa = new Map<string, number>();
				solicitacoesPagas.forEach((s) => {
					const nomeCategoria = s.categoria.descricao;
					const orcamento = s.orcamento ?? 0;
					mapa.set(nomeCategoria, (mapa.get(nomeCategoria) || 0) + orcamento);
				});

				const resultadoFinal = Array.from(mapa.entries())
					.map(([categoria, total]) => ({ categoria, total }))
					.sort((a, b) => a.categoria.localeCompare(b.categoria));

				return resultadoFinal;
			})
		);
	}
}
