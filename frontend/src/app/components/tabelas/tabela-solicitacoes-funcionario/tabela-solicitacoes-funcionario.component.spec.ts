import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSolicitacoesFuncionarioComponent } from './tabela-solicitacoes-funcionario.component';

describe('TabelaSolicitacoesFuncionarioComponent', () => {
  let component: TabelaSolicitacoesFuncionarioComponent;
  let fixture: ComponentFixture<TabelaSolicitacoesFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaSolicitacoesFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaSolicitacoesFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
