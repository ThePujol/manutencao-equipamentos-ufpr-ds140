import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Situacao } from '../../../shared/models/solicitacao.model';

@Component({
    selector: 'app-multi-select-estado',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './multi-select-estado.component.html',
})
export class MultiSelectEstadoComponent {
    @Output() estadosChange = new EventEmitter<Situacao[]>();

    estados = [
        Situacao.ABERTA,
        Situacao.ORÇADA,
        Situacao.REJEITADA,
        Situacao.REDIRECIONADA,
        Situacao.APROVADA,
        Situacao.ARRUMADA,
        Situacao.PAGA,
        Situacao.FINALIZADA,
    ];
    selecionados: Situacao[] = [Situacao.FINALIZADA];

    onSelectionChange() {
        this.estadosChange.emit(this.selecionados);
    }
}
