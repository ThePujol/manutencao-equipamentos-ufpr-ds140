import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { Categoria, Estado, Funcionario } from '../../../db';
import { TabelaExpandidaComponent } from '../tabela-expandida/tabela-expandida.component';

@Component({
	selector: 'app-tabela-solicitacoes',
	imports: [MatIcon, TabelaExpandidaComponent],
	templateUrl: './tabela-solicitacoes.component.html',
})
export class TabelaSolicitacoesComponent {
	@Input() ultima = false;
	@Input() header = false;
	@Input() dataSolicitacao!: Date;
	@Input() descricao!: string;
	@Input() estado!: Estado;
	@Input() categoria!: Categoria;
	@Input() funcionario!: Funcionario;
	@Input() dataOrcamento!: Date;

	expandida = false;

	toggleExpansion() {
		this.expandida = !this.expandida;
	}
}
