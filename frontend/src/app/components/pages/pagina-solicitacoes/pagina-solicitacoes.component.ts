import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

import { listaSolicitacoes } from '../../../db';
import {
    TabelaSolicitacoesComponent
} from '../../tabelas/tabela-solicitacoes/tabela-solicitacoes.component';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

@Component({
  selector: 'app-pagina-solicitacoes',
  imports: [SidebarClienteComponent, MatIcon, TabelaSolicitacoesComponent, NgFor, RouterOutlet],
  templateUrl: './pagina-solicitacoes.component.html',
})
export class PaginaSolicitacoesComponent {
  listaSolicitacoes = listaSolicitacoes;
}
