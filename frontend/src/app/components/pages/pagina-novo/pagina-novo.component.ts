import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarClienteComponent } from "../../ui/sidebar-cliente/sidebar-cliente.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

interface Solicitacao {
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: string;
}

@Component({
  selector: '´app-pagina-novo',
  templateUrl: './pagina-novo.component.html',
  styleUrls: ['./pagina-novo.component.css'],
  standalone: true,
  imports: [CommonModule,SidebarClienteComponent, FormsModule]
})



export class PaginaNovoComponent {
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