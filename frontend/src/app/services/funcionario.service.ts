import { Injectable } from '@angular/core';

import { Funcionario } from '../shared/models/funcionario.model';

const LS_CHAVE = 'funcionarios';

@Injectable({
	providedIn: 'root',
})
export class FuncionarioService {
	listarTodosFuncionarios(): Funcionario[] {
		const funcionarios = localStorage['funcionarios'];
		const parsedFuncionarios = funcionarios ? JSON.parse(funcionarios) : [];

		// Re-converter datas armazenadas no local storage
		if (parsedFuncionarios) {
			parsedFuncionarios.forEach((funcionario: Funcionario) => {
				funcionario.dataNasc = new Date(funcionario.dataNasc);
			});
		}

		return parsedFuncionarios;
	}

	addFuncionario(funcionario: Funcionario): void {
		const funcionarios = this.listarTodosFuncionarios();

		if (!funcionario.id) funcionario.id = new Date().getTime();
		funcionarios.push(funcionario);
		localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
	}

	funcionarioPorId(id: number): Funcionario {
		const funcionarios = this.listarTodosFuncionarios();

		const funcionario = funcionarios.find((funcionario) => funcionario.id === id);
		if (!funcionario) {
			throw new Error(`Funcionario com id ${id} não encontrado.`);
		}
		return funcionario;
	}

	atualizarFuncionario(funcionario: Funcionario): void {
		const funcionarios = this.listarTodosFuncionarios();

		funcionarios.forEach((obj, index, objs) => {
			if (funcionario.id === obj.id) {
				objs[index] = funcionario;
			}
		});

		localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
	}

	removerFuncionario(id: number): void {
		let funcionarios = this.listarTodosFuncionarios();

		funcionarios = funcionarios.filter((funcionario) => funcionario.id !== id);

		localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
	}
}
