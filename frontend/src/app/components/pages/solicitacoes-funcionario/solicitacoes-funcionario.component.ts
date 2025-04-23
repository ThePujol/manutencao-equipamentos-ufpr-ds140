import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';

import { FuncionarioService } from '../../../services/funcionario.service';
import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaSolicitacoesFuncionarioComponent } from '../../tabelas/tabela-solicitacoes-funcionario/tabela-solicitacoes-funcionario.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InformacaoDetalheComponent } from '../../ui/informacao-detalhe/informacao-detalhe.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SecondaryButtonComponent } from '../../ui/secondary-button/secondary-button.component';
import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-solicitacoes-funcionario',
	imports: [
		InputPesquisarComponent,
		TabelaSolicitacoesFuncionarioComponent,
		SidebarFuncionarioComponent,
		ReactiveFormsModule,
		InformacaoDetalheComponent,
		InputTextComponent,
		ButtonComponent,
		SecondaryButtonComponent,
		DatePipe,
	],
	templateUrl: './solicitacoes-funcionario.component.html',
})
export class SolicitacoesFuncionarioComponent implements OnInit {
	listaSolicitacoes!: Solicitacao[];
	listaFuncionarios!: Funcionario[];
	formManutencao: FormGroup;
	formRedirecionar: FormGroup;
	solicitacaoModal!: Solicitacao;
	modalEfetuarManutencao = false;
	modalRedirecionarManutencao = false;

	constructor(
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService,
		private funcionarioService: FuncionarioService,
		private fBuilder: FormBuilder
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

	// Validator para checar se funcionario eh igual ao funcionario logado
	funcionarioDestinoValidator(group: AbstractControl): ValidationErrors | null {
		const funcionarioDestino = group.get('funcionarioDestino')?.value;

		if (funcionarioDestino && funcionarioDestino.id === this.loggedUserService.getLoggedUser().id) {
			return { mesmoFuncionario: true };
		}

		return null;
	}

	ngOnInit() {
		const lista = this.solicitacaoService.listarSolicitacoes();
		this.listaFuncionarios = this.funcionarioService.listarTodosFuncionarios();
		this.listaSolicitacoes = lista.filter(
			(solicitacao) =>
				solicitacao.funcionario && solicitacao.funcionario.id === this.loggedUserService.getLoggedUser().id
		);
	}

	toggleModalManutencao(solicitacao?: Solicitacao) {
		this.modalEfetuarManutencao = !this.modalEfetuarManutencao;
		if (this.modalEfetuarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modalEfetuarManutencao && !solicitacao) {
			throw new Error('Não é possível abrir o modal sem uma solicitação selecionada.');
		}
	}

	toggleModalRedirecionar(solicitacao?: Solicitacao) {
		this.modalRedirecionarManutencao = !this.modalRedirecionarManutencao;
		if (this.modalRedirecionarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modalRedirecionarManutencao && !solicitacao) {
			throw new Error('Não é possível abrir o modal sem uma solicitação selecionada.');
		}
	}

	efetuarManutencao(solicitacao: Solicitacao) {
		if (!solicitacao) {
			throw new Error('Solicitação inválida.');
		}

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

	redirecionarManutencao(solicitacao: Solicitacao) {
		if (!solicitacao) {
			throw new Error('Solicitação inválida.');
		}

		if (this.formRedirecionar.invalid) {
			this.formRedirecionar.markAllAsTouched();
			return;
		}

		solicitacao.funcionario = this.formRedirecionar.value.funcionarioDestino;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
		this.formRedirecionar.reset();
		this.toggleModalRedirecionar();
	}

	finalizarSolicitacao(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.finalizada;
		solicitacao.dataFinalizacao = new Date();
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
	}
}
