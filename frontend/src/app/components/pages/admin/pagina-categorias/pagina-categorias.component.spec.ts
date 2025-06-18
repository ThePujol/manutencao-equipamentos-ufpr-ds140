import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCategoriasComponent } from './pagina-categorias.component';

describe('PaginaCategoriasComponent', () => {
  let component: PaginaCategoriasComponent;
  let fixture: ComponentFixture<PaginaCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
