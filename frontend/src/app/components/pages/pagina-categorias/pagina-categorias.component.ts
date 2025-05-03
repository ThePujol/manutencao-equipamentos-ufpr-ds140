import { InputTextComponent } from './../../ui/input-text/input-text.component';
import { Component } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../shared/models/categoria.model';
import { CommonModule } from '@angular/common';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-pagina-categorias',
	imports: [CommonModule, SidebarClienteComponent, ReactiveFormsModule, InputTextComponent],
	templateUrl: './pagina-categorias.component.html',
})
export class PaginaCategoriasComponent {
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
