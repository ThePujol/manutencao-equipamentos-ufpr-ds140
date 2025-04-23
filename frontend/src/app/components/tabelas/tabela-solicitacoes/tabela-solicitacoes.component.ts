import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { TabelaExpandidaComponent } from '../tabela-expandida/tabela-expandida.component';

@Component({
	selector: 'app-tabela-solicitacoes',
	imports: [TabelaExpandidaComponent, DatePipe],
	templateUrl: './tabela-solicitacoes.component.html',
})
export class TabelaSolicitacoesComponent {
	@Input() ultima = false;
	@Input() header = false;
	@Input() solicitacao!: Solicitacao;

	expandida = false;

	toggleExpansion() {
		this.expandida = !this.expandida;
	}
}
