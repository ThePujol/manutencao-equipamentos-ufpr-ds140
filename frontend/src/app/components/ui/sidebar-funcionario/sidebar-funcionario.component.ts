import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { LoggedUserService } from '../../../services/logged-user.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { Pessoa } from '../../../shared/models/pessoa.model';
import { SidebarButtonComponent } from '../sidebar-button/sidebar-button.component';

@Component({
	selector: 'app-sidebar-funcionario',
	imports: [MatIconModule, RouterLink, RouterOutlet, RouterModule, SidebarButtonComponent],
	templateUrl: './sidebar-funcionario.component.html',
})
export class SidebarFuncionarioComponent implements OnInit {
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
