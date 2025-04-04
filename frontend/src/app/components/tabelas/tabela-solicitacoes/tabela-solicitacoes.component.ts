import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tabela-solicitacoes',
  imports: [MatIcon],
  templateUrl: './tabela-solicitacoes.component.html',
})
export class TabelaSolicitacoesComponent {
  @Input() tipo: string = "regular";
  @Input() data!: string;
  @Input() descricao!: string;
  @Input() estado: string = "Aberta";
}
