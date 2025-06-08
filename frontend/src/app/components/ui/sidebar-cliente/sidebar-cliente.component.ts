import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matLogOutOutline } from '@ng-icons/material-icons/outline';

import { AuthService } from '../../../services/auth.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { SidebarButtonComponent } from '../buttons/sidebar-button/sidebar-button.component';

@Component({
	selector: 'app-sidebar-cliente',
	imports: [RouterLink, RouterOutlet, RouterModule, SidebarButtonComponent, NgIcon],
	viewProviders: [provideIcons({ matLogOutOutline })],
	templateUrl: './sidebar-cliente.component.html',
})
export class SidebarClienteComponent implements OnInit {
	@Input() selected = 0;
	loggedUser!: Pessoa | Funcionario;
	primeiroNome!: string;

	constructor(private authService: AuthService) {}

	deslogar() {
		this.authService.logout();
	}

	ngOnInit() {
		this.loggedUser = this.authService.getUserData();
		this.primeiroNome = this.loggedUser.nome.split(' ')[0];
	}
}
