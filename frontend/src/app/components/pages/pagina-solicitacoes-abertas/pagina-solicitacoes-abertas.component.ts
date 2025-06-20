// src/app/components/pages/pagina-solicitacoes-abertas/pagina-solicitacoes-abertas.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { TableColumn } from '../../../shared/tabela-interface';

import { TabelaComponent } from '../../tabelas/tabela/tabela.component';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../ui/buttons/secondary-button/secondary-button.component';
import { InformacaoDetalheComponent } from '../../ui/informacao-detalhe/informacao-detalhe.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-solicitacoes-abertas',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputPesquisarComponent,
		InputTextComponent,
		ButtonComponent,
		SecondaryButtonComponent,
		InformacaoDetalheComponent,
		TabelaComponent,
		SidebarFuncionarioComponent,
	],
	templateUrl: './pagina-solicitacoes-abertas.component.html',
})
export class PaginaSolicitacoesAbertasComponent implements OnInit {
	listaSolicitacoes: Solicitacao[] = [];
	solicitacoesAbertas: Solicitacao[] = [];
	formOrcamento: FormGroup;
	solicitacaoModal: Solicitacao | null = null;
	modal = false;
	loggedUser: Funcionario | null = null;

	headersTabela: TableColumn[] = [
		{ fieldName: 'dataSolicitacao', headerName: 'Data / Hora' },
		{ fieldName: 'cliente', headerName: 'Cliente' },
		{ fieldName: 'descricao', headerName: 'Descrição' },
	];

	constructor(
		private solicitacaoService: SolicitacaoService,
		private loggedUserService: LoggedUserService,
		private fb: FormBuilder
	) {
		this.formOrcamento = this.fb.group({
			orcamento: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		// primeiro buscamos o usuário logado
		this.loggedUserService.getLoggedUser().subscribe((user) => {
			// garantimos que seja um Funcionario (ex.: checando uma propriedade exclusiva)
			if (user && 'dataNasc' in user) {
				this.loggedUser = user as Funcionario;
				this.loadSolicitacoes();
			}
		});
	}

	/** carrega e filtra só as solicitações em aberto */
	private loadSolicitacoes(): void {
		this.listaSolicitacoes = this.solicitacaoService.listarSolicitacoes();
		this.solicitacoesAbertas = this.listaSolicitacoes.filter((s) => s.situacao === Situacao.aberta);
	}

	/** abre/fecha o modal de orçamento; se abrir, define a solicitação selecionada */
	toggleModal(solicitacao?: Solicitacao): void {
		this.modal = !this.modal;
		if (this.modal && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modal && !solicitacao) {
			throw new Error('Não é possível abrir o modal sem uma solicitação selecionada!');
		}
	}

	/** executa o orçamento: atribui funcionário, data e valor, e atualiza a solicitação */
	fazerOrcamento(solicitacao: Solicitacao): void {
		if (!this.loggedUser) {
			throw new Error('Usuário não está logado.');
		}
		if (this.formOrcamento.invalid) {
			this.formOrcamento.markAllAsTouched();
			return;
		}

		solicitacao.funcionario = this.loggedUser;
		solicitacao.dataOrcamento = new Date();
		solicitacao.orcamento = Number(this.formOrcamento.value.orcamento);
		solicitacao.situacao = Situacao.orcada;

		this.solicitacaoService.atualizarSolicitacao(solicitacao);
		this.formOrcamento.reset();
		this.toggleModal();
	}
}
