// src/app/components/pages/pagina-nova-solicitacao/pagina-nova-solicitacao.component.ts

import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matAddCircleOutline, matInfoOutline } from '@ng-icons/material-icons/outline';

import { CategoriaService } from '../../../services/categoria.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { LoggedUserService } from '../../../services/logged-user.service';
import { Categoria } from '../../../shared/models/categoria.model';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Solicitacao, Situacao } from '../../../shared/models/solicitacao.model';

import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: 'app-pagina-nova-solicitacao',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterOutlet,
		RouterLink,
		SidebarClienteComponent,
		InputTextComponent,
		ButtonComponent,
		NgIcon,
		NgIf,
		NgFor,
	],
	viewProviders: [provideIcons({ matAddCircleOutline, matInfoOutline })],
	templateUrl: './pagina-nova-solicitacao.component.html',
})
export class PaginaNovaSolicitacaoComponent implements OnInit {
	title = 'Nova Solicitação';
	novaSolicitacaoForm!: FormGroup;
	listaCategorias: Categoria[] = [];
	loggedUser: Pessoa | null = null;

	constructor(
		private fb: FormBuilder,
		private categoriaService: CategoriaService,
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService
	) {
		this.novaSolicitacaoForm = this.fb.group({
			descricao: ['', Validators.required],
			categoria: ['', Validators.required],
			defeito: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.listaCategorias = this.categoriaService.listarTodasCategorias();
		this.loggedUserService.getLoggedUser().subscribe((user) => {
			// Só atribui se for realmente um Cliente (Pessoa)
			if (user && 'cpf' in user) {
				this.loggedUser = user as Pessoa;
			} else {
				this.loggedUser = null;
			}
		});
	}

	trackByCategoria(index: number, categoria: Categoria): number {
		return categoria.id;
	}

	onSubmit(): void {
		if (this.novaSolicitacaoForm.invalid || !this.loggedUser) {
			this.novaSolicitacaoForm.markAllAsTouched();
			return;
		}

		const { descricao, categoria, defeito } = this.novaSolicitacaoForm.value;
		const categoriaSelecionada = this.categoriaService.categoriaPorId(+categoria)!;

		const solicitacao: Solicitacao = {
			id: new Date().getTime(),
			descricao,
			categoria: categoriaSelecionada,
			defeito,
			situacao: Situacao.aberta,
			dataSolicitacao: new Date(),
			cliente: this.loggedUser,
		};

		// Usa non-null assertion pois já garantimos que loggedUser não é null
		this.solicitacaoService.addSolicitacao(solicitacao, this.loggedUser!);
		this.novaSolicitacaoForm.reset();
	}
}
