/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';

import { Pessoa } from '../../../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../shared/tabela-interface';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { SituacaoTagComponent } from '../../ui/situacao-tag/situacao-tag.component';

@Component({
	selector: 'app-tabela',
	imports: [DatePipe, SituacaoTagComponent, DropdownComponent, NgIcon],
	viewProviders: [provideIcons({ matDeleteOutline, matEditOutline })],
	templateUrl: './tabela.component.html',
})
export class TabelaComponent {
	@Input() columns!: TableColumn[];
	@Input() gridData!: any[];
	@Input() mostrarHora = false;
	@Input() tabelaFuncionario = false;
	@Input() tabelaSolicitacoesAbertas = false;
	@Input() excluirDisabledCondition = false;

	dropdown = false;

	@Output() efetuarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() redirecionarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() finalizarClicked = new EventEmitter<Solicitacao>();
	@Output() orcamentoClicked = new EventEmitter<Solicitacao>();
	@Output() editarClicked = new EventEmitter<any>();
	@Output() excluirClicked = new EventEmitter<any>();

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

	toggleDropdown() {
		this.dropdown = !this.dropdown;
		console.log(this.dropdown);
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

	emitirOrcamento(solicitacao: Solicitacao) {
		this.orcamentoClicked.emit(solicitacao);
	}

	editar(item: any) {
		this.editarClicked.emit(item);
	}

	excluir(item: any) {
		this.excluirClicked.emit(item);
	}

	checkIfDate(obj: unknown) {
		return obj instanceof Date;
	}

	checkIfCliente(obj: unknown) {
		return obj instanceof Pessoa;
	}
}
