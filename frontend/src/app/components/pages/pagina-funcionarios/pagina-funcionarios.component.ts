import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: 'app-pagina-funcionarios',
	imports: [CommonModule, SidebarClienteComponent, ReactiveFormsModule, InputTextComponent],
	templateUrl: './pagina-funcionarios.component.html',
})
export class PaginaFuncionariosComponent implements OnInit {
	funcionarios: Funcionario[] = [];
	funcionarioSelecionado?: Funcionario;
	modal = false;
	formfuncionario!: FormGroup;

	constructor(
		private funcionarioService: FuncionarioService,
		private fBuilder: FormBuilder
	) {
		this.formfuncionario = this.fBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			nome: ['', Validators.required],
			senha: ['', Validators.required],
			dataNasc: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.listarfuncionarios();
	}

	abrirModal(funcionario?: Funcionario) {
		this.modal = true;
		if (funcionario) {
			this.funcionarioSelecionado = funcionario;
			this.formfuncionario.patchValue(funcionario);
		} else {
			this.funcionarioSelecionado = undefined;
			this.formfuncionario.reset();
		}
	}

	fecharModal() {
		this.modal = false;
	}

	removerfuncionario(id: number) {
		this.funcionarioService.removerFuncionario(id).subscribe(() => {
			this.listarfuncionarios();
		});
	}

	salvarOuEditarfuncionario() {
		if (this.formfuncionario.invalid) {
			this.formfuncionario.markAllAsTouched();
			return;
		}

		const dados = this.formfuncionario.value;

		if (this.funcionarioSelecionado) {
			const funcionarioEditado = { ...this.funcionarioSelecionado, ...dados };
			this.funcionarioService.atualizarFuncionario(funcionarioEditado).subscribe(() => {
				this.listarfuncionarios();
				this.fecharModal();
			});
		} else {
			this.funcionarioService.addFuncionario(dados).subscribe(() => {
				this.listarfuncionarios();
				this.fecharModal();
			});
		}
	}

	listarfuncionarios() {
		this.funcionarioService.listarTodosFuncionarios().subscribe((funcionarios) => {
			this.funcionarios = funcionarios;
		});
	}
}
