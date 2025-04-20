import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Categoria, Estado, Funcionario } from '../../../db';
import { ArrumadoCardComponent } from '../../ui/arrumado-card/arrumado-card.component';
import { OrcadaCardComponent } from '../../ui/orcada-card/orcada-card.component';
import { TableLabelComponent } from '../../ui/table-label/table-label.component';

@Component({
	selector: 'app-tabela-expandida',
	imports: [TableLabelComponent, ArrumadoCardComponent, OrcadaCardComponent],
	templateUrl: './tabela-expandida.component.html',
})
export class TabelaExpandidaComponent {
	@Input() dataSolicitacao!: Date;
	@Input() descricao!: string;
	@Input() categoria!: Categoria;
	@Input() estado!: Estado;
	@Input() funcionario!: Funcionario;
	@Input() dataOrcamento!: Date;

	@Output() onToggleExpansion = new EventEmitter<any>();

	toggleExpansion() {
		this.onToggleExpansion.emit();
	}
}
