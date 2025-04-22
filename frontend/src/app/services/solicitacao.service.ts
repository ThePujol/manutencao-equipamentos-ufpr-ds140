import { Injectable } from '@angular/core';

import { Pessoa } from '../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../shared/models/solicitacao.model';

const LS_CHAVE = 'solicitacoes';

@Injectable({
	providedIn: 'root',
})
export class SolicitacaoService {
	listarSolicitacoes(): Solicitacao[] {
		const solicitacoes = localStorage[LS_CHAVE];
		const parsedSolicitacoes = solicitacoes ? JSON.parse(solicitacoes) : [];

		// Re-converter datas armazenadas no local storage
		if (parsedSolicitacoes) {
			parsedSolicitacoes.forEach((solicitacao: Solicitacao) => {
				solicitacao.dataSolicitacao = new Date(solicitacao.dataSolicitacao);
			});
		}
		return parsedSolicitacoes;
	}

	addSolicitacao(solicitacao: Solicitacao, cliente: Pessoa): void {
		const solicitacoes = this.listarSolicitacoes();

		solicitacao.id = new Date().getTime();
		solicitacao.situacao = Situacao.aberta;
		solicitacao.dataSolicitacao = new Date();
		solicitacao.cliente = cliente;
		solicitacoes.push(solicitacao);
		localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
	}
}
