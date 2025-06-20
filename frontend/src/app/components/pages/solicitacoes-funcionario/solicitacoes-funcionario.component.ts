// src/app/components/pages/solicitacoes-funcionario/solicitacoes-funcionario.component.ts

import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';

import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { InformacaoDetalheComponent } from '../../ui/informacao-detalhe/informacao-detalhe.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../ui/buttons/secondary-button/secondary-button.component';
import { TabelaComponent } from '../../tabelas/tabela/tabela.component';

import { LoggedUserService } from '../../../services/logged-user.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';

import { Funcionario } from '../../../shared/models/funcionario.model';
import { Solicitacao, Situacao } from '../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../shared/tabela-interface';

@Component({
	selector: 'app-solicitacoes-funcionario',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SidebarFuncionarioComponent,
		InputPesquisarComponent,
		InformacaoDetalheComponent,
		InputTextComponent,
		ButtonComponent,
		SecondaryButtonComponent,
		TabelaComponent,
	],
	viewProviders: [DatePipe],
	templateUrl: './solicitacoes-funcionario.component.html',
})
export class SolicitacoesFuncionarioComponent implements OnInit {
	formManutencao: FormGroup;
	formRedirecionar: FormGroup;

	listaSolicitacoes: Solicitacao[] = [];
	listaFuncionarios: Funcionario[] = [];

	modalEfetuarManutencao = false;
	modalRedirecionarManutencao = false;

	solicitacaoModal!: Solicitacao;

	/** Guarda o funcionário logado após o subscribe */
	private loggedUser: Funcionario | null = null;

	headersTabela: TableColumn[] = [
		{ fieldName: 'dataSolicitacao', headerName: 'Data / Hora' },
		{ fieldName: 'cliente', headerName: 'Cliente' },
		{ fieldName: 'descricao', headerName: 'Descrição' },
		{ fieldName: 'situacao', headerName: 'Situação Atual' },
	];

	constructor(
		private fBuilder: FormBuilder,
		private loggedUserService: LoggedUserService,
		private funcionarioService: FuncionarioService,
		private solicitacaoService: SolicitacaoService
	) {
		this.formManutencao = this.fBuilder.group({
			descricaoManutencao: ['', Validators.required],
			orientacoes: ['', Validators.required],
		});

		this.formRedirecionar = this.fBuilder.group(
			{
				funcionarioDestino: ['', Validators.required],
			},
			{ validators: this.funcionarioDestinoValidator.bind(this) }
		);
	}

	ngOnInit(): void {
		// 1) Obter o funcionário logado
		this.loggedUserService.getLoggedUser$().subscribe((user) => {
			if (user && 'dataNasc' in user) {
				this.loggedUser = user as Funcionario;

				// 2) Carregar lista de funcionários via subscribe
				this.funcionarioService.listarTodosFuncionarios().subscribe((funcs) => (this.listaFuncionarios = funcs));

				// 3) Carregar, filtrar e atribuir as solicitações deste funcionário
				const todas = this.solicitacaoService.listarSolicitacoes();
				this.listaSolicitacoes = todas.filter((s) => s.funcionario?.id === this.loggedUser!.id);
			}
		});
	}

	/** Validator: impede redirecionar para si mesmo */
	funcionarioDestinoValidator(group: AbstractControl): ValidationErrors | null {
		const dest: Funcionario = group.get('funcionarioDestino')?.value;
		if (dest && this.loggedUser && dest.id === this.loggedUser.id) {
			return { mesmoFuncionario: true };
		}
		return null;
	}

	toggleModalManutencao(solicitacao?: Solicitacao): void {
		this.modalEfetuarManutencao = !this.modalEfetuarManutencao;
		if (this.modalEfetuarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		}
	}

	toggleModalRedirecionar(solicitacao?: Solicitacao): void {
		this.modalRedirecionarManutencao = !this.modalRedirecionarManutencao;
		if (this.modalRedirecionarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		}
	}

	efetuarManutencao(solicitacao: Solicitacao): void {
		if (this.formManutencao.invalid) {
			this.formManutencao.markAllAsTouched();
			return;
		}
		solicitacao.descricaoManutencao = this.formManutencao.value.descricaoManutencao;
		solicitacao.orientacoes = this.formManutencao.value.orientacoes;
		solicitacao.situacao = Situacao.arrumada;

		this.solicitacaoService.atualizarSolicitacao(solicitacao);
		this.formManutencao.reset();
		this.toggleModalManutencao();
	}

	redirecionarManutencao(solicitacao: Solicitacao): void {
		if (this.formRedirecionar.invalid) {
			this.formRedirecionar.markAllAsTouched();
			return;
		}
		solicitacao.funcionario = this.formRedirecionar.value.funcionarioDestino;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
		this.formRedirecionar.reset();
		this.toggleModalRedirecionar();
	}

	finalizarSolicitacao(solicitacao: Solicitacao): void {
		solicitacao.situacao = Situacao.finalizada;
		solicitacao.dataFinalizacao = new Date();
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
	}
}
