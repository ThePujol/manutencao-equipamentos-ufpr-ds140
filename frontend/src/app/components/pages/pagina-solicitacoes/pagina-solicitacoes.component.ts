import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CardSolicitacaoComponent } from '../../card-solicitacao/card-solicitacao.component';

@Component({
  selector: 'app-pagina-solicitacoes',
  imports: [MatIconModule, CardSolicitacaoComponent],
  templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent {

}
