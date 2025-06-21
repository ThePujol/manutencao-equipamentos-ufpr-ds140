import { map } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../services/auth.service';
import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../../shared/tabela-interface';
import { TabelaComponent } from '../../../tabelas/tabela/tabela.component';
import { ButtonComponent } from '../../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../../ui/buttons/secondary-button/secondary-button.component';
import { InformacaoDetalheComponent } from '../../../ui/informacao-detalhe/informacao-detalhe.component';
import { InputPesquisarComponent } from '../../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { SidebarFuncionarioComponent } from '../../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-solicitacoes-abertas',
	imports: [
		InputPesquisarComponent,
		InputTextComponent,
		ReactiveFormsModule,
		ButtonComponent,
		InformacaoDetalheComponent,
		SecondaryButtonComponent,
		DatePipe,
		SidebarFuncionarioComponent,
		TabelaComponent,
		CommonModule,
	],
	templateUrl: './pagina-solicitacoes-abertas.component.html',
})
export class PaginaSolicitacoesAbertasComponent implements OnInit {
	listaSolicitacoes!: Solicitacao[];
	solicitacoesAbertas!: Solicitacao[];
	formOrcamento!: FormGroup;
	solicitacaoModal!: Solicitacao;
	modal = false;
	mensagemErroOrcamento = '';

	// Paginação
	itensPorPagina = 8;
	paginaAtual = 1;
	get totalPaginas(): number {
		return Math.ceil((this.solicitacoesAbertas?.length || 0) / this.itensPorPagina) || 1;
	}
	get solicitacoesPaginadas(): Solicitacao[] {
		const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
		return this.solicitacoesAbertas?.slice(inicio, inicio + this.itensPorPagina) || [];
	}
	mudarPagina(p: number) {
		if (p >= 1 && p <= this.totalPaginas) {
			this.paginaAtual = p;
		}
	}
	menor(a: number, b: number): number {
		return a < b ? a : b;
	}

	headersTabela: TableColumn[] = [
		{
			fieldName: 'dataSolicitacaoAbertura',
			headerName: 'Data / Hora',
		},
		{
			fieldName: 'cliente',
			headerName: 'Cliente',
		},
		{
			fieldName: 'descricao',
			headerName: 'Descrição',
		},
	];

	constructor(
		private solicitacaoService: SolicitacaoService,
		private authService: AuthService,
		private fBuilder: FormBuilder
	) {
		this.formOrcamento = this.fBuilder.group({
			orcamento: ['', Validators.required],
		});
	}

	fazerOrcamento(solicitacao: Solicitacao) {
		if (!solicitacao) {
			throw new Error('Solicitação inválida.');
		}

		if (this.formOrcamento.invalid) {
			this.formOrcamento.markAllAsTouched();
			return;
		}

		const valor = Number(this.formOrcamento.value.orcamento);
		if (valor < 0) {
			this.mensagemErroOrcamento = 'O valor do orçamento não pode ser negativo!';
			setTimeout(() => {
				this.mensagemErroOrcamento = '';
			}, 4000);
			return;
		}

		solicitacao.funcionario = this.authService.getUserData();
		solicitacao.dataOrcamento = new Date();
		solicitacao.orcamento = valor;
		solicitacao.situacao = Situacao.ORÇADA;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((response) => {
			console.log(response);
			this.formOrcamento.reset();
			this.toggleModal();
		});
	}

	ngOnInit() {
		this.solicitacaoService
			.listarSolicitacoes()
			.pipe(map((solicitacoes) => solicitacoes.filter((s) => s.situacao === Situacao.ABERTA)))
			.subscribe((solicitacoes) => {
				this.solicitacoesAbertas = solicitacoes;
			});
	}

	toggleModal(solicitacao?: Solicitacao) {
		this.modal = !this.modal;
		if (this.modal && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modal && !solicitacao) {
			throw new Error('Não é possível abrir o modal sem uma solicitação selecionada!');
		}
	}
}
