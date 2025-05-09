import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowDropDownOutline } from '@ng-icons/material-icons/outline';

import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
	selector: 'app-tabela-solicitacoes-funcionario',
	imports: [DatePipe, NgIcon],
	viewProviders: [provideIcons({ matArrowDropDownOutline })],
	templateUrl: './tabela-solicitacoes-funcionario.component.html',
})
export class TabelaSolicitacoesFuncionarioComponent {
	@Input() header = false;
	@Input() ultima = false;
	@Input() solicitacao!: Solicitacao;
	@Output() efetuarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() redirecionarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() finalizarClicked = new EventEmitter<Solicitacao>();
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
