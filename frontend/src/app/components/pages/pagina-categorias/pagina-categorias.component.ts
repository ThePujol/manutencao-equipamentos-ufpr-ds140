import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../shared/models/categoria.model';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import {
    SidebarFuncionarioComponent
} from '../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-categorias',
	imports: [CommonModule, ReactiveFormsModule, InputTextComponent, SidebarFuncionarioComponent],
	templateUrl: './pagina-categorias.component.html',
})
export class PaginaCategoriasComponent implements OnInit {
	categorias: Categoria[] = [];
	categoriaSelecionada?: Categoria;
	modal = false;
	formCategoria!: FormGroup;

	constructor(
		private categoriaService: CategoriaService,
		private fBuilder: FormBuilder
	) {
		this.formCategoria = this.fBuilder.group({
			descricao: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.categorias = this.listarCategorias();
	}

	abrirModal(categoria?: Categoria) {
		this.modal = true;
		if (categoria) {
			this.categoriaSelecionada = categoria;
			this.formCategoria.patchValue(categoria);
		} else {
			this.categoriaSelecionada = undefined;
			this.formCategoria.reset();
		}
	}

	fecharModal() {
		this.modal = false;
	}

	removerCategoria(id: number) {
		this.categoriaService.removerCategoria(id);
		this.categorias = this.categoriaService.listarTodasCategorias();
	}

	salvarOuEditarCategoria() {
		if (this.formCategoria.invalid) {
			this.formCategoria.markAllAsTouched();
			return;
		}

		const dados = this.formCategoria.value;

		if (this.categoriaSelecionada) {
			const categoriaEditada = { ...this.categoriaSelecionada, ...dados };
			this.categoriaService.atualizarCategoria(categoriaEditada);
		} else {
			this.categoriaService.addCategoria(dados);
		}

		this.categorias = this.categoriaService.listarTodasCategorias();
		this.fecharModal();
	}

	listarCategorias(): Categoria[] {
		return this.categoriaService.listarTodasCategorias();
	}
}
