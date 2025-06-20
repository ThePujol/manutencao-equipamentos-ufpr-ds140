import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCheckCircleOutline, matHandymanOutline, matSecurityOutline } from '@ng-icons/material-icons/outline';

import { PessoaService } from '../../../services/pessoa.service';
import { ViaCepService } from '../../../services/via-cep.service';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';

@Component({
	selector: 'app-pagina-cadastro',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputTextComponent, RouterOutlet, RouterLink, ButtonComponent, NgIcon],
	viewProviders: [provideIcons({ matCheckCircleOutline, matHandymanOutline, matSecurityOutline })],
	templateUrl: './pagina-cadastro.component.html',
})
export class PaginaCadastroComponent implements OnInit {
	title = 'Cadastro de Usuário';
	submitted = false;
	cepNaoEncontrado = false;
	modal = false;
	cadastroForm!: FormGroup;
	emailJaExiste = false;
	cpfJaExiste = false;

	constructor(
		private fBuilder: FormBuilder,
		private router: Router,
		private viaCepService: ViaCepService,
		private pessoaService: PessoaService
	) {
		this.cadastroForm = this.fBuilder.group({
			nome: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			cpf: ['', Validators.required],
			tel: ['', Validators.required],
			estado: ['', Validators.required],
			cidade: ['', Validators.required],
			cep: ['', Validators.required],
			endereco: ['', Validators.required],
			num: ['', Validators.required],
			complemento: [''],
		});
	}

	ngOnInit(): void {
		this.cadastroForm.get('cep')?.valueChanges.subscribe((cep: string | null) => {
			this.cepNaoEncontrado = false;

			if (!cep) return;

			const cleanedCep = cep.replace(/\D/g, '');

			if (cleanedCep.length === 8) {
				this.viaCepService.buscar(cleanedCep).subscribe({
					next: (data) => {
						if (!data.erro) {
							this.cadastroForm.patchValue({
								endereco: data.logradouro,
								cidade: data.localidade,
								estado: data.uf,
								complemento: data.complemento,
							});
							this.cadastroForm.get('cep')?.setErrors(null);
						} else {
							this.cepNaoEncontrado = true;
							this.cadastroForm.get('cep')?.setErrors({ cepInvalido: true });
						}
					},
					error: () => {
						this.cepNaoEncontrado = true;
						this.cadastroForm.get('cep')?.setErrors({ cepInvalido: true });
					},
				});
			}
		});
	}

	continuar() {
		this.router.navigate(['/login']);
		this.modal = false;
	}

	onSubmit() {
		if (this.cadastroForm.valid) {
			const dados = this.cadastroForm.value;
			this.pessoaService.addPessoa(dados).subscribe({
				next: () => {
					this.submitted = true;
					this.cadastroForm.reset();
					this.modal = true;
					this.emailJaExiste = false;
				},
				error: (err) => {
					if (err.status === 400) {
						const msg = err.error.toLowerCase();
						if (msg.includes('email')) {
							this.emailJaExiste = true;
							this.cadastroForm.get('email')?.setErrors({ jaExiste: true });
						}
						if (msg.includes('cpf')) {
							this.cpfJaExiste = true;
							this.cadastroForm.get('cpf')?.setErrors({ jaExiste: true });
						}

						console.error(err.error);
					} else {
						console.error('Erro inesperado');
					}
				},
			});
		} else {
			this.cadastroForm.markAllAsTouched();
		}
	}
}
