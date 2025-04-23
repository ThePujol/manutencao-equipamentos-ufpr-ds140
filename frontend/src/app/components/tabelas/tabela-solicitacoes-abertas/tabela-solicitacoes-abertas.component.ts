import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
	selector: 'app-tabela-solicitacoes-abertas',
	imports: [DatePipe],
	templateUrl: './tabela-solicitacoes-abertas.component.html',
})
export class TabelaSolicitacoesAbertasComponent {
	@Input() solicitacao!: Solicitacao;
	@Input() ultima = false;
	@Input() header = false;
	@Output() orcamentoClicked = new EventEmitter<Solicitacao>();

	emitirOrcamento() {
		this.orcamentoClicked.emit(this.solicitacao);
	}
}
