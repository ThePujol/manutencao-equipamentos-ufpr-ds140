import { Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PagamentoPopUpComponent } from '../pagamento-pop-up/pagamento-pop-up.component';

@Component({
  selector: 'app-card-solicitacao',
  imports: [PagamentoPopUpComponent],
  templateUrl: './card-solicitacao.component.html',
})
export class CardSolicitacaoComponent {
  @Input() data: string = "01/01/2000";
  @Input() equipamento: string = "Equipamento";
  @Input() estado: string = "Aberta";
  @Input() temBotao: boolean = false;
  @Input() textoBotao: string = "Visualizar serviço";

  constructor(private dialog: MatDialog) {}

  abrirPopup() {
    this.dialog.open(PagamentoPopUpComponent, {
      width: '400px',
    });
  }
}
