import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLongComponent } from './pagina-long.component';

describe('PaginaLongComponent', () => {
  let component: PaginaLongComponent;
  let fixture: ComponentFixture<PaginaLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaLongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
