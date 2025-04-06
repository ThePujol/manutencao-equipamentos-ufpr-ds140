import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSolicitacoesComponent } from './tabela-solicitacoes.component';

describe('TabelaSolicitacoesComponent', () => {
  let component: TabelaSolicitacoesComponent;
  let fixture: ComponentFixture<TabelaSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
