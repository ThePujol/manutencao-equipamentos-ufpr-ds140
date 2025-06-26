import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Situacao } from '../../../shared/models/solicitacao.model';

@Component({
	selector: 'app-multi-select-estado',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './multi-select-estado.component.html',
})
export class MultiSelectEstadoComponent implements OnInit {
	@Output() estadosChange = new EventEmitter<Situacao[]>();

	/** Todas as situações possíveis */
	estados: Situacao[] = [
		Situacao.ABERTA,
		Situacao.ORÇADA,
		Situacao.REJEITADA,
		Situacao.REDIRECIONADA,
		Situacao.APROVADA,
		Situacao.ARRUMADA,
		Situacao.PAGA,
		Situacao.FINALIZADA,
	];

	/** Seleções atuais: inicia com apenas Finalizada */
	selecionados: Situacao[] = [Situacao.FINALIZADA];

	/** Controla abertura do dropdown */
	showDropdown = false;

	ngOnInit(): void {
		// Emite seleção inicial (Finalizada) ao carregar
		this.emitChange();
	}

	/** Alterna visibilidade do dropdown */
	toggleDropdown(): void {
		this.showDropdown = !this.showDropdown;
	}

	/** Fecha dropdown ao perder foco */
	closeDropdown(): void {
		setTimeout(() => (this.showDropdown = false), 150);
	}

	/** Marca ou desmarca uma situação e emite o evento */
	onCheckboxChange(event: Event): void {
		const cb = event.target as HTMLInputElement;
		const value = cb.value as Situacao;
		if (cb.checked) {
			if (!this.isSelected(value)) {
				this.selecionados.push(value);
			}
		} else {
			this.selecionados = this.selecionados.filter((v) => v !== value);
		}
		this.emitChange();
	}

	/** Seleciona todas as situações */
	selectAll(): void {
		this.selecionados = [...this.estados];
		this.emitChange();
	}

	/** Desmarca todas as situações */
	selectNone(): void {
		this.selecionados = [];
		this.emitChange();
	}

	/** Emite o array de seleções atual */
	private emitChange(): void {
		this.estadosChange.emit([...this.selecionados]);
	}

	/** Verifica se o estado está selecionado */
	isSelected(estado: Situacao): boolean {
		return this.selecionados.indexOf(estado) > -1;
	}

	/** Rótulo exibido no dropdown, com Title Case
	 *  - "Todas" se tudo selecionado
	 *  - "Nenhum" se nada selecionado
	 *  - Lista de selecionados caso contrário
	 */
	get selecionadosLabel(): string {
		if (this.selecionados.length === this.estados.length) {
			return 'Todas';
		}
		if (this.selecionados.length === 0) {
			return 'Nenhum';
		}
		return this.selecionados.map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(', ');
	}
}
