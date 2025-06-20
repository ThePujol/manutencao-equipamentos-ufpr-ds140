// src/app/components/pages/pagina-solicitacoes/pagina-solicitacoes.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { MensagemComponent } from '../../ui/mensagem/mensagem.component';
import { TabelaExpandivelComponent } from '../../tabelas/tabela-expandivel/tabela-expandivel.component';

import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { OrcamentoService } from '../../../services/orcamento.service';

import { Pessoa } from '../../../shared/models/pessoa.model';
import { Solicitacao, Situacao } from '../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../shared/tabela-interface';

@Component({
	selector: 'app-pagina-solicitacoes',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		SidebarClienteComponent,
		InputPesquisarComponent,
		MensagemComponent,
		TabelaExpandivelComponent,
	],
	templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent implements OnInit {
	/** usuário logado (apenas Pessoa aqui) */
	loggedUser: Pessoa | null = null;

	/** lista completa de solicitações do cliente */
	listaSolicitacoes: Solicitacao[] = [];

	/** mostra/oculta mensagem de confirmação */
	showMessage = false;
	mensagem = '';

	/** colunas para a tabela */
	headersTabela: TableColumn[] = [
		{ fieldName: 'dataSolicitacao', headerName: 'Data' },
		{ fieldName: 'descricao', headerName: 'Descrição' },
		{ fieldName: 'situacao', headerName: 'Situação' },
	];

	constructor(
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService,
		private orcamentoAction: OrcamentoService
	) {}

	ngOnInit(): void {
		// 1) Obter o usuário logado (Pessoa)
		this.loggedUserService.getLoggedUser().subscribe((user) => {
			if (user && !('dataNasc' in user)) {
				this.loggedUser = user as Pessoa;
				// 2) Só após ter o usuário, carregar solicitações
				this.listaSolicitacoes = this.listarSolicitacoesCliente();
			}
		});

		// configurações do service de orçamentos
		this.orcamentoAction.setFuncoes({
			aprovar: this.aprovarOrcamento.bind(this),
			rejeitar: this.rejeitarOrcamento.bind(this),
		});
	}

	/** filtra só as solicitações deste cliente */
	private listarSolicitacoesCliente(): Solicitacao[] {
		if (!this.loggedUser) {
			return [];
		}
		return this.solicitacaoService
			.listarSolicitacoes()
			.filter((solicitacao) => solicitacao.cliente.id === this.loggedUser!.id);
	}

	/** aprova o orçamento e exibe mensagem */
	aprovarOrcamento(solicitacao: Solicitacao): void {
		solicitacao.situacao = Situacao.aprovada;
		if (!solicitacao.orcamento) {
			throw new Error('Solicitação não possui valor de orçamento.');
		}

		const precoFormatado = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(solicitacao.orcamento);

		this.showMessage = true;
		this.mensagem = `Serviço aprovado no valor de ${precoFormatado}`;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);

		setTimeout(() => (this.showMessage = false), 3000);
	}

	/** rejeita o orçamento e exibe mensagem */
	rejeitarOrcamento(solicitacao: Solicitacao): void {
		solicitacao.situacao = Situacao.rejeitada;
		this.showMessage = true;
		this.mensagem = 'Serviço rejeitado.';
		this.solicitacaoService.atualizarSolicitacao(solicitacao);

		setTimeout(() => (this.showMessage = false), 3000);
	}

	/** dispara expansão da linha na tabela */
	expandirTabela(solicitacao: unknown): void {
		console.log(solicitacao);
	}
}
