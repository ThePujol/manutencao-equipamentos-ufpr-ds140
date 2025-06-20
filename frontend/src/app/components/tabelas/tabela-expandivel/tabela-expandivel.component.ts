/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeftOutline } from '@ng-icons/material-icons/outline';

import { TableColumn } from '../../../shared/tabela-interface';
import { TabelaExpandidaComponent } from '../tabela-expandida/tabela-expandida.component';

@Component({
	selector: 'app-tabela-expandivel',
	imports: [DatePipe, NgIcon, TabelaExpandidaComponent],
	viewProviders: [provideIcons({ matChevronLeftOutline })],
	templateUrl: './tabela-expandivel.component.html',
})
export class TabelaExpandivelComponent {
	@Input() columns!: TableColumn[];
	@Input() gridData!: any[];
	@Input() abrirHistorico?: (id: number) => void;
	itemSelecionado!: any;

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
}
