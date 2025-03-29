import { Component } from '@angular/core';
import { SidebarClienteComponent } from "../../ui/sidebar-cliente/sidebar-cliente.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '´app-pagina-novo',
  templateUrl: './pagina-novo.component.html',
  styleUrls: ['./pagina-novo.component.css'],
  imports: [SidebarClienteComponent]
})
export class PaginaNovoComponent {
  // Modelo da solicitação com os campos necessários
  solicitacao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: '',
    dataHora: new Date(), // Registra a data/hora atual
    estado: 'ABERTA'      // Estado padrão para novas solicitações
  };

  // Função executada ao submeter o formulário
  onSubmit() {
    // Aqui você pode implementar a lógica para enviar os dados para o backend,
    // por exemplo, utilizando um serviço Angular para comunicação HTTP.
    console.log('Solicitação enviada:', this.solicitacao);

    // Exemplo de chamada a um serviço:
    // this.solicitacaoService.enviarSolicitacao(this.solicitacao).subscribe(response => {
    //   // Tratar a resposta
    // });
  }
}
