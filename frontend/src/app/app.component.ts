import { Component } from '@angular/core';

import { PaginaSolicitacoesComponent } from './pagina-solicitacoes/pagina-solicitacoes.component';

@Component({
  selector: 'app-root',
  imports: [PaginaSolicitacoesComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-manutencoes';
}
