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
	situacoes = {
		aberta: Situacao.aberta,
		orcada: Situacao.orcada,
		rejeitada: Situacao.rejeitada,
		aprovada: Situacao.aprovada,
		redirecionada: Situacao.redirecionada,
		arrumada: Situacao.arrumada,
		paga: Situacao.paga,
		finalizada: Situacao.finalizada,
	};

	@Output() efetuarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() redirecionarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() finalizarClicked = new EventEmitter<Solicitacao>();
	dropdown = false;

	efetuarManutencao(solicitacao: Solicitacao) {
		this.efetuarManutencaoClicked.emit(solicitacao);
	}

	redirecionarManutencao(solicitacao: Solicitacao) {
		this.redirecionarManutencaoClicked.emit(solicitacao);
	}

	finalizarManutencao(solicitacao: Solicitacao) {
		this.finalizarClicked.emit(solicitacao);
	}

	toggleDropdown() {
		this.dropdown = !this.dropdown;
	}
}
