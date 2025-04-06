import { Component } from '@angular/core';
import { SidebarClienteComponent } from "../../ui/sidebar-cliente/sidebar-cliente.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: '´app-pagina-novaSolicitacao',
  templateUrl: './pagina-novaSolicitacao.component.html',
  imports: [SidebarClienteComponent, RouterOutlet]
})
export class PaginaNovaSolicitacaoComponent {
  // Modelo da solicitação com os campos necessários
  solicitacao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: '',
    dataHora: new Date(), // Registra a data/hora atual
    estado: 'ABERTA'      // Estado padrão para novas solicitações
  };


  onSubmit() {

    console.log('Solicitação enviada:', this.solicitacao);

    // Exemplo de chamada a um serviço:
    // this.solicitacaoService.enviarSolicitacao(this.solicitacao).subscribe(response => {
    //   // Tratar a resposta
    // });
  }
}
