/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-informacao-detalhe',
	imports: [],
	templateUrl: './informacao-detalhe.component.html',
})
export class InformacaoDetalheComponent {
	@Input() label!: string;
	@Input() dado!: any;
}
