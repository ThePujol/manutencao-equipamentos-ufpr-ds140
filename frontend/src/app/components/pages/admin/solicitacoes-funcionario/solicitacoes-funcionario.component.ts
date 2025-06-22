import { map } from 'rxjs';

import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeftOutline, matChevronRightOutline } from '@ng-icons/material-icons/outline';

import { AuthService } from '../../../../services/auth.service';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { Funcionario } from '../../../../shared/models/funcionario.model';
import { Situacao, Solicitacao } from '../../../../shared/models/solicitacao.model';
import { TableColumn } from '../../../../shared/tabela-interface';
import { Util } from '../../../../shared/util';
import { TabelaComponent } from '../../../tabelas/tabela/tabela.component';
import { ButtonComponent } from '../../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../../ui/buttons/secondary-button/secondary-button.component';
import { InformacaoDetalheComponent } from '../../../ui/informacao-detalhe/informacao-detalhe.component';
import { InputPesquisarComponent } from '../../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { MensagemComponent } from '../../../ui/mensagem/mensagem.component';
import { SelectEstadoComponent } from '../../../ui/select-estado/select-estado.component';
import { SidebarFuncionarioComponent } from '../../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-solicitacoes-funcionario',
	imports: [
		InputPesquisarComponent,
		SidebarFuncionarioComponent,
		ReactiveFormsModule,
		InformacaoDetalheComponent,
		InputTextComponent,
		ButtonComponent,
		SecondaryButtonComponent,
		DatePipe,
		TabelaComponent,
		MensagemComponent,
		SelectEstadoComponent,
		FormsModule,
		CommonModule,
		NgIcon,
	],
	viewProviders: [provideIcons({ matChevronLeftOutline, matChevronRightOutline })],
	templateUrl: './solicitacoes-funcionario.component.html',
})
export class SolicitacoesFuncionarioComponent implements OnInit {
	todasSolicitacoes!: Solicitacao[];
	listaSolicitacoes!: Solicitacao[];
	listaFuncionarios!: Funcionario[];
	formManutencao: FormGroup;
	formRedirecionar: FormGroup;
	solicitacaoModal!: Solicitacao;
	modalEfetuarManutencao = false;
	modalRedirecionarManutencao = false;
	showMessage = false;
	mensagem = '';

	estado = 'todos';
	query = '';
	dataMin?: Date;
	dataMax?: Date;

	// Paginação
	itensPorPagina = 8;
	paginaAtual = 1;
	get totalPaginas(): number {
		return Math.ceil((this.listaSolicitacoes?.length || 0) / this.itensPorPagina) || 1;
	}
	get solicitacoesPaginadas(): Solicitacao[] {
		const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
		return this.listaSolicitacoes?.slice(inicio, inicio + this.itensPorPagina) || [];
	}
	mudarPagina(p: number) {
		if (p >= 1 && p <= this.totalPaginas) {
			this.paginaAtual = p;
		}
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
		{
			fieldName: 'situacao',
			headerName: 'Situação Atual',
		},
	];

	constructor(
		private solicitacaoService: SolicitacaoService,
		private authService: AuthService,
		private funcionarioService: FuncionarioService,
		private fBuilder: FormBuilder
	) {
		this.formManutencao = this.fBuilder.group({
			descricaoManutencao: ['', Validators.required],
			orientacoes: ['', Validators.required],
		});
		this.formRedirecionar = this.fBuilder.group(
			{
				funcionarioDestino: ['', Validators.required],
			},
			{ validators: this.funcionarioDestinoValidator.bind(this) }
		);
	}

	// Validator para checar se funcionario eh igual ao funcionario logado
	funcionarioDestinoValidator(group: AbstractControl): ValidationErrors | null {
		const funcionarioDestino = group.get('funcionarioDestino')?.value;

		if (funcionarioDestino && funcionarioDestino.id === this.authService.getUserData().id) {
			return { mesmoFuncionario: true };
		}

		return null;
	}

	listarSolicitacoesPorFuncionario() {
		this.solicitacaoService
			.listarSolicitacoes()
			.pipe(
				map((solicitacoes) =>
					solicitacoes.filter((s) => s.funcionario && s.funcionario.id === this.authService.getUserData().id)
				)
			)
			.subscribe((solicitacoes) => {
				this.todasSolicitacoes = solicitacoes;
				this.listaSolicitacoes = solicitacoes;
			});
	}

	ngOnInit() {
		this.listarSolicitacoesPorFuncionario();

		this.funcionarioService
			.listarTodosFuncionarios()
			.pipe(map((funcionarios) => funcionarios.filter((f) => f.id != this.authService.getUserData().id)))
			.subscribe((funcionarios) => {
				this.listaFuncionarios = funcionarios;
			});
	}

	toggleModalManutencao(solicitacao?: Solicitacao) {
		this.modalEfetuarManutencao = !this.modalEfetuarManutencao;
		if (this.modalEfetuarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modalEfetuarManutencao && !solicitacao) {
			throw new Error('Não é possível abrir o modal sem uma solicitação selecionada.');
		}
	}

	toggleModalRedirecionar(solicitacao?: Solicitacao) {
		this.modalRedirecionarManutencao = !this.modalRedirecionarManutencao;
		if (this.modalRedirecionarManutencao && solicitacao) {
			this.solicitacaoModal = solicitacao;
		} else if (this.modalRedirecionarManutencao && !solicitacao) {
			throw new Error('Não é possível abrir o modal sem uma solicitação selecionada.');
		}
	}

	efetuarManutencao(solicitacao: Solicitacao) {
		if (!solicitacao) {
			throw new Error('Solicitação inválida.');
		}

		if (this.formManutencao.invalid) {
			this.formManutencao.markAllAsTouched();
			return;
		}

		solicitacao.descricaoManutencao = this.formManutencao.value.descricaoManutencao;
		solicitacao.orientacoes = this.formManutencao.value.orientacoes;
		solicitacao.situacao = Situacao.ARRUMADA;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => {
			console.log(res);
			this.formManutencao.reset();
			this.toggleModalManutencao();
		});
	}

	redirecionarManutencao(solicitacao: Solicitacao) {
		if (!solicitacao) {
			throw new Error('Solicitação inválida.');
		}

		if (this.formRedirecionar.invalid) {
			this.formRedirecionar.markAllAsTouched();
			return;
		}

		this.showMessage = true;
		this.mensagem = 'Solicitação redirecionada.';

		solicitacao.funcionario = this.formRedirecionar.value.funcionarioDestino;
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => {
			console.log(res);
			this.formRedirecionar.reset();
			this.toggleModalRedirecionar();
		});

		// Atualizar lista de solicitacoes
		this.listarSolicitacoesPorFuncionario();

		// Intervalo para a mensagem desaparecer
		setTimeout(() => {
			this.showMessage = false;
		}, 3000);
	}

	finalizarSolicitacao(solicitacao: Solicitacao) {
		solicitacao.situacao = Situacao.FINALIZADA;
		solicitacao.dataFinalizacao = new Date();
		this.solicitacaoService.atualizarSolicitacao(solicitacao).subscribe((res) => {
			console.log(res);
		});
	}

	pesquisarSolicitacao(query: string) {
		this.query = query;
		this.listaSolicitacoes = Util.pesquisarSolicitacao(
			this.todasSolicitacoes,
			this.query,
			this.estado,
			this.dataMin,
			this.dataMax
		);
	}

	filtrarPorEstado(estado: string) {
		this.estado = estado;
		this.listaSolicitacoes = Util.pesquisarSolicitacao(
			this.todasSolicitacoes,
			this.query,
			this.estado,
			this.dataMin,
			this.dataMax
		);
	}

	filtrarPorData() {
		const min = this.dataMin ? new Date(this.dataMin) : undefined;
		const max = this.dataMax ? new Date(this.dataMax) : undefined;
		this.listaSolicitacoes = Util.pesquisarSolicitacao(this.todasSolicitacoes, this.query, this.estado, min, max);
	}

	menor(a: number, b: number): number {
		return a < b ? a : b;
	}
}
