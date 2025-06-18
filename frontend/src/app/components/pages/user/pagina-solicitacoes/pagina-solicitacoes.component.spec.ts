import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSolicitacoesComponent } from './pagina-solicitacoes.component';

describe('PaginaSolicitacoesComponent', () => {
  let component: PaginaSolicitacoesComponent;
  let fixture: ComponentFixture<PaginaSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
