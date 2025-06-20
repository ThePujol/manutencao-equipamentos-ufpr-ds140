import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matSearchOutline } from '@ng-icons/material-icons/outline';

@Component({
	selector: 'app-input-pesquisar',
	imports: [NgIcon, ReactiveFormsModule],
	viewProviders: [provideIcons({ matSearchOutline })],
	templateUrl: './input-pesquisar.component.html',
})
export class InputPesquisarComponent {
	@Input() placeholder!: string;
	@Output() pesquisarClick = new EventEmitter<string>();
	pesquisarForm: FormGroup;
	searchValue!: string;

	constructor(private fb: FormBuilder) {
		this.pesquisarForm = fb.group({
			query: [''],
		});
	}

	onSubmit() {
		this.pesquisarClick.emit(this.pesquisarForm.value.query);
	}
}
