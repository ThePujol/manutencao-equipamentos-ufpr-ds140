import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../shared/models/categoria.model';

@Injectable({
	providedIn: 'root',
})
export class CategoriaService {
	private apiUrl = 'http://localhost:8080/api/categorias';

	constructor(private http: HttpClient) {}

	listarTodasCategorias(): Observable<Categoria[]> {
		return this.http.get<Categoria[]>(this.apiUrl);
	}

	addCategoria(categoria: Categoria): Observable<Categoria> {
		return this.http.post<Categoria>(this.apiUrl, categoria);
	}

	categoriaPorId(id: number): Observable<Categoria> {
		return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
	}

	atualizarCategoria(categoria: Categoria): Observable<Categoria> {
		return this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria);
	}

	removerCategoria(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
