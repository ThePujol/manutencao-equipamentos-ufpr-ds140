import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DefaultValuesService } from './services/default-values.service';
import { TestePessoaComponent } from './components/teste-pessoa/teste-pessoa.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, TestePessoaComponent],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private defaultValuesService: DefaultValuesService) {}

	ngOnInit() {
		this.defaultValuesService.setarDefaultFuncionarios();
	}
}
