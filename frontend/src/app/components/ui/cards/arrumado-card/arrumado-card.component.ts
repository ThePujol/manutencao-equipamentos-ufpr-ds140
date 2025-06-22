import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { Solicitacao } from '../../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../../buttons/button/button.component';
import { PagamentoPopUpComponent } from '../../pagamento-pop-up/pagamento-pop-up.component';

@Component({
	selector: 'app-arrumado-card',
	imports: [ButtonComponent],
	templateUrl: './arrumado-card.component.html',
})
export class ArrumadoCardComponent {
	@Input() solicitacao!: Solicitacao;

	constructor(
		private dialog: MatDialog,
		private solicitacaoService: SolicitacaoService
	) {}

	realizarPagamento() {
		this.dialog.open(PagamentoPopUpComponent, {
			data: {
				solicitacao: this.solicitacao,
			},
		});
	}
}
