import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { OrcamentoService } from '../../../services/orcamento.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { ButtonComponent } from '../buttons/button/button.component';
import { SecondaryButtonComponent } from '../buttons/secondary-button/secondary-button.component';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
	selector: 'app-orcada-card',
	imports: [ButtonComponent, SecondaryButtonComponent, CurrencyPipe, InputTextComponent, ReactiveFormsModule],
	templateUrl: './orcada-card.component.html',
})
export class OrcadaCardComponent {
	@Input() precoOrcamento!: number;
	@Input() solicitacao!: Solicitacao;

	formRejeitarOrcamento!: FormGroup;
	mostrarFormRejeitar = false;

	constructor(
		private orcamentoActions: OrcamentoService,
		private fBuilder: FormBuilder
	) {
		this.formRejeitarOrcamento = this.fBuilder.group({
			motivoRejeicao: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
		});
	}

	aprovarOrcamento() {
		this.orcamentoActions.aprovarOrcamentoFn?.(this.solicitacao);
	}

	toggleFormRejeitarOrcamento() {
		this.mostrarFormRejeitar = !this.mostrarFormRejeitar;
	}

	rejeitarOrcamento() {
		if (!this.solicitacao) {
			throw new Error('Solicitacao nao existe!');
		}

		if (this.formRejeitarOrcamento.invalid) {
			this.formRejeitarOrcamento.markAllAsTouched();
			return;
		}

		this.solicitacao.motivoRejeicao = this.formRejeitarOrcamento.value.motivoRejeicao;
		this.orcamentoActions.rejeitarOrcamentoFn?.(this.solicitacao);
	}
}
