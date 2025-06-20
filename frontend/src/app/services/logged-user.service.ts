// src/app/services/logged-user.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PessoaService } from './pessoa.service';
import { Pessoa } from '../shared/models/pessoa.model';
import { Funcionario } from '../shared/models/funcionario.model';
import { FuncionarioService } from './funcionario.service';

@Injectable({ providedIn: 'root' })
export class LoggedUserService {
	private loggedUserId: number | null = null;

	constructor(
		private pessoaService: PessoaService,
		private funcionarioService: FuncionarioService
	) {}

	setLoggedUser(id: number): void {
		this.loggedUserId = id;
	}

	clearLoggedUser(): void {
		this.loggedUserId = null;
	}

	/** retorna um Observable do usuário logado (Pessoa | Funcionario), ou null */
	getLoggedUser$(): Observable<Pessoa | Funcionario | null> {
		if (this.loggedUserId == null) {
			return of(null);
		}
		// tentar buscar como Pessoa
		return this.pessoaService.listarTodosPessoas().pipe(
			map((ps: Pessoa[]) => ps.find((p) => p.id === this.loggedUserId) || null),
			catchError(() => of(null))
		);
	}

	/** alias síncrono para compatibilidade com código antigo */
	getLoggedUser(): Observable<Pessoa | Funcionario | null> {
		return this.getLoggedUser$();
	}
}
