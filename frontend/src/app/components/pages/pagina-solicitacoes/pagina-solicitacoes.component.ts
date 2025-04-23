import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoggedUserService } from '../../../services/logged-user.service';
import { OrcamentoService } from '../../../services/orcamento.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaSolicitacoesComponent } from '../../tabelas/tabela-solicitacoes/tabela-solicitacoes.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: 'app-pagina-solicitacoes',
	imports: [SidebarClienteComponent, TabelaSolicitacoesComponent, RouterOutlet, InputPesquisarComponent],
	templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent implements OnInit {
	listaSolicitacoes: Solicitacao[] = [];
	loggedUser!: Pessoa;

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
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
	}

	rejeitarOrcamento(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.rejeitada;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
	}
}
