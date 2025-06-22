import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CategoriaService } from '../../../../services/categoria.service';
import { Categoria } from '../../../../shared/models/categoria.model';
import { TableColumn } from '../../../../shared/tabela-interface';
import { Util } from '../../../../shared/util';
import { TabelaComponent } from '../../../tabelas/tabela/tabela.component';
import { ButtonComponent } from '../../../ui/buttons/button/button.component';
import { SecondaryButtonComponent } from '../../../ui/buttons/secondary-button/secondary-button.component';
import { InputPesquisarComponent } from '../../../ui/input-pesquisar/input-pesquisar.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { SidebarFuncionarioComponent } from '../../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-categorias',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputTextComponent,
		SidebarFuncionarioComponent,
		TabelaComponent,
		InputPesquisarComponent,
		SecondaryButtonComponent,
		ButtonComponent,
	],
	templateUrl: './pagina-categorias.component.html',
})
export class PaginaCategoriasComponent implements OnInit {
	todasCategorias!: Categoria[];
	listaCategorias!: Categoria[];
	categoriaSelecionada?: Categoria;
	modalEditar = false;
	formCategoria!: FormGroup;

	headersTabela: TableColumn[] = [
		{
			fieldName: 'descricao',
			headerName: 'Categoria',
		},
	];

	constructor(
		private categoriaService: CategoriaService,
		private fBuilder: FormBuilder
	) {
		this.formCategoria = this.fBuilder.group({
			descricao: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.listarCategorias();
	}

	abrirModalEditar(categoria?: Categoria) {
		this.modalEditar = true;
		if (categoria) {
			this.categoriaSelecionada = categoria;
			this.formCategoria.patchValue(categoria);
		} else {
			this.categoriaSelecionada = undefined;
			this.formCategoria.reset();
		}
	}

	fecharModal() {
		this.modalEditar = false;
	}

	removerCategoria(id: number) {
		this.categoriaService.removerCategoria(id).subscribe(() => {
			this.listarCategorias();
		});
	}

	salvarOuEditarCategoria() {
		if (this.formCategoria.invalid) {
			this.formCategoria.markAllAsTouched();
			return;
		}

		const dados = this.formCategoria.value;

		if (this.categoriaSelecionada) {
			const categoriaEditada = { ...this.categoriaSelecionada, ...dados };
			this.categoriaService.atualizarCategoria(categoriaEditada).subscribe(() => {
				this.listarCategorias();
				this.fecharModal();
			});
		} else {
			this.categoriaService.addCategoria(dados).subscribe(() => {
				this.listarCategorias();
				this.fecharModal();
			});
		}
	}

	listarCategorias() {
		this.categoriaService.listarTodasCategorias().subscribe((categorias) => {
			this.todasCategorias = categorias;
			this.listaCategorias = categorias;
		});
	}

	pesquisarCategoria(query: string) {
		this.listaCategorias = Util.pesquisarCategoria(this.todasCategorias, query);
	}
}
