import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matAddCircleOutlineOutline, matInfoOutline } from '@ng-icons/material-icons/outline';

import { CategoriaService } from '../../../services/categoria.service';
import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Categoria } from '../../../shared/models/categoria.model';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: '´app-pagina-nova-solicitacao',
	templateUrl: './pagina-nova-solicitacao.component.html',
	imports: [
		RouterOutlet,
		CommonModule,
		ReactiveFormsModule,
		InputTextComponent,
		RouterLink,
		ButtonComponent,
		NgIcon,
		SidebarClienteComponent,
	],
	viewProviders: [provideIcons({ matAddCircleOutlineOutline, matInfoOutline })],
})
export class PaginaNovaSolicitacaoComponent implements OnInit {
	title = 'Nova Solicitação';
	novaSolicitacaoForm!: FormGroup;
	listaCategorias!: Observable<Categoria[]>;
	loggedUser!: Pessoa;

	constructor(
		private fBuilder: FormBuilder,
		private categoriaService: CategoriaService,
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService
	) {
		this.novaSolicitacaoForm = this.fBuilder.group({
			descricao: ['', Validators.required],
			categoria: ['', Validators.required],
			defeito: ['', Validators.required],
		});
	}

	ngOnInit() {
		this.listaCategorias = this.listarCategorias();
		this.loggedUser = this.loggedUserService.getLoggedUser();
	}

	listarCategorias() {
		return this.categoriaService.listarTodasCategorias();
	}

	onSubmit() {
		if (this.novaSolicitacaoForm.valid) {
			const formValue = this.novaSolicitacaoForm.value;
			const categoriaSelecionada = this.categoriaService.categoriaPorId(Number(formValue.categoria));

			// Salvar categoria como objeto
			const solicitacao: Solicitacao = {
				...formValue,
				categoria: categoriaSelecionada!,
			};

			this.solicitacaoService.addSolicitacao(solicitacao, this.loggedUser);

			this.novaSolicitacaoForm.reset();
		} else {
			this.novaSolicitacaoForm.markAllAsTouched();
		}
	}
}
