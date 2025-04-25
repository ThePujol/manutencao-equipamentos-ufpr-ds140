import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoggedUserService } from '../../../services/logged-user.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Situacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaSolicitacoesAbertasComponent } from '../../tabelas/tabela-solicitacoes-abertas/tabela-solicitacoes-abertas.component';
import { ButtonComponent } from '../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../ui/buttons/secondary-button/secondary-button.component';
import { InformacaoDetalheComponent } from '../../ui/informacao-detalhe/informacao-detalhe.component';
import { InputPesquisarComponent } from '../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-solicitacoes-abertas',
	imports: [
		InputPesquisarComponent,
		TabelaSolicitacoesAbertasComponent,
		InputTextComponent,
		ReactiveFormsModule,
		ButtonComponent,
		InformacaoDetalheComponent,
		SecondaryButtonComponent,
		DatePipe,
		SidebarFuncionarioComponent,
	],
	templateUrl: './pagina-solicitacoes-abertas.component.html',
})
export class PaginaSolicitacoesAbertasComponent implements OnInit {
	listaSolicitacoes!: Solicitacao[];
	solicitacoesAbertas!: Solicitacao[];
	formOrcamento!: FormGroup;
	solicitacaoModal!: Solicitacao;
	modal = false;

	constructor(
		private readonly solicitacaoService: SolicitacaoService,
		private readonly loggedUserService: LoggedUserService,
		private readonly fBuilder: FormBuilder
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

		solicitacao.funcionario = this.loggedUserService.getLoggedUser();
		solicitacao.dataOrcamento = new Date();
		solicitacao.orcamento = Number(this.formOrcamento.value.orcamento);
		solicitacao.situacao = Situacao.orcada;
		this.solicitacaoService.atualizarSolicitacao(solicitacao);
		this.formOrcamento.reset();
		this.toggleModal();
	}

	ngOnInit() {
		this.listaSolicitacoes = this.solicitacaoService.listarSolicitacoes();
		this.solicitacoesAbertas = this.listaSolicitacoes.filter(
			(solicitacao) => solicitacao.situacao === Situacao.aberta
		);

		// Recuperar o estado do modal do Local Storage
		const savedModalState = localStorage.getItem('modalState');
		if (savedModalState) {
			this.modal = JSON.parse(savedModalState);
		}
	}

	toggleModal(solicitacao?: Solicitacao) {
		this.modal = !this.modal;

		// Salvar o estado do modal no Local Storage
		localStorage.setItem('modalState', JSON.stringify(this.modal));

		if (this.modal && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modal && !solicitacao) {
			console.error('Erro: Não é possível abrir o modal sem uma solicitação selecionada!');
			alert('Selecione uma solicitação antes de abrir o modal.');
			this.modal = false; // Fecha o modal para evitar inconsistências
			localStorage.setItem('modalState', JSON.stringify(this.modal)); // Atualiza o estado no Local Storage
		}
	}
}
