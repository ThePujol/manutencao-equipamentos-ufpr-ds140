import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { SecondaryButtonComponent } from '../buttons/secondary-button/secondary-button.component';

@Component({
	selector: 'app-pagamento-pop-up',
	imports: [SecondaryButtonComponent],
	templateUrl: './pagamento-pop-up.component.html',
})
export class PagamentoPopUpComponent {
	pagMeio = 'Cartão de Crédito';

	constructor(
		private dialogRef: MatDialogRef<PagamentoPopUpComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { solicitacao: Solicitacao },
		private solicitacaoService: SolicitacaoService
	) {}

	close() {
		this.dialogRef.close();
	}

	finalizarPgto() {
		const solicitacao = this.data.solicitacao;
		solicitacao.situacao = Situacao.PAGA;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => {
			console.log(res);
			this.dialogRef.close();
		});
	}

	atualizaPgto(event: Event) {
		const target = event.target as HTMLSelectElement;
		this.pagMeio = target.value;
	}
}
