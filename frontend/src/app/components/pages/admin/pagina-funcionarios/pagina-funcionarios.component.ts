import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../../../services/auth.service';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { Funcionario } from '../../../../shared/models/funcionario.model';
import { TableColumn } from '../../../../shared/tabela-interface';
import { Util } from '../../../../shared/util';
import { TabelaComponent } from '../../../tabelas/tabela/tabela.component';
import { ButtonComponent } from '../../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../../ui/buttons/secondary-button/secondary-button.component';
import { InputPesquisarComponent } from '../../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { MensagemComponent } from '../../../ui/mensagem/mensagem.component';
import { SidebarFuncionarioComponent } from '../../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-funcionarios',
	imports: [
		CommonModule,
		SidebarFuncionarioComponent,
		ReactiveFormsModule,
		InputTextComponent,
		SidebarFuncionarioComponent,
		TabelaComponent,
		InputPesquisarComponent,
		MensagemComponent,
		SecondaryButtonComponent,
		ButtonComponent,
	],
	templateUrl: './pagina-funcionarios.component.html',
})
export class PaginaFuncionariosComponent implements OnInit {
	todosFuncionarios!: Funcionario[];
	listaFuncionarios!: Funcionario[];
	funcionarioSelecionado?: Funcionario;
	modal = false;
	formfuncionario!: FormGroup;
	showErro = false;
	erro = '';

	headersTabela: TableColumn[] = [
		{
			fieldName: 'nome',
			headerName: 'Nome',
		},
		{
			fieldName: 'email',
			headerName: 'Email',
		},
		{
			fieldName: 'dataNasc',
			headerName: 'Data de nascimento',
		},
	];

	constructor(
		private funcionarioService: FuncionarioService,
		private fBuilder: FormBuilder,
		private authService: AuthService
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
		if (this.authService.getUserData().id != id) {
			this.funcionarioService.removerFuncionario(id).subscribe({
				next: () => {
					this.listarfuncionarios();
				},
				error: (err) => {
					this.showErro = true;
					this.erro = 'Erro: ' + err.error;
					setTimeout(() => {
						this.showErro = false;
						this.erro = '';
					}, 4000);
				},
			});
		} else {
			this.showErro = true;
			this.erro = 'Erro: um funcionário não pode deletar ele mesmo';
			setTimeout(() => {
				this.showErro = false;
				this.erro = '';
			}, 4000);
		}
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
			this.todosFuncionarios = funcionarios;
			this.listaFuncionarios = funcionarios;
		});
	}

	pesquisarFuncionario(query: string) {
		this.listaFuncionarios = Util.pesquisarFuncionario(this.todosFuncionarios, query);
	}
}
