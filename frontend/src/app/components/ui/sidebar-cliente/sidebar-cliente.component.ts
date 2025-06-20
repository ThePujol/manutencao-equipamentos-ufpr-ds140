// src/app/components/ui/sidebar-cliente/sidebar-cliente.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matLogOutOutline } from '@ng-icons/material-icons/outline';

import { LoggedUserService } from '../../../services/logged-user.service';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { SidebarButtonComponent } from '../buttons/sidebar-button/sidebar-button.component';

@Component({
	selector: 'app-sidebar-cliente',
	standalone: true,
	imports: [CommonModule, NgIf, RouterLink, SidebarButtonComponent, NgIcon],
	viewProviders: [provideIcons({ matLogOutOutline })],
	templateUrl: './sidebar-cliente.component.html',
})
export class SidebarClienteComponent implements OnInit {
	@Input() selected = 0;
	loggedUser: Pessoa | null = null;
	primeiroNome = '';

	constructor(private loggedUserService: LoggedUserService) {}

	deslogar(): void {
		this.loggedUserService.clearLoggedUser();
	}

	ngOnInit(): void {
		this.loggedUserService.getLoggedUser$().subscribe((user) => {
			// só atribui se for Pessoa (cliente), que não tem 'dataNasc'
			if (user && !('dataNasc' in user)) {
				this.loggedUser = user as Pessoa;
				this.primeiroNome = this.loggedUser.nome.split(' ')[0];
			} else {
				this.loggedUser = null;
			}
		});
	}
}
