import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEdicaoPerfilComponent } from './pagina-edicao-perfil.component';

describe('PaginaEdicaoPerfilComponent', () => {
  let component: PaginaEdicaoPerfilComponent;
  let fixture: ComponentFixture<PaginaEdicaoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEdicaoPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEdicaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
