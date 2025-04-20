import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbertaCardComponent } from './aberta-card.component';

describe('AbertaCardComponent', () => {
  let component: AbertaCardComponent;
  let fixture: ComponentFixture<AbertaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbertaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbertaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
