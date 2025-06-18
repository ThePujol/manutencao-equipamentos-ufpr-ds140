import { map } from 'rxjs';

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
	],
	templateUrl: './pagina-solicitacoes-abertas.component.html',
})
export class PaginaSolicitacoesAbertasComponent implements OnInit {
	listaSolicitacoes!: Solicitacao[];
	solicitacoesAbertas!: Solicitacao[];
	formOrcamento!: FormGroup;
	solicitacaoModal!: Solicitacao;
	modal = false;

	headersTabela: TableColumn[] = [
		{
			fieldName: 'dataSolicitacao',
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

		solicitacao.funcionario = this.authService.getUserData();
		solicitacao.dataOrcamento = new Date();
		solicitacao.orcamento = Number(this.formOrcamento.value.orcamento);
		solicitacao.situacao = Situacao.orcada;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((response) => {
			console.log(response);
			this.formOrcamento.reset();
			this.toggleModal();
		});
	}

	ngOnInit() {
		this.solicitacaoService
			.listarSolicitacoes()
			.pipe(map((solicitacoes) => solicitacoes.filter((s) => s.situacao === Situacao.aberta)))
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
