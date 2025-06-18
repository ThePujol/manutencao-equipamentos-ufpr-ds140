import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { OrcamentoService } from '../../../../services/orcamento.service';
import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { Pessoa } from '../../../../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../../shared/tabela-interface';
import { TabelaExpandivelComponent } from '../../../tabelas/tabela-expandivel/tabela-expandivel.component';
import { InputPesquisarComponent } from '../../../ui/input-pesquisar/input-pesquisar.component';
import { MensagemComponent } from '../../../ui/mensagem/mensagem.component';
import { SidebarClienteComponent } from '../../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: 'app-pagina-solicitacoes',
	imports: [
		SidebarClienteComponent,
		RouterOutlet,
		InputPesquisarComponent,
		MensagemComponent,
		TabelaExpandivelComponent,
	],
	templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent implements OnInit {
	listaSolicitacoes: Solicitacao[] = [];
	loggedUser!: Pessoa;
	showMessage = false;
	mensagem!: string;

	headersTabela: TableColumn[] = [
		{
			fieldName: 'dataSolicitacao',
			headerName: 'Data',
		},
		{
			fieldName: 'descricao',
			headerName: 'Descrição',
		},
		{
			fieldName: 'situacao',
			headerName: 'Situação',
		},
	];

	constructor(
		private solicitacaoService: SolicitacaoService,
		private authService: AuthService,
		private orcamentoAction: OrcamentoService
	) {}

	ngOnInit() {
		this.loggedUser = this.authService.getUserData();
		this.solicitacaoService.listarSolicitacoes().subscribe((solicitacoes) => {
			this.listaSolicitacoes = solicitacoes;
			console.log(this.listaSolicitacoes);
		});
		this.listaSolicitacoes.filter((solicitacao) => solicitacao.cliente.id === this.loggedUser.id);
		this.orcamentoAction.setFuncoes({
			aprovar: this.aprovarOrcamento.bind(this),
			rejeitar: this.rejeitarOrcamento.bind(this),
			resgatar: this.resgatarOrcamento.bind(this),
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

			this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => console.log(res));

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
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => console.log(res));

		setTimeout(() => {
			this.showMessage = false;
		}, 3000);
	}

	resgatarOrcamento(solicitacao: Solicitacao) {
		this.showMessage = true;
		this.mensagem = 'Serviço resgatado!';

		solicitacao.situacao = Situacao.orcada;
		solicitacao.motivoRejeicao = undefined;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => console.log(res));

		setTimeout(() => {
			this.showMessage = false;
		}, 3000);
	}
}
