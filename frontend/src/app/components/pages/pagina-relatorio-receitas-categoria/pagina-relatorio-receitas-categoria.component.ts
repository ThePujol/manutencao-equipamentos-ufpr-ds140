import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';
import { MensagemComponent } from '../../ui/mensagem/mensagem.component';
import { ReportService, ReceitaPorCategoria } from '../../../services/report.service';

@Component({
  selector: 'app-pagina-relatorio-receitas-categoria',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarFuncionarioComponent,
    MensagemComponent
  ],
  templateUrl: './pagina-relatorio-receitas-categoria.component.html',
  styleUrls: ['./pagina-relatorio-receitas-categoria.component.css']
})
export class PaginaRelatorioReceitasCategoriaComponent implements OnInit {
  resultados: ReceitaPorCategoria[] = [];
  mensagem = '';
  showMessage = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    // já carrega os dados ao entrar na página
    this.resultados = this.reportService.getReceitaPorCategoria();
  }

  gerarPDF(): void {
    // TODO: montar e baixar o PDF usando this.resultados
    // exibir feedback:
    // this.mensagem = 'PDF gerado com sucesso!';
    // this.showMessage = true;
    // setTimeout(() => this.showMessage = false, 3000);
  }
}
