import { Component, Input } from '@angular/core';

import { Situacao } from '../../../shared/models/solicitacao.model';

@Component({
	selector: 'app-situacao-tag',
	imports: [],
	templateUrl: './situacao-tag.component.html',
})
export class SituacaoTagComponent {
	@Input() situacao!: Situacao;
	situacoes = {
		aberta: Situacao.aberta,
		orcada: Situacao.orcada,
		rejeitada: Situacao.rejeitada,
		aprovada: Situacao.aprovada,
		redirecionada: Situacao.redirecionada,
		arrumada: Situacao.arrumada,
		paga: Situacao.paga,
		finalizada: Situacao.finalizada,
	};
}
