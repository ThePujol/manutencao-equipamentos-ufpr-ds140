import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { FuncionarioService } from '../../../services/funcionario.service';
import { LoggedUserService } from '../../../services/logged-user.service';
import { PessoaService } from '../../../services/pessoa.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';

@Component({
	selector: 'app-pagina-login',
	standalone: true,
	imports: [RouterOutlet, RouterLink, ReactiveFormsModule, CommonModule, InputTextComponent, ButtonComponent],
	templateUrl: './pagina-login.component.html',
})
export class PaginaLoginComponent {
	loginForm: FormGroup;
	invalidCredentials = false;

	constructor(
		private fb: FormBuilder,
		private loggedUserService: LoggedUserService,
		private router: Router,
		private pessoaService: PessoaService,
		private funcionarioService: FuncionarioService
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		const email = this.loginForm.value.email;
		const listaClientes = this.pessoaService.listarTodosPessoas();
		const listaFuncionarios = this.funcionarioService.listarTodosFuncionarios();
		const pessoa = listaClientes.find((pessoa) => pessoa.email === email);
		const funcionario = listaFuncionarios.find((funcionario) => funcionario.email === email);
		if (
			(!pessoa || pessoa.senha != this.loginForm.value.password) &&
			(!funcionario || funcionario.senha != this.loginForm.value.password)
		) {
			this.invalidCredentials = true;
		} else {
			this.invalidCredentials = false;
		}

		if (this.loginForm.valid && !this.invalidCredentials) {
			this.invalidCredentials = false;
			if (pessoa) {
				this.loggedUserService.setLoggedUser(pessoa.id);
				this.router.navigate(['/solicitacoes']);
			} else if (funcionario) {
				this.loggedUserService.setLoggedUser(funcionario.id);
				// Mudar para a pagina de solicitacoes em aberto dps
				this.router.navigate(['/funcionarios']);
			}
		}
	}
}
