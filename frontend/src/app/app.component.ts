import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Util } from './shared/util';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		// Deslogar usuario se o token dele tiver expirado
		const token = this.authService.getCurrentToken();
		if (token && Util.tokenExpired(token)) {
			this.authService.logout();
		}
	}
}
