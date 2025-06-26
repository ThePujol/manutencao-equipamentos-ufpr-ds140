import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ReportService } from './report.service';
import { SolicitacaoService } from './solicitacao.service';
import { Situacao, Solicitacao } from '../shared/models/solicitacao.model';
import { Categoria } from '../shared/models/categoria.model';
import { Pessoa } from '../shared/models/pessoa.model';

describe('ReportService', () => {
  let service: ReportService;
  let solicitacaoServiceSpy: jasmine.SpyObj<SolicitacaoService>;

  beforeEach(() => {
    solicitacaoServiceSpy = jasmine.createSpyObj('SolicitacaoService', ['listarSolicitacoes']);
    TestBed.configureTestingModule({
      providers: [
        ReportService,
        { provide: SolicitacaoService, useValue: solicitacaoServiceSpy }
      ]
    });
    service = TestBed.inject(ReportService);
  });

  it('should filter solicitacoes by situacao for categoria', (done) => {
    const solicitacoes: Solicitacao[] = [
      {
        id: 1,
        descricao: '',
        categoria: { id: 1, descricao: 'A' } as Categoria,
        defeito: '',
        situacao: Situacao.FINALIZADA,
        cliente: {} as Pessoa,
        orcamento: 100,
        dataSolicitacaoAbertura: new Date('2024-01-01'),
      } as Solicitacao,
      {
        id: 2,
        descricao: '',
        categoria: { id: 1, descricao: 'A' } as Categoria,
        defeito: '',
        situacao: Situacao.PAGA,
        cliente: {} as Pessoa,
        orcamento: 50,
        dataSolicitacaoAbertura: new Date('2024-01-01'),
      } as Solicitacao,
    ];
    solicitacaoServiceSpy.listarSolicitacoes.and.returnValue(of(solicitacoes));

    service.getReceitaPorCategoria([Situacao.FINALIZADA]).subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].total).toBe(100);
      done();
    });
  });

  it('should filter solicitacoes by situacao for dia', (done) => {
    const data = new Date('2024-01-01');
    const solicitacoes: Solicitacao[] = [
      {
        id: 1,
        descricao: '',
        categoria: { id: 1, descricao: 'A' } as Categoria,
        defeito: '',
        situacao: Situacao.FINALIZADA,
        cliente: {} as Pessoa,
        orcamento: 100,
        dataSolicitacaoAbertura: data,
      } as Solicitacao,
      {
        id: 2,
        descricao: '',
        categoria: { id: 2, descricao: 'B' } as Categoria,
        defeito: '',
        situacao: Situacao.PAGA,
        cliente: {} as Pessoa,
        orcamento: 50,
        dataSolicitacaoAbertura: data,
      } as Solicitacao,
    ];
    solicitacaoServiceSpy.listarSolicitacoes.and.returnValue(of(solicitacoes));

    service.getReceitaPorDia(undefined, undefined, [Situacao.PAGA]).subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].total).toBe(50);
      done();
    });
  });
});
