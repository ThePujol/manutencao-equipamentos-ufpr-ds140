import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../button/button.component';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';

@Component({
	selector: 'app-orcada-card',
	imports: [ButtonComponent, SecondaryButtonComponent, CurrencyPipe],
	templateUrl: './orcada-card.component.html',
})
export class OrcadaCardComponent {
	@Input() precoOrcamento!: number;
	@Input() solicitacao!: Solicitacao;

	constructor(private solicitacaoService: SolicitacaoService) {}

	aprovarOrcamento(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.aprovada;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
	}

	rejeitarOrcamento(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.rejeitada;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
	}
}
