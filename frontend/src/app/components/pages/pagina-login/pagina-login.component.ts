// src/app/components/pages/pagina-login/pagina-login.component.ts

import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { forkJoin } from 'rxjs';

import { PessoaService } from '../../../services/pessoa.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { LoggedUserService } from '../../../services/logged-user.service';

import { Pessoa } from '../../../shared/models/pessoa.model';
import { Funcionario } from '../../../shared/models/funcionario.model';

import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { ButtonComponent } from '../../ui/buttons/button/button.component';

@Component({
	selector: 'app-pagina-login',
	standalone: true,
	imports: [CommonModule, NgIf, ReactiveFormsModule, RouterOutlet, RouterLink, InputTextComponent, ButtonComponent],
	templateUrl: './pagina-login.component.html',
})
export class PaginaLoginComponent {
	loginForm: FormGroup;
	invalidCredentials = false;

	constructor(
		private fb: FormBuilder,
		private pessoaService: PessoaService,
		private funcionarioService: FuncionarioService,
		private loggedUserService: LoggedUserService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	onSubmit(): void {
		if (this.loginForm.invalid) {
			this.invalidCredentials = true;
			return;
		}
		const { email, password } = this.loginForm.value;

		forkJoin({
			clientes: this.pessoaService.listarTodosPessoas(),
			funcionarios: this.funcionarioService.listarTodosFuncionarios(),
		}).subscribe(
			({ clientes, funcionarios }) => {
				const pessoa = clientes.find((p) => p.email === email && p.senha === password);
				const funcionario = funcionarios.find((f) => f.email === email && f.senha === password);

				const valid = !!pessoa || !!funcionario;
				this.invalidCredentials = !valid;

				if (valid) {
					const id = pessoa ? pessoa.id : (funcionario as Funcionario).id;
					this.loggedUserService.setLoggedUser(id);
					this.router.navigate([pessoa ? '/solicitacoes' : '/solicitacoes-abertas']);
				}
			},
			(err) => {
				console.error('Erro no login:', err);
				this.invalidCredentials = true;
			}
		);
	}
}
