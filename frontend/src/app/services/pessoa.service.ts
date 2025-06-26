import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../shared/models/pessoa.model';

@Injectable({
	providedIn: 'root',
})
export class PessoaService {
	apiUrl = 'http://localhost:8080/api/pessoas';

	constructor(private http: HttpClient) {}

	listarTodosPessoas(): Observable<Pessoa[]> {
		return this.http.get<Pessoa[]>(this.apiUrl);
	}

	addPessoa(pessoa: Pessoa): Observable<Pessoa> {
		return this.http.post<Pessoa>(this.apiUrl, pessoa);
	}

	pessoaPorId(id: number): Observable<Pessoa> {
		return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
	}

	atualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
		return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.id}`, pessoa);
	}

	removerPessoa(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
