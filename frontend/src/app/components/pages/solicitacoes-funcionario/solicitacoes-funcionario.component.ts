import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
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
	formManutencao: FormGroup;
	solicitacaoModal!: Solicitacao;
	modalEfetuarManutencao = false;

	constructor(
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService,
		private fBuilder: FormBuilder
	) {
		this.formManutencao = this.fBuilder.group({
			descricaoManutencao: ['', Validators.required],
			orientacoes: ['', Validators.required],
		});
	}

	ngOnInit() {
		const lista = this.solicitacaoService.listarSolicitacoes();
		lista.filter((solicitacao) => solicitacao.funcionario === this.loggedUserService.getLoggedUser());
		this.listaSolicitacoes = this.solicitacaoService.listarSolicitacoes();
	}

	toggleModalManutencao(solicitacao?: Solicitacao) {
		this.modalEfetuarManutencao = !this.modalEfetuarManutencao;
		if (this.modalEfetuarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modalEfetuarManutencao && !solicitacao) {
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
}
