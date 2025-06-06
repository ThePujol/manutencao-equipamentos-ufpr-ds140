import { InputTextComponent } from './../../ui/input-text/input-text.component';
import { Component, OnInit } from '@angular/core';
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
		this.listarCategorias();
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
			this.categorias = categorias;
		});
	}
}
