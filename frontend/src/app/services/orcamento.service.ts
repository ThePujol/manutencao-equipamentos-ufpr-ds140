import { Injectable } from '@angular/core';

import { Solicitacao } from '../shared/models/solicitacao.model';

@Injectable({
	providedIn: 'root',
})
export class OrcamentoService {
	aprovarOrcamentoFn?: (solicitacao: Solicitacao) => void;
	rejeitarOrcamentoFn?: (solicitacao: Solicitacao) => void;

	setFuncoes({ aprovar, rejeitar }: { aprovar: (s: Solicitacao) => void; rejeitar: (s: Solicitacao) => void }) {
		this.aprovarOrcamentoFn = aprovar;
		this.rejeitarOrcamentoFn = rejeitar;
	}
}
