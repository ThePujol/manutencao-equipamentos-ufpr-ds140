// src/app/services/funcionario.service.ts
@Injectable({ providedIn: 'root' })
export class FuncionarioService {
	// novos métodos HTTP…
	listarTodosFuncionarios(): Observable<Funcionario[]> {
		/* … */
	}
	criar(func: Funcionario): Observable<Funcionario> {
		/* … */
	}
	atualizar(func: Funcionario): Observable<Funcionario> {
		/* … */
	}
	remover(id: number): Observable<void> {
		/* … */
	}

	// stubs legados:
	addFuncionario(func: Funcionario): void {
		this.criar(func).subscribe();
	}
	atualizarFuncionario(func: Funcionario): void {
		this.atualizar(func).subscribe();
	}
	removerFuncionario(id: number): void {
		this.remover(id).subscribe();
	}
	listarTodosFuncionariosSync(): Funcionario[] {
		let arr: Funcionario[] = [];
		this.listarTodosFuncionarios().subscribe((lista) => (arr = lista));
		return arr;
	}
}
