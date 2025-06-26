import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SolicitacaoStatusHistorico {
	id: number;
	situacao: string;
	dataHora: string;
	observacao: string;
	funcionarioResponsavel?: {
		id: number;
		nome: string;
	};
	funcionarioRedirecionado?: {
		id: number;
		nome: string;
	};

	motivoRejeicao?: string;
	orientacoes?: string;
	descricaoManutencao?: string;
	orcamento?: number;
}

@Injectable({ providedIn: 'root' })
export class SolicitacaoHistoricoService {
	private apiUrl = 'http://localhost:8080/api/solicitacoes';

	constructor(private http: HttpClient) {}

	listarHistorico(solicitacaoId: number): Observable<SolicitacaoStatusHistorico[]> {
		console.log('Serviço: Fazendo chamada para histórico da solicitação:', solicitacaoId);
		const url = `${this.apiUrl}/${solicitacaoId}/historico`;
		console.log('Serviço: URL da requisição:', url);

		return this.http.get<SolicitacaoStatusHistorico[]>(url).pipe(
			map((historico: SolicitacaoStatusHistorico[]) => {
				console.log('Serviço: Resposta recebida do backend:', historico);

				historico.forEach((h: SolicitacaoStatusHistorico, index: number) => {
					if (h.situacao === 'REDIRECIONADA') {
						console.log(`Redirecionamento ${index}:`, {
							observacao: h.observacao,
							funcionarioResponsavel: h.funcionarioResponsavel,
							funcionarioRedirecionado: h.funcionarioRedirecionado,
						});
					}
				});

				return historico;
			})
		);
	}
}
