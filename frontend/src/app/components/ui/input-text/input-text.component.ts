import { NgxMaskDirective } from 'ngx-mask';

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-input-text',
	imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
	templateUrl: './input-text.component.html',
})
export class InputTextComponent implements OnInit {
	@Input() label = '';
	@Input() type = 'text';
	@Input() placeholder = '';
	@Input() controlName = '';
	@Input() required = false;
	@Input() mask = '';
	formControl!: FormControl;

	constructor(private formGroupDirective: FormGroupDirective) {}

	ngOnInit() {
		this.formControl = this.formGroupDirective.form.get(this.controlName) as FormControl;
	}

	getErr(): string {
		if (!this.formControl) return '';
		if (this.formControl.hasError('required')) return 'Campo obrigatório';
		if (this.formControl.hasError('email')) return 'E-mail inválido';
		if (this.formControl.hasError('minlength'))
			return `Mínimo de ${this.formControl.getError('minlength').requiredLength} caracteres.`;
		if (this.formControl.hasError('maxlength'))
			return `Máximo de ${this.formControl.getError('maxlength').requiredLength} caracteres.`;
		if (this.formControl.hasError('pattern')) return 'Formato inválido';
		return '';
	}
}
