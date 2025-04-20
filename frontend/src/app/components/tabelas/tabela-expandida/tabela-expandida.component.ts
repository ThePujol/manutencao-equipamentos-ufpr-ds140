import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Categoria } from '../../../shared/models/categoria.model';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Situacao } from '../../../shared/models/solicitacao.model';
import { AbertaCardComponent } from '../../ui/aberta-card/aberta-card.component';
import { AprovadaCardComponent } from '../../ui/aprovada-card/aprovada-card.component';
import { ArrumadoCardComponent } from '../../ui/arrumado-card/arrumado-card.component';
import { OrcadaCardComponent } from '../../ui/orcada-card/orcada-card.component';
import { RejeitadaCardComponent } from '../../ui/rejeitada-card/rejeitada-card.component';
import { TableLabelComponent } from '../../ui/table-label/table-label.component';

@Component({
	selector: 'app-tabela-expandida',
	imports: [
		TableLabelComponent,
		ArrumadoCardComponent,
		OrcadaCardComponent,
		AbertaCardComponent,
		AprovadaCardComponent,
		RejeitadaCardComponent,
	],
	templateUrl: './tabela-expandida.component.html',
})
export class TabelaExpandidaComponent {
	@Input() dataSolicitacao!: Date;
	@Input() descricao!: string;
	@Input() categoria!: Categoria;
	@Input() situacao!: Situacao;
	@Input() funcionario?: Funcionario;
	@Input() valorOrcamento?: number;
	@Input() dataOrcamento?: Date;

	@Input() ultima = false;

	@Output() onToggleExpansion = new EventEmitter<any>();

	toggleExpansion() {
		this.onToggleExpansion.emit();
	}
}
