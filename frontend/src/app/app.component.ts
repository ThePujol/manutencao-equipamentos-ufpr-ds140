import { Component } from '@angular/core';

import {
    PaginaSolicitacoesComponent
} from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';

@Component({
  selector: 'app-root',
  imports: [PaginaSolicitacoesComponent, PaginaCadastroComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-manutencoes';
}
