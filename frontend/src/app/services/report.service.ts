import { Injectable } from '@angular/core';
import { SolicitacaoService } from './solicitacao.service';
import { Situacao } from '../shared/models/solicitacao.model';

export interface ReceitaPorDia {
  data: Date;
  total: number;
}

export interface ReceitaPorCategoria {
  categoria: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private solicitacaoService: SolicitacaoService) {}

  getReceitaPorDia(dataInicio?: Date, dataFim?: Date): ReceitaPorDia[] {
    const todas = this.solicitacaoService.listarSolicitacoes()
      .filter(s => s.situacao === Situacao.paga);

    const filtradas = todas.filter(s => {
      const dt = s.dataFinalizacao ?? s.dataSolicitacao;
      return (!dataInicio || dt >= dataInicio) && (!dataFim || dt <= dataFim);
    });

    const mapa = new Map<string, number>();
    filtradas.forEach(s => {
      const dt = s.dataFinalizacao ?? s.dataSolicitacao;
      const key = dt.toISOString().substring(0, 10);
      mapa.set(key, (mapa.get(key) || 0) + (s.orcamento ?? 0));
    });

    return Array.from(mapa.entries())
      .map(([key, total]) => ({ data: new Date(key), total }))
      .sort((a, b) => a.data.getTime() - b.data.getTime());
  }

  getReceitaPorCategoria(): ReceitaPorCategoria[] {
    const todas = this.solicitacaoService.listarSolicitacoes()
      .filter(s => s.situacao === Situacao.paga);

    const mapa = new Map<string, number>();
    todas.forEach(s => {
      const nome = s.categoria.descricao;
      mapa.set(nome, (mapa.get(nome) || 0) + (s.orcamento ?? 0));
    });

    return Array.from(mapa.entries())
      .map(([categoria, total]) => ({ categoria, total }))
      .sort((a, b) => a.categoria.localeCompare(b.categoria));
  }
}
