import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarClienteComponent } from '../../ui/sidebar-cliente/sidebar-cliente.component';

interface Solicitacao {
  id: number;
  dataHora: Date;
  nomeCliente: string;
  descricaoProduto: string;
  estado: string;
}

@Component({
  selector: 'app-pagina-inicial-funcionario',
  standalone: true,
  // Importa os módulos necessários para que o Angular reconheça as diretivas e componentes usados no template
  imports: [CommonModule, RouterModule, SidebarClienteComponent],
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrls: ['./pagina-inicial-funcionario.component.css']
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  solicitacoesAbertas: Solicitacao[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Simulação de carregamento de solicitações em estado "ABERTA"
    this.solicitacoesAbertas = [
      {
        id: 1,
        dataHora: new Date(),
        nomeCliente: 'Cliente A',
        descricaoProduto: 'Notebook Dell com problema na bateria e tela que não liga corretamente.',
        estado: 'ABERTA'
      },
      {
        id: 2,
        dataHora: new Date(),
        nomeCliente: 'Cliente B',
        descricaoProduto: 'Smartphone Samsung com defeito no botão de power e superaquecimento.',
        estado: 'ABERTA'
      }
    ];
  }

  efetuarOrcamento(solicitacao: Solicitacao): void {
    console.log('Efetuar orçamento para solicitação ID:', solicitacao.id);
    // Se necessário, redirecione para a página de orçamento:
    // this.router.navigate(['/efetuar-orcamento', solicitacao.id]);
  }
}
