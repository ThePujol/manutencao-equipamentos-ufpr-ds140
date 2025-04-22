import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaSolicitacoesComponent } from '../../tabelas/tabela-solicitacoes/tabela-solicitacoes.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: 'app-pagina-solicitacoes',
	imports: [SidebarClienteComponent, MatIcon, TabelaSolicitacoesComponent, RouterOutlet],
	templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent implements OnInit {
	listaSolicitacoes: Solicitacao[] = [];

	constructor(private solicitacaoService: SolicitacaoService) {}

	listarSolicitacoes() {
		this.listaSolicitacoes = this.solicitacaoService.listarSolicitacoes();
	}

	ngOnInit() {
		this.listarSolicitacoes();
	}

	teste() {
		console.log(this.listaSolicitacoes);
	}
}
