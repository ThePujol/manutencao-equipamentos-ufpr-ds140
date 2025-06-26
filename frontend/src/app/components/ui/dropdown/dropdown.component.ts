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

	@Output() efetuarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() redirecionarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() finalizarClicked = new EventEmitter<Solicitacao>();

	get dropdown(): boolean {
		return this.dropdownAbertoId === this.solicitacao.id;
	}

	abrirDropdown(event: Event) {
		event.stopPropagation();
		if (this.dropdown) {
			this.dropdownAbertoIdChange.emit(null);
		} else {
			this.dropdownAbertoIdChange.emit(this.solicitacao.id);
		}
	}

	efetuarManutencao(solicitacao: Solicitacao) {
		this.efetuarManutencaoClicked.emit(solicitacao);
	}

	redirecionarManutencao(solicitacao: Solicitacao) {
		this.redirecionarManutencaoClicked.emit(solicitacao);
	}

	finalizarManutencao(solicitacao: Solicitacao) {
		this.finalizarClicked.emit(solicitacao);
	}
}
