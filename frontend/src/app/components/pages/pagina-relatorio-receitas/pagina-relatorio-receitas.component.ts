import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';
import { MensagemComponent } from '../../ui/mensagem/mensagem.component';
import { ReportService, ReceitaPorDia } from '../../../services/report.service';

@Component({
  selector: 'app-pagina-relatorio-receitas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    SidebarFuncionarioComponent,
    MensagemComponent
  ],
  templateUrl: './pagina-relatorio-receitas.component.html',
  styleUrls: ['./pagina-relatorio-receitas.component.css']
})
export class PaginaRelatorioReceitasComponent implements OnInit {
  dataInicio?: string;
  dataFim?: string;
  resultados: ReceitaPorDia[] = [];
  mensagem = '';
  showMessage = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  buscar(): void {
    const inicio = this.dataInicio ? new Date(this.dataInicio) : undefined;
    const fim    = this.dataFim    ? new Date(this.dataFim)    : undefined;
    this.resultados = this.reportService.getReceitaPorDia(inicio, fim);
  }

  gerarPDF(): void {
    // TODO: montar o PDF com this.resultados
    // se quiser exibir mensagem de sucesso:
    // this.mensagem = 'PDF gerado com sucesso!';
    // this.showMessage = true;
    // setTimeout(() => this.showMessage = false, 3000);
  }
}
