import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolicitacaoStatusHistorico } from '../../../services/solicitacao-status-historico.service';
import { AuthService } from '../../../services/auth.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
	selector: 'app-modal-historico',
	imports: [DatePipe, DecimalPipe],
	templateUrl: './modal-historico.component.html',
})
export class ModalHistoricoComponent {
	@Input() historico!: SolicitacaoStatusHistorico[];
	@Output() fecharModal = new EventEmitter<void>();

	constructor(private authService: AuthService) {}

	get isCliente(): boolean {
		const userData = this.authService.getUserData();
		return userData?.role === 'pessoa';
	}

	get isFuncionario(): boolean {
		const userData = this.authService.getUserData();
		return userData?.role === 'funcionario';
	}
}
