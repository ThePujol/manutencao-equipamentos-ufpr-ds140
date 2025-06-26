import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { ReceitaPorDia, ReportService } from '../../../../services/report.service';
import { Situacao } from '../../../../shared/models/solicitacao.model';
import { MultiSelectEstadoComponent } from '../../../ui/multi-select-estado/multi-select-estado.component';
import { MensagemComponent } from '../../../ui/mensagem/mensagem.component';
import { SidebarFuncionarioComponent } from '../../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-relatorio-receitas',
	standalone: true,
        imports: [CommonModule, FormsModule, RouterOutlet, SidebarFuncionarioComponent, MensagemComponent, MultiSelectEstadoComponent],
	templateUrl: './pagina-relatorio-receitas.component.html',
	styleUrls: ['./pagina-relatorio-receitas.component.css'],
})
export class PaginaRelatorioReceitasComponent {
        dataInicio?: string;
        dataFim?: string;
        estadosSelecionados: Situacao[] = [Situacao.FINALIZADA];
        resultados: ReceitaPorDia[] = [];
	mensagem = '';
	showMessage = false;

	constructor(private reportService: ReportService) {}

        buscar(): void {
                const inicio = this.dataInicio ? new Date(this.dataInicio) : undefined;
                const fim = this.dataFim ? new Date(this.dataFim) : undefined;
                this.reportService
                        .getReceitaPorDia(inicio, fim, this.estadosSelecionados)
                        .subscribe((resultados) => {
                                this.resultados = resultados;
                        });
        }

	gerarPDF(): void {
		if (!this.resultados.length) {
			this.mensagem = 'Não há dados para gerar o PDF.';
			this.showMessage = true;
			setTimeout(() => (this.showMessage = false), 3000);
			return;
		}

		const doc = new jsPDF();
		doc.setFontSize(18);
		doc.text('Relatório de Receitas (por dia)', 14, 20);

		const head = [['Data', 'Total (R$)']];
		const body = this.resultados.map((r) => [r.data.toLocaleDateString('pt-BR'), r.total.toFixed(2)]);

		// Chama a função importada em vez de doc.autoTable
		autoTable(doc, {
			head,
			body,
			startY: 30,
			styles: { fontSize: 10 },
			headStyles: { fillColor: [73, 49, 169] },
		});

		doc.save('relatorio_receitas_por_dia.pdf');

		this.mensagem = 'PDF gerado com sucesso!';
		this.showMessage = true;
		setTimeout(() => (this.showMessage = false), 3000);
	}
}
