import { Component, Input } from '@angular/core';

import { OrcamentoService } from '../../../services/orcamento.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
	selector: 'app-rejeitada-card',
	imports: [ButtonComponent],
	templateUrl: './rejeitada-card.component.html',
})
export class RejeitadaCardComponent {
	@Input() solicitacao!: Solicitacao;

	constructor(
		private solicitacaoService: SolicitacaoService,
		private orcamentoActions: OrcamentoService
	) {}

	resgatarServico() {
		this.solicitacao.situacao = Situacao.ORÇADA;
		this.solicitacao.motivoRejeicao = undefined;
		this.orcamentoActions.resgatarServicoFn?.(this.solicitacao);
	}
}
