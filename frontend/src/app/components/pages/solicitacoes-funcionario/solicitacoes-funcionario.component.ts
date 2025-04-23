import { Component, OnInit } from '@angular/core';

import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaSolicitacoesFuncionarioComponent } from '../../tabelas/tabela-solicitacoes-funcionario/tabela-solicitacoes-funcionario.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-solicitacoes-funcionario',
	imports: [InputPesquisarComponent, TabelaSolicitacoesFuncionarioComponent, SidebarFuncionarioComponent],
	templateUrl: './solicitacoes-funcionario.component.html',
})
export class SolicitacoesFuncionarioComponent implements OnInit {
	listaSolicitacoes!: Solicitacao[];

	constructor(
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService
	) {}

	ngOnInit() {
		const lista = this.solicitacaoService.listarSolicitacoes();
		lista.filter((solicitacao) => solicitacao.funcionario === this.loggedUserService.getLoggedUser());
		this.listaSolicitacoes = this.solicitacaoService.listarSolicitacoes();
	}
}
