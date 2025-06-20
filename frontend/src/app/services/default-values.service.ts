// src/app/services/default-values.service.ts

import { Injectable } from '@angular/core';
import { Funcionario } from '../shared/models/funcionario.model';
import { FuncionarioService } from './funcionario.service';

@Injectable({
	providedIn: 'root',
})
export class DefaultValuesService {
	private defaultFuncionarios: Funcionario[] = [
		new Funcionario(1, 'mario@gmail.com', 'Mario', 'mario123', new Date('1980-01-01')),
		new Funcionario(2, 'maria@gmail.com', 'Maria', 'maria123', new Date('1980-01-01')),
	];

	constructor(private funcionarioService: FuncionarioService) {}

	setarDefaultFuncionarios(): void {
		// Usa o stub síncrono para obter o array puro
		const lista: Funcionario[] = this.funcionarioService.listarTodosFuncionariosSync();

		// Adiciona só se não existir
		this.defaultFuncionarios.forEach((def) => {
			if (!lista.find((f) => f.id === def.id)) {
				this.funcionarioService.addFuncionario(def);
			}
		});
	}
}
