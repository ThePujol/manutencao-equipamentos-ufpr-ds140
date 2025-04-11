import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { ViaCepService } from '../../../services/via-cep.service';
import { InputTextComponent } from '../../ui/input-text/input-text.component';

@Component({
	selector: 'app-pagina-cadastro',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, InputTextComponent, RouterOutlet, RouterLink],
	templateUrl: './pagina-cadastro.component.html',
})
export class PaginaCadastroComponent implements OnInit {
	title = 'Cadastro de Usuário';
	submitted = false;
	cepNaoEncontrado = false;
	cadastroForm!: FormGroup;

	constructor(
		private fBuilder: FormBuilder,
		private router: Router,
		private viaCepService: ViaCepService
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

	onSubmit() {
		if (this.cadastroForm.valid) {
			console.log(this.cadastroForm.value);
			this.submitted = true;
			this.cadastroForm.reset();

			this.router.navigate(['/login']);
		} else {
			this.cadastroForm.markAllAsTouched();
		}
	}
}
