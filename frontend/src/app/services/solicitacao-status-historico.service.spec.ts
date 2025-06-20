import { TestBed } from '@angular/core/testing';

import { SolicitacaoStatusHistoricoService } from './solicitacao-status-historico.service';

describe('SolicitacaoStatusHistoricoService', () => {
  let service: SolicitacaoStatusHistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoStatusHistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
