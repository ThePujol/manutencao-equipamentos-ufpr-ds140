import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	matArrowDropDownOutline,
	matChevronLeftOutline,
	matDeleteOutline,
	matEditOutline,
} from '@ng-icons/material-icons/outline';

import { Pessoa } from '../../../shared/models/pessoa.model';
import { Situacao } from '../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../shared/tabela-interface';
import { SituacaoTagComponent } from '../../ui/situacao-tag/situacao-tag.component';

@Component({
	selector: 'app-tabela',
	imports: [DatePipe, NgIcon, SituacaoTagComponent],
	viewProviders: [provideIcons({ matChevronLeftOutline, matArrowDropDownOutline, matDeleteOutline, matEditOutline })],
	templateUrl: './tabela.component.html',
})
export class TabelaComponent {
	@Input() columns!: TableColumn[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() gridData!: any[];
	@Input() mostrarHora = false;

	dropdown = false;

	@Output() editarClick = new EventEmitter<unknown>();
	@Output() excluirClick = new EventEmitter<unknown>();

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

	onEditarClick(item: unknown) {
		console.log('Bunda');
		this.editarClick.emit(item);
	}

	onExcluirClick(item: unknown) {
		this.excluirClick.emit(item);
	}

	checkIfDate(obj: unknown) {
		return obj instanceof Date;
	}

	checkIfCliente(obj: unknown) {
		return obj instanceof Pessoa;
	}
}
