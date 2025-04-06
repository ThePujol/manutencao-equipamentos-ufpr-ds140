import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoPopUpComponent } from './pagamento-pop-up.component';

describe('PagamentoPopUpComponent', () => {
  let component: PagamentoPopUpComponent;
  let fixture: ComponentFixture<PagamentoPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
