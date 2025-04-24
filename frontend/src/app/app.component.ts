import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DefaultValuesService } from './services/default-values.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private defaultValuesService: DefaultValuesService) {}

	ngOnInit() {
		this.defaultValuesService.setarDefaultFuncionarios();
	}
}
