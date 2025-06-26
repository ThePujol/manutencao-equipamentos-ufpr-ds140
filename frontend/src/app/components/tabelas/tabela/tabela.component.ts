/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';

import { Categoria } from '../../../shared/models/categoria.model';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../shared/tabela-interface';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../ui/buttons/secondary-button/secondary-button.component';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { SituacaoTagComponent } from '../../ui/situacao-tag/situacao-tag.component';

@Component({
	selector: 'app-tabela',
	imports: [
		CommonModule,
		DatePipe,
		SituacaoTagComponent,
		DropdownComponent,
		NgIcon,
		ButtonComponent,
		SecondaryButtonComponent,
	],
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
	dropdownAbertoId: number | null = null;
	modalExcluir = false;
	categoriaSelecionada!: Categoria;
	itemSelecionado!: any;

	@Output() efetuarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() redirecionarManutencaoClicked = new EventEmitter<Solicitacao>();
	@Output() finalizarClicked = new EventEmitter<Solicitacao>();
	@Output() verHistoricoClicked = new EventEmitter<Solicitacao>();
	@Output() orcamentoClicked = new EventEmitter<Solicitacao>();
	@Output() editarClicked = new EventEmitter<any>();
	@Output() excluirClicked = new EventEmitter<any>();

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

	verHistorico(solicitacao: Solicitacao) {
		this.verHistoricoClicked.emit(solicitacao);
	}

	emitirOrcamento(solicitacao: Solicitacao) {
		this.orcamentoClicked.emit(solicitacao);
	}

	editar(item: any) {
		this.editarClicked.emit(item);
	}

	excluir(item: any) {
		this.excluirClicked.emit(item);
		this.modalExcluir = false;
	}

	checkIfDate(obj: unknown) {
		return obj instanceof Date;
	}

	checkIfCliente(obj: unknown) {
		return obj instanceof Pessoa;
	}

	setDropdownAberto(id: number | null) {
		this.dropdownAbertoId = id;
	}

	abrirModalExcluir(item: any) {
		this.modalExcluir = true;
		this.itemSelecionado = item;
	}

	fecharModal() {
		this.modalExcluir = false;
		this.itemSelecionado = null;
	}
}
