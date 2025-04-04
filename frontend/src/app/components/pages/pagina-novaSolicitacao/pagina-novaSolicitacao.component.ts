import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

interface Solicitacao {
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: string;
}

@Component({
  selector: '´app-pagina-novaSolicitacao',
  templateUrl: './pagina-novaSolicitacao.component.html',
  imports: [SidebarClienteComponent, RouterOutlet, CommonModule, FormsModule]
})
export class PaginaNovaSolicitacaoComponent {
  // Objeto para vinculação dos dados do formulário
  solicitacao: Solicitacao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: '',
    dataHora: new Date(),
    estado: 'ABERTA'
  };

  // Array para simular o armazenamento das solicitações
  solicitacoes: Solicitacao[] = [];


  onSubmit(): void {
    // Cria a nova solicitação com os dados atuais do formulário,
    // atualizando a data/hora e o estado
    const novaSolicitacao: Solicitacao = {
      descricaoEquipamento: this.solicitacao.descricaoEquipamento,
      categoriaEquipamento: this.solicitacao.categoriaEquipamento,
      descricaoDefeito: this.solicitacao.descricaoDefeito,
      dataHora: new Date(),
      estado: 'ABERTA'
    };

    this.solicitacoes.push(novaSolicitacao);
    console.log('Solicitação registrada:', novaSolicitacao);

    // Reseta os campos do formulário
    this.solicitacao.descricaoEquipamento = '';
    this.solicitacao.categoriaEquipamento = '';
    this.solicitacao.descricaoDefeito = '';
  }
}