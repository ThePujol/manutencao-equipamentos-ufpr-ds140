// src/app/components/teste-pessoa/teste-pessoa.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from '../../shared/models/pessoa.model';

@Component({
	selector: 'app-teste-pessoa',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './teste-pessoa.component.html',
})
export class TestePessoaComponent implements OnInit {
	pessoas: Pessoa[] = [];
	form: FormGroup;

	constructor(
		private http: HttpClient,
		private fb: FormBuilder
	) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			senha: ['', Validators.required],
			nome: ['', Validators.required],
			cpf: ['', Validators.required],
			tel: ['', Validators.required],
			cep: ['', Validators.required],
			estado: ['', Validators.required],
			cidade: ['', Validators.required],
			endereco: ['', Validators.required],
			num: ['', Validators.required],
			complemento: [''],
		});
	}

	ngOnInit() {
		this.loadAll();
	}

	loadAll() {
		this.http.get<Pessoa[]>('/api/pessoas').subscribe((list) => (this.pessoas = list));
	}

	create() {
		if (this.form.invalid) return;
		this.http.post<Pessoa>('/api/pessoas', this.form.value).subscribe(() => {
			this.form.reset();
			this.loadAll();
		});
	}

	update(p: Pessoa) {
		const updated = { ...p, nome: p.nome + ' (edit)' };
		this.http.put<Pessoa>(`/api/pessoas/${p.id}`, updated).subscribe(() => this.loadAll());
	}

	delete(p: Pessoa) {
		this.http.delete<void>(`/api/pessoas/${p.id}`).subscribe(() => this.loadAll());
	}
}
