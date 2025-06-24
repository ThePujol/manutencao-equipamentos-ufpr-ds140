import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	matExpandLessOutline,
	matExpandMoreOutline,
	matLogOutOutline,
	matTodayOutline,
} from '@ng-icons/material-icons/outline';

import { AuthService } from '../../../services/auth.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { SidebarButtonComponent } from '../buttons/sidebar-button/sidebar-button.component';

@Component({
	selector: 'app-sidebar-funcionario',
	imports: [CommonModule, RouterLink, RouterOutlet, RouterModule, SidebarButtonComponent, NgIcon],
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
	loggedUser!: Pessoa | Funcionario;
	primeiroNome!: string;
	relatoriosExpanded!: boolean;

	constructor(private authService: AuthService) {}

	toggleRelatorios() {
		this.relatoriosExpanded = !this.relatoriosExpanded;
		sessionStorage.setItem('relatoriosExpanded', JSON.stringify(this.relatoriosExpanded));
	}

	deslogar() {
		this.authService.logout();
	}

	ngOnInit() {
		this.loggedUser = this.authService.getUserData();
		this.primeiroNome = this.loggedUser.nome.split(' ')[0];

		const savedState = sessionStorage.getItem('relatoriosExpanded');
		this.relatoriosExpanded = savedState ? JSON.parse(savedState) : false;
	}
}
