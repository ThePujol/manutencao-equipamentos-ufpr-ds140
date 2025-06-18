import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Funcionario } from '../shared/models/funcionario.model';

@Injectable({
	providedIn: 'root',
})
export class FuncionarioService {
	private apiUrl = 'http://localhost:8080/api/funcionarios';

	constructor(private http: HttpClient) {}

	listarTodosFuncionarios(): Observable<Funcionario[]> {
		return this.http.get<Funcionario[]>(this.apiUrl).pipe(
			map((funcionarios) =>
				funcionarios.map((f) => ({
					...f,
					dataNasc: new Date(f.dataNasc),
				}))
			)
		);
	}

	addFuncionario(funcionario: Funcionario): Observable<Funcionario> {
		return this.http.post<Funcionario>(this.apiUrl, funcionario);
	}

	funcionarioPorId(id: number): Observable<Funcionario> {
		return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
	}

	atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
		return this.http.put<Funcionario>(`${this.apiUrl}/${funcionario.id}`, funcionario);
	}

	removerFuncionario(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
