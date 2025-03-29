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

@Component({
  selector: 'app-root',
  imports: [PaginaSolicitacoesComponent, PaginaCadastroComponent,PaginaNovoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-manutencoes';
}
