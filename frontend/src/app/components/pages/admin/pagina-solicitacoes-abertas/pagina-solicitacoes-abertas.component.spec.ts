import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSolicitacoesAbertasComponent } from './pagina-solicitacoes-abertas.component';

describe('PaginaSolicitacoesAbertasComponent', () => {
  let component: PaginaSolicitacoesAbertasComponent;
  let fixture: ComponentFixture<PaginaSolicitacoesAbertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSolicitacoesAbertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaSolicitacoesAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
