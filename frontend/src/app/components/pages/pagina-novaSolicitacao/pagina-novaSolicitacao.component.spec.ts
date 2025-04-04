import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNovaSolicitacaoComponent } from './pagina-novaSolicitacao.component';


describe('PaginaNovoComponent', () => {
  let component: PaginaNovaSolicitacaoComponent;
  let fixture: ComponentFixture<PaginaNovaSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNovaSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNovaSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
