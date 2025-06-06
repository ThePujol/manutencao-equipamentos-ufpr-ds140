import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService, LoginRequest } from '../../../services/auth.service';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';

@Component({
	selector: 'app-pagina-login',
	standalone: true,
	imports: [RouterLink, ReactiveFormsModule, CommonModule, InputTextComponent, ButtonComponent, RouterOutlet],
	templateUrl: './pagina-login.component.html',
})
export class PaginaLoginComponent {
	loginForm: FormGroup;
	invalidCredentials = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService, // Injete o novo serviço de autenticação
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			// O nome do campo no formulário deve bater com o da interface: 'senha'
			senha: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}

		this.invalidCredentials = false;
		const credentials: LoginRequest = this.loginForm.value;

		this.authService.login(credentials).subscribe({
			next: (response) => {
				console.log('Login bem-sucedido!', response);

				localStorage.setItem('authToken', response.token);
				localStorage.setItem('userData', JSON.stringify(response));

				if (response.role === 'pessoa') {
					this.router.navigate(['/solicitacoes']);
				} else if (response.role === 'funcionario') {
					this.router.navigate(['/solicitacoes-abertas']);
				}
			},
			error: (err) => {
				console.error('Falha no login', err);
				this.invalidCredentials = true;
			},
		});
	}
}
