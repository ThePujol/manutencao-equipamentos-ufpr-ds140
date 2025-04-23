import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-secondary-button',
	imports: [RouterLink],
	templateUrl: './secondary-button.component.html',
})
export class SecondaryButtonComponent {
	@Input() text = 'Botao';
	@Input() linkTo?: string;
	@Output() funcao = new EventEmitter<void>();
}
