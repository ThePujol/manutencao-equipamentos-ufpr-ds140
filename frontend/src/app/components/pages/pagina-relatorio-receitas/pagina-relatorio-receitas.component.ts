import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { SidebarFuncionarioComponent } from '../../ui/sidebar-funcionario/sidebar-funcionario.component';
import { MensagemComponent } from '../../ui/mensagem/mensagem.component';
import { ReportService, ReceitaPorDia } from '../../../services/report.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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

  constructor(private reportService: ReportService) { }

  ngOnInit(): void { }

  buscar(): void {
    const inicio = this.dataInicio ? new Date(this.dataInicio) : undefined;
    const fim = this.dataFim ? new Date(this.dataFim) : undefined;
    this.resultados = this.reportService.getReceitaPorDia(inicio, fim);
  }

  gerarPDF(): void {
    if (!this.resultados.length) {
      this.mensagem = 'Não há dados para gerar o PDF.';
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 3000);
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório de Receitas (por dia)', 14, 20);

    const head = [['Data', 'Total (R$)']];
    const body = this.resultados.map(r => [
      r.data.toLocaleDateString('pt-BR'),
      r.total.toFixed(2)
    ]);

    // Chama a função importada em vez de doc.autoTable
    autoTable(doc, {
      head,
      body,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [73, 49, 169] }
    });

    doc.save('relatorio_receitas_por_dia.pdf');

    this.mensagem = 'PDF gerado com sucesso!';
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
  }

}
