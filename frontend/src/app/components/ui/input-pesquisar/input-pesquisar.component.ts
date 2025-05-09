import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matSearchOutline } from '@ng-icons/material-icons/outline';

@Component({
	selector: 'app-input-pesquisar',
	imports: [NgIcon],
	viewProviders: [provideIcons({ matSearchOutline })],
	templateUrl: './input-pesquisar.component.html',
})
export class InputPesquisarComponent {}
