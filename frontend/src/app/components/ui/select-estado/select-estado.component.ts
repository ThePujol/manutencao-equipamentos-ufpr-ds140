import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-select-estado',
	imports: [],
	templateUrl: './select-estado.component.html',
})
export class SelectEstadoComponent {
	@Output() selectChange = new EventEmitter<string>();

	onChangeEstado(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		this.selectChange.emit(value);
	}
}
