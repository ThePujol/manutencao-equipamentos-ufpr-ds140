import { Component } from '@angular/core';

import { CardSolicitacaoComponent } from '../../ui/card-solicitacao/card-solicitacao.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pagina-solicitacoes',
  imports: [CardSolicitacaoComponent, SidebarClienteComponent, RouterOutlet],
  templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent {

}
