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
		SidebarClienteComponent,
		RouterOutlet,
		CommonModule,
		ReactiveFormsModule,
		InputTextComponent,
		RouterLink,
		ButtonComponent,
		NgIcon,
	],
	viewProviders: [provideIcons({ matAddCircleOutlineOutline, matInfoOutline })],
})
export class PaginaNovaSolicitacaoComponent implements OnInit {
	title = 'Nova Solicitação';
	novaSolicitacaoForm!: FormGroup;
	listaCategorias: Categoria[] = [];
	loggedUser!: Pessoa;
	mensagem = '';
	mensagemErro = '';
	carregando = false;

	constructor(
		private fBuilder: FormBuilder,
		private categoriaService: CategoriaService,
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService
	) {
		this.novaSolicitacaoForm = this.fBuilder.group({
			descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
			categoria: ['', Validators.required],
			defeito: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
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
		if (this.novaSolicitacaoForm.invalid) {
			this.novaSolicitacaoForm.markAllAsTouched();
			this.mensagemErro = 'Preencha todos os campos corretamente.';
			setTimeout(() => this.mensagemErro = '', 3000);
			return;
		}
		this.carregando = true;
		try {
			const formValue = this.novaSolicitacaoForm.value;
			const categoriaSelecionada = this.categoriaService.categoriaPorId(Number(formValue.categoria));
			const solicitacao: Solicitacao = {
				...formValue,
				categoria: categoriaSelecionada!,
			};
			this.solicitacaoService.addSolicitacao(solicitacao, this.loggedUser);
			this.novaSolicitacaoForm.reset();
			this.mensagem = 'Solicitação enviada com sucesso!';
			setTimeout(() => this.mensagem = '', 3000);
		} catch (e) {
			this.mensagemErro = 'Erro ao enviar solicitação.';
		} finally {
			this.carregando = false;
		}
	}
}
