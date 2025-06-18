import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matSearchOutline } from '@ng-icons/material-icons/outline';

@Component({
	selector: 'app-input-pesquisar',
	imports: [NgIcon, FormsModule],
	viewProviders: [provideIcons({ matSearchOutline })],
	templateUrl: './input-pesquisar.component.html',
})
export class InputPesquisarComponent {
	@Input() placeholder!: string;
	@Output() pesquisarClick = new EventEmitter<string>();
	searchValue!: string;
}
