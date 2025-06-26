import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolicitacaoStatusHistorico } from '../../../services/solicitacao-status-historico.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-modal-historico',
	imports: [DatePipe],
	templateUrl: './modal-historico.component.html',
})
export class ModalHistoricoComponent {
	@Input() historico!: SolicitacaoStatusHistorico[];
	@Output() fecharModal = new EventEmitter<void>();
}
