import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoDetalheComponent } from './informacao-detalhe.component';

describe('InformacaoDetalheComponent', () => {
  let component: InformacaoDetalheComponent;
  let fixture: ComponentFixture<InformacaoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacaoDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
