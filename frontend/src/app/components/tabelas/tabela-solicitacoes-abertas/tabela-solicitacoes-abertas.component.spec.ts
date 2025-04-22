import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSolicitacoesAbertasComponent } from './tabela-solicitacoes-abertas.component';

describe('TabelaSolicitacoesAbertasComponent', () => {
  let component: TabelaSolicitacoesAbertasComponent;
  let fixture: ComponentFixture<TabelaSolicitacoesAbertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaSolicitacoesAbertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaSolicitacoesAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
