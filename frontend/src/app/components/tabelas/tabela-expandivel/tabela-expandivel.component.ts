/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeftOutline } from '@ng-icons/material-icons/outline';

import { Situacao } from '../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../shared/tabela-interface';
import { SituacaoTagComponent } from '../../ui/situacao-tag/situacao-tag.component';
import { TabelaExpandidaComponent } from '../tabela-expandida/tabela-expandida.component';

@Component({
	selector: 'app-tabela-expandivel',
	imports: [DatePipe, NgIcon, TabelaExpandidaComponent, SituacaoTagComponent],
	viewProviders: [provideIcons({ matChevronLeftOutline })],
	templateUrl: './tabela-expandivel.component.html',
})
export class TabelaExpandivelComponent {
	@Input() columns!: TableColumn[];
	@Input() gridData!: any[];

	itemSelecionado!: any;

	@Output() abrirHistorico = new EventEmitter<number>();

	toggleExpansao(item: any) {
		if (item === this.itemSelecionado) {
			this.itemSelecionado = undefined;
			return;
		}

		this.itemSelecionado = item;
	}

	checkIfDate(obj: unknown) {
		if (obj instanceof Date && !isNaN(obj.getTime())) {
			return true;
		}
		return false;
	}
	aberta: Situacao = Situacao.ABERTA;
	orcada: Situacao = Situacao.ORÇADA;
	rejeitada: Situacao = Situacao.REJEITADA;
	redirecionada: Situacao = Situacao.REDIRECIONADA;
	aprovada: Situacao = Situacao.APROVADA;
	arrumada: Situacao = Situacao.ARRUMADA;
	paga: Situacao = Situacao.PAGA;
	finalizada: Situacao = Situacao.FINALIZADA;
}
