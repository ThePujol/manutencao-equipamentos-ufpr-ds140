import { Component } from '@angular/core';

import {
    PaginaCadastroComponent
} from './components/pages/pagina-cadastro/pagina-cadastro.component';

import {
    PaginaSolicitacoesComponent
} from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';

import { 
    PaginaNovoComponent 
} from "./components/pages/pagina-novo/pagina-novo.component";
import { PaginaLongComponent } from "./components/pages/pagina-long/pagina-long.component";


@Component({
  selector: 'app-root',
  imports: [PaginaSolicitacoesComponent, PaginaCadastroComponent, PaginaNovoComponent, PaginaLongComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-manutencoes';
}
