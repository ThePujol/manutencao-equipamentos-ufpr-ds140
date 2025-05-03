import { Injectable } from '@angular/core';

import { Funcionario } from '../shared/models/funcionario.model';
import { FuncionarioService } from './funcionario.service';

@Injectable({
	providedIn: 'root',
})
export class DefaultValuesService {
	defaultFuncionarios: Funcionario[] = [
		new Funcionario(1, 'mario@gmail.com', 'Mario', 'mario123', new Date('01/01/1980')),
		new Funcionario(2, 'maria@gmail.com', 'Maria', 'maria123', new Date('01/01/1980')),
	];

	constructor(private funcionarioService: FuncionarioService) {}

	setarDefaultFuncionarios() {
		const listaFuncionarios = this.funcionarioService.listarTodosFuncionarios();

		if (!listaFuncionarios.find((funcionario: Funcionario) => funcionario.id === 1)) {
			this.funcionarioService.addFuncionario(this.defaultFuncionarios[0]);
		}
		if (!listaFuncionarios.find((funcionario: Funcionario) => funcionario.id === 2)) {
			this.funcionarioService.addFuncionario(this.defaultFuncionarios[1]);
		}
	}
}
