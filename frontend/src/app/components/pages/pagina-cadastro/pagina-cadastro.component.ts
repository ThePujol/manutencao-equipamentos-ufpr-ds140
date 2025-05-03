import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import emailjs from '@emailjs/browser';

import { PessoaService } from '../../../services/pessoa.service';
import { ViaCepService } from '../../../services/via-cep.service';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';

@Component({
	selector: 'app-pagina-cadastro',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputTextComponent, RouterOutlet, RouterLink, MatIcon, ButtonComponent],
	templateUrl: './pagina-cadastro.component.html',
})
export class PaginaCadastroComponent implements OnInit {
	title = 'Cadastro de Usuário';
	submitted = false;
	cepNaoEncontrado = false;
	modal = false;
	cadastroForm!: FormGroup;

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
			numero: ['', Validators.required],
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
			this.pessoaService.addPessoa(dados);
			const templateParams = {
				nome: dados.nome,
				email: dados.email,
				senha: dados.senha,
			};
			emailjs.init({ publicKey: 'wbzDVAF4QthaU0Vci' });
			emailjs.send('service_766bf4u', 'template_764and7', templateParams);
			this.submitted = true;
			this.cadastroForm.reset();
			this.modal = true;
		} else {
			this.cadastroForm.markAllAsTouched();
		}
	}
}
