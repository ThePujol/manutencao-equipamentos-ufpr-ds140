import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Solicitacao } from '../shared/models/solicitacao.model';

@Injectable({
	providedIn: 'root',
})
export class SolicitacaoService {
	constructor(private http: HttpClient) {}

	apiUrl = 'http://localhost:8080/api/solicitacoes';

	listarSolicitacoes(): Observable<Solicitacao[]> {
		return this.http.get<Solicitacao[]>(this.apiUrl).pipe(
			map((solicitacoes) =>
				solicitacoes.map((s) => ({
					...s,
					dataSolicitacao: new Date(s.dataSolicitacao),
					dataOrcamento: s.dataOrcamento ? new Date(s.dataOrcamento) : undefined,
					dataManutencao: s.dataManutencao ? new Date(s.dataManutencao) : undefined,
					dataFinalizacao: s.dataFinalizacao ? new Date(s.dataFinalizacao) : undefined,
				}))
			)
		);
	}

	addSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao> {
		return this.http.post<Solicitacao>(this.apiUrl, solicitacao);
	}

	atualizarSolicitacao(solicitacao: Solicitacao): Observable<Solicitacao> {
		return this.http.put<Solicitacao>(`${this.apiUrl}/${solicitacao.id}`, solicitacao);
	}

	removerSolicitacao(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
