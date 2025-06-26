import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Situacao } from '../../../shared/models/solicitacao.model';

@Component({
    selector: 'app-multi-select-estado',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './multi-select-estado.component.html',
})
export class MultiSelectEstadoComponent {
    @Output() estadosChange = new EventEmitter<Situacao[]>();

    estados = Object.values(Situacao);
    selecionados: Situacao[] = [Situacao.FINALIZADA];

    onSelectionChange() {
        this.estadosChange.emit(this.selecionados);
    }
}
