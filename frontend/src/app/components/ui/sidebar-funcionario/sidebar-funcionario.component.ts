// src/app/components/ui/sidebar-funcionario/sidebar-funcionario.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	matLogOutOutline,
	matExpandMoreOutline,
	matExpandLessOutline,
	matTodayOutline,
} from '@ng-icons/material-icons/outline';

import { LoggedUserService } from '../../../services/logged-user.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { SidebarButtonComponent } from '../buttons/sidebar-button/sidebar-button.component';

@Component({
	selector: 'app-sidebar-funcionario',
	standalone: true,
	imports: [
		CommonModule,
		NgIf,
		RouterLink,
		RouterOutlet, // <- adicionado aqui
		SidebarButtonComponent,
		NgIcon,
	],
	viewProviders: [
		provideIcons({
			matLogOutOutline,
			matExpandMoreOutline,
			matExpandLessOutline,
			matTodayOutline,
		}),
	],
	templateUrl: './sidebar-funcionario.component.html',
})
export class SidebarFuncionarioComponent implements OnInit {
	@Input() selected = 0;
	loggedUser: Funcionario | null = null;
	primeiroNome = '';
	relatoriosExpanded = false;

	constructor(private readonly loggedUserService: LoggedUserService) {}

	toggleRelatorios(): void {
		this.relatoriosExpanded = !this.relatoriosExpanded;
	}

	deslogar(): void {
		this.loggedUserService.clearLoggedUser();
	}

	ngOnInit(): void {
		this.loggedUserService.getLoggedUser$().subscribe((user) => {
			if (user && 'dataNasc' in user) {
				this.loggedUser = user as Funcionario;
				this.primeiroNome = this.loggedUser.nome.split(' ')[0];
			} else {
				this.loggedUser = null;
			}
		});
	}
}
