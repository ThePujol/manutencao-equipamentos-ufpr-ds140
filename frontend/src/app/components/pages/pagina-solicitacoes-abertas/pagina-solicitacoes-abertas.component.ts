import { Component, OnInit } from '@angular/core';

import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaSolicitacoesAbertasComponent } from '../../tabelas/tabela-solicitacoes-abertas/tabela-solicitacoes-abertas.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-solicitacoes-abertas',
	imports: [SidebarFuncionarioComponent, InputPesquisarComponent, TabelaSolicitacoesAbertasComponent],
	templateUrl: './pagina-solicitacoes-abertas.component.html',
})
export class PaginaSolicitacoesAbertasComponent implements OnInit {
	listaSolicitacoes!: Solicitacao[];
	solicitacoesAbertas!: Solicitacao[];

	constructor(private solicitacaoService: SolicitacaoService) {}

	ngOnInit() {
		this.listaSolicitacoes = this.solicitacaoService.listarSolicitacoes();
		this.solicitacoesAbertas = this.listaSolicitacoes.filter((solicitacao) => solicitacao.situacao === Situacao.aberta);
	}
}
