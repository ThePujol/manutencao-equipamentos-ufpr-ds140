import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { OrcamentoService } from '../../../services/orcamento.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../button/button.component';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';

@Component({
	selector: 'app-orcada-card',
	imports: [ButtonComponent, SecondaryButtonComponent, CurrencyPipe, MensagemComponent],
	templateUrl: './orcada-card.component.html',
})
export class OrcadaCardComponent {
	@Input() precoOrcamento!: number;
	@Input() solicitacao!: Solicitacao;
	showMessage = false;

	constructor(private orcamentoActions: OrcamentoService) {}

	aprovarOrcamento() {
		this.orcamentoActions.aprovarOrcamentoFn?.(this.solicitacao);
	}

	rejeitarOrcamento() {
		this.orcamentoActions.rejeitarOrcamentoFn?.(this.solicitacao);
	}
}
