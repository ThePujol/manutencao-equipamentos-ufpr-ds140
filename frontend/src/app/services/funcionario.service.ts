// src/app/services/funcionario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../shared/models/funcionario.model';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
	private readonly BASE_URL = 'http://localhost:8080/api/funcionarios';

	constructor(private http: HttpClient) {}

	/**
	 * Retorna um Observable com a lista completa de Funcionários
	 */
	listarTodosFuncionarios(): Observable<Funcionario[]> {
		return this.http.get<Funcionario[]>(this.BASE_URL);
	}

	/**
	 * Cria um novo Funcionário via POST e retorna o objeto criado
	 */
	criar(func: Funcionario): Observable<Funcionario> {
		return this.http.post<Funcionario>(this.BASE_URL, func);
	}

	/**
	 * Atualiza um Funcionário existente via PUT e retorna o objeto atualizado
	 */
	atualizar(func: Funcionario): Observable<Funcionario> {
		const url = `${this.BASE_URL}/${func.id}`;
		return this.http.put<Funcionario>(url, func);
	}

	/**
	 * Remove um Funcionário pelo ID via DELETE
	 */
	remover(id: number): Observable<void> {
		const url = `${this.BASE_URL}/${id}`;
		return this.http.delete<void>(url);
	}

	// STUBS LEGADOS -------------------------------------------------------

	/**
	 * Legado: adiciona um funcionário sem expor Observable ao chamador
	 */
	addFuncionario(func: Funcionario): void {
		this.criar(func).subscribe();
	}

	/**
	 * Legado: atualiza um funcionário sem expor Observable ao chamador
	 */
	atualizarFuncionario(func: Funcionario): void {
		this.atualizar(func).subscribe();
	}

	/**
	 * Legado: remove um funcionário sem expor Observable ao chamador
	 */
	removerFuncionario(id: number): void {
		this.remover(id).subscribe();
	}

	/**
	 * Legado síncrono: retorna lista diretamente (pode falhar se chamada antes do subscribe concluir)
	 */
	listarTodosFuncionariosSync(): Funcionario[] {
		let arr: Funcionario[] = [];
		this.listarTodosFuncionarios().subscribe((lista) => (arr = lista));
		return arr;
	}
}
