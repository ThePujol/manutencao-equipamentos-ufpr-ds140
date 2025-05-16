import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExpandivelComponent } from './tabela-expandivel.component';

describe('TabelaExpandivelComponent', () => {
  let component: TabelaExpandivelComponent;
  let fixture: ComponentFixture<TabelaExpandivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaExpandivelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaExpandivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
