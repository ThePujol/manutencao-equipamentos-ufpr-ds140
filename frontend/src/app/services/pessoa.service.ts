import { Injectable } from '@angular/core';

import { Pessoa } from '../shared/models/pessoa.model';

const LS_CHAVE = 'pessoas';

@Injectable({
	providedIn: 'root',
})
export class PessoaService {
	constructor() {
		//Construtor vazio
	}

	listarTodosPessoas(): Pessoa[] {
		const pessoas = localStorage['pessoas'];
		return pessoas ? JSON.parse(pessoas) : [];
	}

	addPessoa(pessoa: Pessoa): void {
		const pessoas = this.listarTodosPessoas();

		pessoa.id = new Date().getTime();
		pessoa.senha = JSON.stringify(Math.floor(1000 + Math.random() * 9000));
		pessoas.push(pessoa);
		localStorage[LS_CHAVE] = JSON.stringify(pessoas);
	}

	pessoaPorId(id: number): Pessoa {
		const pessoas = this.listarTodosPessoas();

		const pessoa = pessoas.find((pessoa) => pessoa.id === id);
		if (!pessoa) {
			throw new Error(`Pessoa com id ${id} não encontrado.`);
		}
		return pessoa;
	}

	atualizarPessoa(pessoa: Pessoa): void {
		const pessoas = this.listarTodosPessoas();

		pessoas.forEach((obj, index, objs) => {
			if (pessoa.id === obj.id) {
				objs[index] = pessoa;
			}
		});

		localStorage[LS_CHAVE] = JSON.stringify(pessoas);
	}

	removerPessoa(id: number): void {
		let pessoas = this.listarTodosPessoas();

		pessoas = pessoas.filter((pessoa) => pessoa.id !== id);

		localStorage[LS_CHAVE] = JSON.stringify(pessoas);
	}
}
