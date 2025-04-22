import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Categoria } from '../../../shared/models/categoria.model';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Situacao } from '../../../shared/models/solicitacao.model';
import { TabelaExpandidaComponent } from '../tabela-expandida/tabela-expandida.component';

@Component({
	selector: 'app-tabela-solicitacoes',
	imports: [TabelaExpandidaComponent, DatePipe],
	templateUrl: './tabela-solicitacoes.component.html',
})
export class TabelaSolicitacoesComponent {
	@Input() ultima = false;
	@Input() header = false;
	@Input() dataSolicitacao!: Date;
	@Input() descricao!: string;
	@Input() situacao!: Situacao;
	@Input() categoria!: Categoria;
	@Input() funcionario?: Funcionario;
	@Input() valorOrcamento?: number;
	@Input() dataOrcamento?: Date;

	expandida = false;

	toggleExpansion() {
		this.expandida = !this.expandida;
	}
}
