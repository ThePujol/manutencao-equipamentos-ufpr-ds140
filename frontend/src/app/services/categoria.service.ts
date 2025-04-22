import { Injectable } from '@angular/core';

import { Categoria } from '../shared/models/categoria.model';

const LS_CHAVE = 'categorias';
@Injectable({
	providedIn: 'root',
})
export class CategoriaService {
	constructor() {
		//Construtor vazio
	}

	listarTodasCategorias(): Categoria[] {
		const categorias = localStorage[LS_CHAVE];
		return categorias ? JSON.parse(categorias) : [];
	}

	addCategoria(categoria: Categoria): void {
		const categorias = this.listarTodasCategorias();
		categoria.id = new Date().getTime();
		categorias.push(categoria);
		localStorage[LS_CHAVE] = JSON.stringify(categorias);
	}

	categoriaPorId(id: number): Categoria {
		const categorias = this.listarTodasCategorias();

		const categoria = categorias.find((categoria) => categoria.id === id);
		if (!categoria) {
			throw new Error(`Categoria com id ${id} não encontrada`);
		}
		return categoria;
	}

	atualizarCategoria(categoria: Categoria): void {
		const categorias: Categoria[] = this.listarTodasCategorias();

		categorias.forEach((obj, index, objs) => {
			if (categoria.id === obj.id) {
				objs[index] = categoria;
			}
		});
		localStorage[LS_CHAVE] = JSON.stringify(categorias);
	}

	removerCategoria(id: number): void {
		let categorias = this.listarTodasCategorias();

		categorias = categorias.filter((categoria) => categoria.id !== id);

		localStorage[LS_CHAVE] = JSON.stringify(categorias);
	}
}
