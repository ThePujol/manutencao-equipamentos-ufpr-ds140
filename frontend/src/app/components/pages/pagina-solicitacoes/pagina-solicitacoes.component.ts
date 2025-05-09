import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoggedUserService } from '../../../services/logged-user.service';
import { OrcamentoService } from '../../../services/orcamento.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaComponent } from '../../tabela/tabela.component';
import { TabelaSolicitacoesComponent } from '../../tabelas/tabela-solicitacoes/tabela-solicitacoes.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { MensagemComponent } from '../../ui/mensagem/mensagem.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: 'app-pagina-solicitacoes',
	imports: [
		SidebarClienteComponent,
		TabelaSolicitacoesComponent,
		RouterOutlet,
		InputPesquisarComponent,
		MensagemComponent,
		TabelaComponent,
	],
	templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent implements OnInit {
	listaSolicitacoes: Solicitacao[] = [];
	loggedUser!: Pessoa;
	showMessage = false;
	mensagem!: string;

	constructor(
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService,
		private orcamentoAction: OrcamentoService
	) {}

	listarSolicitacoesCliente() {
		const todasSolicitacoes = this.solicitacaoService.listarSolicitacoes();
		const solicitacoesCliente = todasSolicitacoes.filter(
			(solicitacao) => solicitacao.cliente.id === this.loggedUser.id
		);

		return solicitacoesCliente;
	}

	ngOnInit() {
		this.loggedUser = this.loggedUserService.getLoggedUser();
		this.listaSolicitacoes = this.listarSolicitacoesCliente();
		this.orcamentoAction.setFuncoes({
			aprovar: this.aprovarOrcamento.bind(this),
			rejeitar: this.rejeitarOrcamento.bind(this),
		});
	}

	aprovarOrcamento(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.aprovada;

		if (solicitacao.orcamento) {
			const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
				solicitacao.orcamento
			);

			this.showMessage = true;
			this.mensagem = `Serviço aprovado no valor de ${precoFormatado}`;

			this.solicitacaoService.atualizarSolicitacao(solicitacao);

			setTimeout(() => {
				this.showMessage = false;
			}, 3000);
		} else {
			throw new Error('Solicitação não possui valor de orçamento.');
		}
	}

	rejeitarOrcamento(solicitacao: Solicitacao) {
		this.showMessage = true;
		this.mensagem = 'Serviço rejeitado.';

		solicitacao.situacao = Situacao.rejeitada;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);

		setTimeout(() => {
			this.showMessage = false;
		}, 3000);
	}
}
