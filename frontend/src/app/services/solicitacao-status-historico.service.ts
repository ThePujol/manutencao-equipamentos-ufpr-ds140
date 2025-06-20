import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SolicitacaoStatusHistorico {
	id: number;
	situacao: string;
	dataHora: string;
	observacao: string;
}

@Injectable({ providedIn: 'root' })
export class SolicitacaoHistoricoService {
	private apiUrl = 'http://localhost:8080/api/solicitacoes';

	constructor(private http: HttpClient) {}

	listarHistorico(solicitacaoId: number): Observable<SolicitacaoStatusHistorico[]> {
		return this.http.get<SolicitacaoStatusHistorico[]>(`${this.apiUrl}/${solicitacaoId}/historico`);
	}
}
