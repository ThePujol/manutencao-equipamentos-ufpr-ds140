import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';

@Component({
	selector: 'app-orcada-card',
	imports: [ButtonComponent, SecondaryButtonComponent, CurrencyPipe],
	templateUrl: './orcada-card.component.html',
})
export class OrcadaCardComponent {
	@Input() precoOrcamento!: number;
}
