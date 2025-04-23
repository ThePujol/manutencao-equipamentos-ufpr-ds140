import { Component, Input } from '@angular/core';

import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../button/button.component';

@Component({
	selector: 'app-rejeitada-card',
	imports: [ButtonComponent],
	templateUrl: './rejeitada-card.component.html',
})
export class RejeitadaCardComponent {
	@Input() solicitacao!: Solicitacao;

	constructor(private solicitacaoService: SolicitacaoService) {}

	resgatarServico() {
		this.solicitacao.situacao = Situacao.orcada;
		this.solicitacaoService.atualizarSolicitacao(this.solicitacao);
	}
}
