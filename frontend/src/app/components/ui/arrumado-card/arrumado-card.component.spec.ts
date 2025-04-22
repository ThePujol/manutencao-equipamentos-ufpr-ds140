import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrumadoCardComponent } from './arrumado-card.component';

describe('ArrumadoCardComponent', () => {
  let component: ArrumadoCardComponent;
  let fixture: ComponentFixture<ArrumadoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrumadoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrumadoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
