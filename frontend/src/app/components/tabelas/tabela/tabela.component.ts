import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeftOutline } from '@ng-icons/material-icons/outline';

import { TableColumn } from '../../../shared/tabela-interface';

@Component({
	selector: 'app-tabela',
	imports: [DatePipe, NgIcon],
	viewProviders: [provideIcons({ matChevronLeftOutline })],
	templateUrl: './tabela.component.html',
})
export class TabelaComponent {
	@Input() columns!: TableColumn[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() gridData!: any[];

	@Output() actionButtonClick = new EventEmitter<unknown>();

	onActionButtonClick(item: unknown) {
		this.actionButtonClick.emit(item);
	}

	checkIfDate(obj: unknown) {
		if (obj instanceof Date) {
			return true;
		}

		return false;
	}
}
