import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-solicitacao',
  imports: [],
  templateUrl: './card-solicitacao.component.html',
})
export class CardSolicitacaoComponent {
  @Input() data: string = "01/01/2000";
  @Input() equipamento: string = "Equipamento";
  @Input() estado: string = "Aberta";
  @Input() temBotao: boolean = false;
  @Input() textoBotao: string = "Visualizar serviço";
}
