import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ReceitaPorCategoria, ReportService } from '../../../../services/report.service';
import { MensagemComponent } from '../../../ui/mensagem/mensagem.component';
import { SidebarFuncionarioComponent } from '../../../ui/sidebar-funcionario/sidebar-funcionario.component';

@Component({
	selector: 'app-pagina-relatorio-receitas-categoria',
	standalone: true,
	imports: [CommonModule, RouterOutlet, SidebarFuncionarioComponent, MensagemComponent],
	templateUrl: './pagina-relatorio-receitas-categoria.component.html',
	styleUrls: ['./pagina-relatorio-receitas-categoria.component.css'],
})
export class PaginaRelatorioReceitasCategoriaComponent implements OnInit {
	resultados: ReceitaPorCategoria[] = [];
	mensagem = '';
	showMessage = false;

	constructor(private reportService: ReportService) {}

	ngOnInit(): void {
		// já carrega os dados ao entrar na página
		this.reportService.getReceitaPorCategoria().subscribe((resultados) => {
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
		doc.text('Relatório de Receitas (por categoria)', 14, 20);

		const head = [['Categoria', 'Total (R$)']];
		const body = this.resultados.map((r) => [r.categoria, r.total.toFixed(2)]);

		autoTable(doc, {
			head,
			body,
			startY: 30,
			styles: { fontSize: 10 },
			headStyles: { fillColor: [73, 49, 169] },
		});

		doc.save('relatorio_receitas_por_categoria.pdf');

		this.mensagem = 'PDF gerado com sucesso!';
		this.showMessage = true;
		setTimeout(() => (this.showMessage = false), 3000);
	}
}
