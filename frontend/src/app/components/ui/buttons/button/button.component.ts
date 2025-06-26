import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-button',
	imports: [RouterLink],
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	@Input() text = 'Botao';
	@Input() type?: string;
	@Input() disabledCondition?: boolean;
	@Input() linkTo?: string;
	@Output() funcao = new EventEmitter<void>();
}
