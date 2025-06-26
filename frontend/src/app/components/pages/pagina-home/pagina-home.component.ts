import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pagina-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pagina-home.component.html',
})
export class PaginaHomeComponent {
	constructor(private router: Router) {}

	navigateToLogin(): void {
		this.router.navigate(['/login']);
	}

	navigateToCadastro(): void {
		this.router.navigate(['/cadastro']);
	}
}
