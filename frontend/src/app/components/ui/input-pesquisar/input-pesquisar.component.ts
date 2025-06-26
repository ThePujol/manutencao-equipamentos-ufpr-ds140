import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-input-pesquisar',
	imports: [ReactiveFormsModule],
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
