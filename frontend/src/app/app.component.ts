import { Component } from '@angular/core';

import {
    PaginaCadastroComponent
} from './components/pages/pagina-cadastro/pagina-cadastro.component';
import {
    PaginaSolicitacoesComponent
} from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';

@Component({
  selector: 'app-root',
  imports: [PaginaSolicitacoesComponent, PaginaCadastroComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-manutencoes';
}
