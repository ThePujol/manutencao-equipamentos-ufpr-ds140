import { Component } from '@angular/core';

import { CardSolicitacaoComponent } from '../../ui/card-solicitacao/card-solicitacao.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
  selector: 'app-pagina-solicitacoes',
  imports: [CardSolicitacaoComponent, SidebarClienteComponent],
  templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent {

}
