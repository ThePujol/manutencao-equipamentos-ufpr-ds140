import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
	selector: 'app-tabela-solicitacoes-abertas',
	imports: [DatePipe, MatIcon],
	templateUrl: './tabela-solicitacoes-abertas.component.html',
})
export class TabelaSolicitacoesAbertasComponent {
	@Input() solicitacao!: Solicitacao;
	@Input() ultima = false;
	@Input() header = false;
	@Input() dataHora!: Date;
	@Input() descricao!: string;
	dropdownOpen = false;

	toggleDropdown() {
		this.dropdownOpen = !this.dropdownOpen;
	}
}
