import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-aprovada-card',
	imports: [CurrencyPipe],
	templateUrl: './aprovada-card.component.html',
})
export class AprovadaCardComponent {
	@Input() orcamento!: number;
}
