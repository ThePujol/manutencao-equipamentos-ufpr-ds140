import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-secondary-button',
	imports: [],
	templateUrl: './secondary-button.component.html',
})
export class SecondaryButtonComponent {
	@Input() text = 'Botao';
	@Output() funcao = new EventEmitter<void>();
}
