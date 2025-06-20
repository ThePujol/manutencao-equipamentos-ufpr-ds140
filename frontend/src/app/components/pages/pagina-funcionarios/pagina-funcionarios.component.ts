import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-funcionarios',
	imports: [
		CommonModule,
		SidebarFuncionarioComponent,
		ReactiveFormsModule,
		InputTextComponent,
		SidebarFuncionarioComponent,
	],
	templateUrl: './pagina-funcionarios.component.html',
})
export class PaginaFuncionariosComponent implements OnInit {
	funcionarios: Funcionario[] = [];
	funcionarioSelecionado?: Funcionario;
	modal = false;
	formfuncionario!: FormGroup;
	mensagem = '';
	mensagemErro = '';
	carregando = false;

	constructor(
		private funcionarioService: FuncionarioService,
		private fBuilder: FormBuilder
	) {
		this.formfuncionario = this.fBuilder.group({
			nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
			email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
			senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
			dataNasc: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.funcionarios = this.listarfuncionarios();
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
		if (confirm('Tem certeza que deseja excluir este funcionário?')) {
			this.funcionarioService.removerFuncionario(id);
			this.funcionarios = this.funcionarioService.listarTodosFuncionarios();
			this.mensagem = 'Funcionário removido com sucesso!';
			setTimeout(() => this.mensagem = '', 3000);
		}
	}

	salvarOuEditarfuncionario() {
		if (this.formfuncionario.invalid) {
			this.formfuncionario.markAllAsTouched();
			this.mensagemErro = 'Preencha todos os campos corretamente.';
			setTimeout(() => this.mensagemErro = '', 3000);
			return;
		}
		this.carregando = true;
		const dados = this.formfuncionario.value;
		try {
			if (this.funcionarioSelecionado) {
				const funcionarioEditado = { ...this.funcionarioSelecionado, ...dados };
				this.funcionarioService.atualizarFuncionario(funcionarioEditado);
				this.mensagem = 'Funcionário atualizado com sucesso!';
			} else {
				this.funcionarioService.addFuncionario(dados);
				this.mensagem = 'Funcionário cadastrado com sucesso!';
			}
			this.funcionarios = this.funcionarioService.listarTodosFuncionarios();
			this.fecharModal();
		} catch (e) {
			this.mensagemErro = 'Erro ao salvar funcionário.';
		} finally {
			this.carregando = false;
			setTimeout(() => this.mensagem = '', 3000);
		}
	}

	listarfuncionarios(): Funcionario[] {
		return this.funcionarioService.listarTodosFuncionarios();
	}
}
