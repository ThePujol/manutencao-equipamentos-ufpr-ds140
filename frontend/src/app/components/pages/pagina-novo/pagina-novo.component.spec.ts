import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNovoComponent } from './pagina-novo.component';


describe('PaginaNovoComponent', () => {
  let component: PaginaNovoComponent;
  let fixture: ComponentFixture<PaginaNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNovoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
