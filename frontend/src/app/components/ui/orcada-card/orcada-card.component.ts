import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { OrcamentoService } from '../../../services/orcamento.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../buttons/button/button.component';
import { SecondaryButtonComponent } from '../buttons/secondary-button/secondary-button.component';

@Component({
	selector: 'app-orcada-card',
	imports: [ButtonComponent, SecondaryButtonComponent, CurrencyPipe],
	templateUrl: './orcada-card.component.html',
})
export class OrcadaCardComponent {
	@Input() precoOrcamento!: number;
	@Input() solicitacao!: Solicitacao;

	constructor(private orcamentoActions: OrcamentoService) {}

	aprovarOrcamento() {
		this.orcamentoActions.aprovarOrcamentoFn?.(this.solicitacao);
	}

	rejeitarOrcamento() {
		this.orcamentoActions.rejeitarOrcamentoFn?.(this.solicitacao);
	}
}
