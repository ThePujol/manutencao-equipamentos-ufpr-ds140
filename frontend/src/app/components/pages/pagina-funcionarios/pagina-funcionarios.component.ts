// src/app/components/pages/pagina-funcionarios/pagina-funcionarios.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { TabelaComponent } from '../../tabelas/tabela/tabela.component';

import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { TableColumn } from '../../../shared/tabela-interface';

@Component({
	selector: 'app-pagina-funcionarios',
	standalone: true,
	imports: [
		CommonModule,
		NgIf,
		NgFor,
		ReactiveFormsModule,
		RouterLink,
		SidebarFuncionarioComponent,
		InputPesquisarComponent,
		InputTextComponent,
		ButtonComponent,
		TabelaComponent,
	],
	templateUrl: './pagina-funcionarios.component.html',
})
export class PaginaFuncionariosComponent implements OnInit {
	funcionarios: Funcionario[] = [];
	headersTabela: TableColumn[] = [
		{ field: 'id', header: 'ID' },
		{ field: 'nome', header: 'Nome' },
		{ field: 'email', header: 'Email' },
		{ field: 'dataNasc', header: 'Data Nasc.' },
		{ field: 'acoes', header: 'Ações' }, // ou outro field que seu componente use para ações
	];

	modal = false;
	formfuncionario!: FormGroup;
	funcionarioSelecionado: Funcionario | null = null;

	constructor(
		private fb: FormBuilder,
		private service: FuncionarioService
	) {}

	ngOnInit(): void {
		this.initForm();
		this.loadFuncionarios();
	}

	private initForm(): void {
		this.formfuncionario = this.fb.group({
			id: [null],
			nome: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			senha: ['', Validators.required],
			dataNasc: ['', Validators.required],
		});
	}

	private loadFuncionarios(): void {
		this.service.listarTodosFuncionarios().subscribe({
			next: (lista) => (this.funcionarios = lista),
			error: (err) => console.error('Erro ao carregar funcionários', err),
		});
	}

	abrirModal(func?: Funcionario): void {
		this.funcionarioSelecionado = func ?? null;
		this.formfuncionario.reset();

		if (func) {
			this.formfuncionario.patchValue({
				id: func.id,
				nome: func.nome,
				email: func.email,
				senha: func.senha,
				dataNasc: func.dataNasc.toISOString().slice(0, 10),
			});
		}
		this.modal = true;
	}

	fecharModal(): void {
		this.modal = false;
	}

	salvarOuEditarfuncionario(): void {
		if (this.formfuncionario.invalid) {
			return;
		}
		const dados: Funcionario = this.formfuncionario.value;

		const operacao$ = this.funcionarioSelecionado ? this.service.atualizar(dados) : this.service.criar(dados);

		operacao$.subscribe({
			next: () => {
				this.modal = false;
				this.loadFuncionarios();
			},
			error: (err) => console.error('Erro ao salvar funcionário', err),
		});
	}

	removerfuncionario(id: number): void {
		this.service.remover(id).subscribe({
			next: () => this.loadFuncionarios(),
			error: (err) => console.error('Erro ao remover funcionário', err),
		});
	}
}
