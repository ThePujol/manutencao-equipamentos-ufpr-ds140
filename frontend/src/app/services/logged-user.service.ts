import { Injectable } from '@angular/core';

import { FuncionarioService } from './funcionario.service';
import { PessoaService } from './pessoa.service';

const LS_LOGGED_USER = 'loggedUser';

@Injectable({
	providedIn: 'root',
})
export class LoggedUserService {
	constructor(
		private pessoaService: PessoaService,
		private funcionarioService: FuncionarioService
	) {}

	clearLoggedUser() {
		localStorage[LS_LOGGED_USER] = {};
	}

	setLoggedUser(id: number) {
		const pessoas = this.pessoaService.listarTodosPessoas();
		const funcionarios = this.funcionarioService.listarTodosFuncionarios();
		const loggedUser = pessoas.find((p) => p.id === id) || funcionarios.find((f) => f.id === id);
		if (!loggedUser) {
			throw new Error(`Não foi possível setar este usuário como logado: id ${id} não encontrado.`);
		}

		localStorage[LS_LOGGED_USER] = JSON.stringify(loggedUser);
	}

	getLoggedUser() {
		const loggedUser = JSON.parse(localStorage[LS_LOGGED_USER]);
		if (!loggedUser) {
			throw new Error('Nenhum usuario logado.');
		}

		return loggedUser;
	}
}
