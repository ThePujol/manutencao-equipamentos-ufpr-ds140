import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowDropDownOutline } from '@ng-icons/material-icons/outline';

import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
	selector: 'app-dropdown',
	imports: [NgIcon],
	viewProviders: [provideIcons({ matArrowDropDownOutline })],
	templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
	@Input() solicitacao!: Solicitacao;
	@Input() dropdownAbertoId: number | null = null;
	@Output() dropdownAbertoIdChange = new EventEmitter<number | null>();
	@Output() efetuarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() redirecionarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() finalizarClicked = new EventEmitter<Solicitacao>();
	@Output() historicoClicked = new EventEmitter<Solicitacao>();
	dropdown = false;

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

	efetuarManutencao(solicitacao: Solicitacao) {
		this.efetuarManutencaoClicked.emit(solicitacao);
	}

	redirecionarManutencao(solicitacao: Solicitacao) {
		this.redirecionarManutencaoClicked.emit(solicitacao);
	}

	finalizarManutencao(solicitacao: Solicitacao) {
		this.finalizarClicked.emit(solicitacao);
	}

	visualizarHistorico(solicitacao: Solicitacao) {
		this.historicoClicked.emit(solicitacao);
	}

	toggleDropdown(event?: MouseEvent) {
		if (event) event.stopPropagation();
		this.dropdown = !this.dropdown;
	}
}
