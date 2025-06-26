import { map } from 'rxjs';

import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeftOutline, matChevronRightOutline } from '@ng-icons/material-icons/outline';

import { AuthService } from '../../../../services/auth.service';
import { OrcamentoService } from '../../../../services/orcamento.service';
import {
	SolicitacaoHistoricoService,
	SolicitacaoStatusHistorico,
} from '../../../../services/solicitacao-status-historico.service';
import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { Pessoa } from '../../../../shared/models/pessoa.model';
import { Situacao, Solicitacao } from '../../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../../shared/tabela-interface';
import { Util } from '../../../../shared/util';
import { TabelaExpandivelComponent } from '../../../tabelas/tabela-expandivel/tabela-expandivel.component';
import { InputPesquisarComponent } from '../../../ui/input-pesquisar/input-pesquisar.component';
import { MensagemComponent } from '../../../ui/mensagem/mensagem.component';
import { SelectEstadoComponent } from '../../../ui/select-estado/select-estado.component';
import { SidebarClienteComponent } from '../../../ui/sidebar-cliente/sidebar-cliente.component';
import { ModalHistoricoComponent } from '../../../ui/modal-historico/modal-historico.component';

@Component({
	selector: 'app-pagina-solicitacoes',
	imports: [
		SidebarClienteComponent,
		RouterOutlet,
		InputPesquisarComponent,
		MensagemComponent,
		TabelaExpandivelComponent,
		SelectEstadoComponent,
		FormsModule,
		CommonModule,
		NgIcon,
		ModalHistoricoComponent,
	],
	viewProviders: [provideIcons({ matChevronLeftOutline, matChevronRightOutline })],
	templateUrl: './pagina-solicitacoes.component.html',
	providers: [DatePipe],
})
export class PaginaSolicitacoesComponent implements OnInit {
	todasSolicitacoes: Solicitacao[] = [];
	listaSolicitacoes: Solicitacao[] = [];
	loggedUser!: Pessoa;
	showMessage = false;
	mensagem!: string;

	query = '';
	estado = 'todos';
	dataMin?: Date;
	dataMax?: Date;

	headersTabela: TableColumn[] = [
		{ fieldName: 'dataSolicitacaoAbertura', headerName: 'Data' },
		{ fieldName: 'descricao', headerName: 'Descrição' },
		{ fieldName: 'situacao', headerName: 'Situação' },
	];

	historico: SolicitacaoStatusHistorico[] = [];
	mostrarModalHistorico = false;

	// Paginação
	itensPorPagina!: number;
	paginaAtual = 1;
	get totalPaginas(): number {
		return Math.ceil(this.listaSolicitacoes.length / this.itensPorPagina) || 1;
	}
	get solicitacoesPaginadas(): Solicitacao[] {
		const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
		return this.listaSolicitacoes.slice(inicio, inicio + this.itensPorPagina);
	}

	constructor(
		private solicitacaoService: SolicitacaoService,
		private authService: AuthService,
		private orcamentoAction: OrcamentoService,
		private historicoService: SolicitacaoHistoricoService
	) {}

	ngOnInit() {
		const altura = window.innerHeight;

		if (altura > 800) {
			this.itensPorPagina = 5;
		} else {
			this.itensPorPagina = 5;
		}

		this.loggedUser = this.authService.getUserData();
		this.solicitacaoService
			.listarSolicitacoes()
			.pipe(map((solicitacoes) => solicitacoes.filter((s) => s.cliente.id === this.authService.getUserData().id)))
			.subscribe((solicitacoes) => {
				this.todasSolicitacoes = solicitacoes;
				this.listaSolicitacoes = solicitacoes;
			});
		this.todasSolicitacoes.filter((solicitacao) => solicitacao.cliente.id === this.loggedUser.id);
		this.orcamentoAction.setFuncoes({
			aprovar: this.aprovarOrcamento.bind(this),
			rejeitar: this.rejeitarOrcamento.bind(this),
			resgatar: this.resgatarOrcamento.bind(this),
		});
	}

	abrirHistorico(solicitacaoId: number) {
		console.log('Cliente: Abrindo histórico da solicitação:', solicitacaoId);
		this.historicoService.listarHistorico(solicitacaoId).subscribe({
			next: (h) => {
				console.log('Cliente: Histórico recebido:', h);
				this.historico = h;
				this.mostrarModalHistorico = true;
			},
			error: (error) => {
				console.error('Cliente: Erro ao carregar histórico:', error);
				this.mensagem = 'Erro ao carregar histórico da solicitação.';
				this.showMessage = true;
				setTimeout(() => {
					this.showMessage = false;
				}, 3000);
			},
		});
	}

	fecharModalHistorico() {
		this.mostrarModalHistorico = false;
		this.historico = [];
	}

	aprovarOrcamento(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.APROVADA;

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

		solicitacao.situacao = Situacao.REJEITADA;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => console.log(res));

		setTimeout(() => {
			this.showMessage = false;
		}, 3000);
	}

	resgatarOrcamento(solicitacao: Solicitacao) {
		this.showMessage = true;
		this.mensagem = 'Serviço resgatado!';

		solicitacao.situacao = Situacao.ORÇADA;
		solicitacao.motivoRejeicao = undefined;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => console.log(res));

		setTimeout(() => {
			this.showMessage = false;
		}, 3000);
	}

	pesquisarSolicitacao(query: string) {
		this.query = query;
		this.listaSolicitacoes = Util.pesquisarSolicitacao(this.todasSolicitacoes, this.query, this.estado);
	}

	filtrarPorEstado(estado: string) {
		this.estado = estado;
		this.listaSolicitacoes = Util.pesquisarSolicitacao(this.todasSolicitacoes, this.query, this.estado);
	}

	filtrarPorData() {
		const min = this.dataMin ? new Date(this.dataMin) : undefined;
		const max = this.dataMax ? new Date(this.dataMax) : undefined;

		// Corrige as datas para ajustar o fuso horario
		const minCorrigido = min ? new Date(min.getTime() + min.getTimezoneOffset() * 60000) : undefined;
		const maxCorrigido = max ? new Date(max.getTime() + max.getTimezoneOffset() * 60000) : undefined;

		this.listaSolicitacoes = Util.pesquisarSolicitacao(
			this.todasSolicitacoes,
			this.query,
			this.estado,
			minCorrigido,
			maxCorrigido
		);
	}

	mudarPagina(p: number) {
		if (p >= 1 && p <= this.totalPaginas) {
			this.paginaAtual = p;
		}
	}
}
