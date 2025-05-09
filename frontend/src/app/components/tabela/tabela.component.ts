import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-tabela',
	imports: [],
	templateUrl: './tabela.component.html',
})
export class TabelaComponent {
	@Input() columns!: string[];
	@Input() rows!: unknown[];
}
