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
		aberta: Situacao.ABERTA,
		orcada: Situacao.ORÇADA,
		rejeitada: Situacao.REJEITADA,
		aprovada: Situacao.APROVADA,
		redirecionada: Situacao.REDIRECIONADA,
		arrumada: Situacao.ARRUMADA,
		paga: Situacao.PAGA,
		finalizada: Situacao.FINALIZADA,
	};
}
