import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronRightOutline } from '@ng-icons/material-icons/outline';

import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { AbertaCardComponent } from '../../ui/aberta-card/aberta-card.component';
import { AprovadaCardComponent } from '../../ui/aprovada-card/aprovada-card.component';
import { ArrumadoCardComponent } from '../../ui/arrumado-card/arrumado-card.component';
import { SecondaryButtonComponent } from '../../ui/buttons/secondary-button/secondary-button.component';
import { OrcadaCardComponent } from '../../ui/orcada-card/orcada-card.component';
import { RejeitadaCardComponent } from '../../ui/rejeitada-card/rejeitada-card.component';
import { TableLabelComponent } from '../../ui/table-label/table-label.component';

@Component({
	selector: 'app-tabela-expandida',
	imports: [
		TableLabelComponent,
		ArrumadoCardComponent,
		OrcadaCardComponent,
		AbertaCardComponent,
		AprovadaCardComponent,
		RejeitadaCardComponent,
		DatePipe,
		NgIcon,
		SecondaryButtonComponent,
	],
	viewProviders: [provideIcons({ matChevronRightOutline })],
	templateUrl: './tabela-expandida.component.html',
})
export class TabelaExpandidaComponent {
	@Input() solicitacao!: Solicitacao;
	@Input() ultima = false;

	@Output() toggleExpansionEvent = new EventEmitter<void>();
	@Output() abrirHistorico = new EventEmitter<number>();

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

	toggleExpansion() {
		this.toggleExpansionEvent.emit();
	}
}
