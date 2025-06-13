import { Injectable } from '@angular/core';

import { Pessoa } from '../shared/models/pessoa.model';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LS_CHAVE = 'pessoas';

@Injectable({
	providedIn: 'root',
})
export class PessoaService {
	private readonly BASE_URL = 'http://localhost:8080/api/pessoas';
	private readonly httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	listarTodosPessoas(): Observable<Pessoa[]> {
		return this.http.get<Pessoa[]>(this.BASE_URL).pipe(
			catchError((err) => {
				console.error('Erro ao listar pessoas', err);
				return of([] as Pessoa[]);
			})
		);
	}

	addPessoa(pessoa: Pessoa): Observable<Pessoa> {
		return this.http.post<Pessoa>(this.BASE_URL, pessoa, this.httpOptions).pipe(
			catchError((err) => {
				console.error('Erro ao criar pessoa', err);
				return of(null as any);
			})
		);
	}

	pessoaPorId(id: number): Observable<Pessoa> {
		const url = `${this.BASE_URL}/${id}`;
		return this.http.get<Pessoa>(url).pipe(
			catchError((err) => {
				console.error(`Erro ao buscar pessoa id=${id}`, err);
				return of(null as any);
			})
		);
	}

	atualizarPessoa(pessoa: Pessoa): Observable<Pessoa> {
		const url = `${this.BASE_URL}/${pessoa.id}`;
		return this.http.put<Pessoa>(url, pessoa, this.httpOptions).pipe(
			catchError((err) => {
				console.error(`Erro ao atualizar pessoa id=${pessoa.id}`, err);
				return of(null as any);
			})
		);
	}

	removerPessoa(id: number): Observable<void> {
		const url = `${this.BASE_URL}/${id}`;
		return this.http.delete<void>(url, this.httpOptions).pipe(
			catchError((err) => {
				console.error(`Erro ao remover pessoa id=${id}`, err);
				return of(void 0);
			})
		);
	}
}
