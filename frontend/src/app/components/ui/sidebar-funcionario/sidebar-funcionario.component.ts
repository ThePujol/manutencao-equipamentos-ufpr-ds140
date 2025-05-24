import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matExpandLessOutline, matExpandMoreOutline, matLogOutOutline, matTodayOutline } from '@ng-icons/material-icons/outline';
import { CommonModule } from '@angular/common';
import { LoggedUserService } from '../../../services/logged-user.service';
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

	// Variável para controlar a expansão do submenu de relatórios
	relatoriosExpanded = false;

	constructor(private readonly loggedUserService: LoggedUserService) { }

	// Método para alternar o submenu de relatórios
	toggleRelatorios() {
		this.relatoriosExpanded = !this.relatoriosExpanded;
	}

	deslogar() {
		this.loggedUserService.clearLoggedUser();
	}

	ngOnInit() {
		this.loggedUser = this.loggedUserService.getLoggedUser();
		this.primeiroNome = this.loggedUser.nome.split(' ')[0];
	}
}
