import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-mensagem',
	imports: [],
	templateUrl: './mensagem.component.html',
})
export class MensagemComponent {
	@Input() mensagem!: string;
	@Input() showMessage = false;
}
