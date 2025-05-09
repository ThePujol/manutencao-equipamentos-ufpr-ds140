import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matLogOutOutline } from '@ng-icons/material-icons/outline';

import { LoggedUserService } from '../../../services/logged-user.service';
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

	constructor(private loggedUserService: LoggedUserService) {}

	deslogar() {
		this.loggedUserService.clearLoggedUser();
	}

	ngOnInit() {
		this.loggedUser = this.loggedUserService.getLoggedUser();
		this.primeiroNome = this.loggedUser.nome.split(' ')[0];
	}
}
