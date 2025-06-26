import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaExpandidaComponent } from './tabela-expandida.component';

describe('TabelaExpandidaComponent', () => {
  let component: TabelaExpandidaComponent;
  let fixture: ComponentFixture<TabelaExpandidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaExpandidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaExpandidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
