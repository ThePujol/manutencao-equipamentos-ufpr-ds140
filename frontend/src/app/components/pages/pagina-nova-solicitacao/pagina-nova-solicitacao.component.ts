import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CategoriaService } from '../../../services/categoria.service';
import { PessoaService } from '../../../services/pessoa.service';
import { SolicitacaoService } from '../../../services/solicitacao.service';
import { Categoria } from '../../../shared/models/categoria.model';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: '´app-pagina-nova-solicitacao',
	templateUrl: './pagina-nova-solicitacao.component.html',
	imports: [
		SidebarClienteComponent,
		RouterOutlet,
		CommonModule,
		ReactiveFormsModule,
		MatIcon,
		InputTextComponent,
		RouterLink,
	],
})
export class PaginaNovaSolicitacaoComponent implements OnInit {
	title = 'Nova Solicitação';
	novaSolicitacaoForm!: FormGroup;
	listaCategorias: Categoria[] = [];

	constructor(
		private fBuilder: FormBuilder,
		private categoriaService: CategoriaService,
		private solicitacaoService: SolicitacaoService,
		private pessoaService: PessoaService
	) {
		this.novaSolicitacaoForm = this.fBuilder.group({
			descricao: ['', Validators.required],
			categoria: ['', Validators.required],
			defeito: ['', Validators.required],
		});
	}

	ngOnInit() {
		this.listaCategorias = this.listarCategorias();
	}

	listarCategorias() {
		return this.categoriaService.listarTodasCategorias();
	}

	onSubmit() {
		if (this.novaSolicitacaoForm.valid) {
			const formValue = this.novaSolicitacaoForm.value;
			const categoriaSelecionada = this.categoriaService.categoriaPorId(Number(formValue.categoria));

			// Salvar categoria como objeto
			const solicitacao: Solicitacao = {
				...formValue,
				categoria: categoriaSelecionada!,
			};

			this.solicitacaoService.addSolicitacao(solicitacao, this.pessoaService.pessoaPorId(1745344160078));

			this.novaSolicitacaoForm.reset();
		} else {
			this.novaSolicitacaoForm.markAllAsTouched();
		}
	}
}
