import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

import { listaCategorias as listaCategoriasDb } from '../../../db';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
	selector: '´app-pagina-nova-solicitacao',
	templateUrl: './pagina-nova-solicitacao.component.html',
	imports: [
		SidebarClienteComponent,
		RouterOutlet,
		CommonModule,
		ReactiveFormsModule,
		MatIcon,
		InputTextComponent,
		RouterLink,
	],
})
export class PaginaNovaSolicitacaoComponent {
	title = 'Nova Solicitação';
	novaSolicitacaoForm!: FormGroup;
	listaCategorias = listaCategoriasDb;

	constructor(private fBuilder: FormBuilder) {
		this.novaSolicitacaoForm = this.fBuilder.group({
			descricaoEquipamento: ['', Validators.required],
			categoria: ['', Validators.required],
			descricaoDefeito: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.novaSolicitacaoForm.valid) {
			console.log(this.novaSolicitacaoForm.value);
			this.novaSolicitacaoForm.reset();
		} else {
			this.novaSolicitacaoForm.markAllAsTouched();
		}
	}
}
