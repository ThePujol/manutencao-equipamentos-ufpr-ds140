import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFuncionariosComponent } from './pagina-funcionarios.component';

describe('PaginaFuncionariosComponent', () => {
  let component: PaginaFuncionariosComponent;
  let fixture: ComponentFixture<PaginaFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
