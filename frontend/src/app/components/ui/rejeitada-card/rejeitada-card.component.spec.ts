import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeitadaCardComponent } from './rejeitada-card.component';

describe('RejeitadaCardComponent', () => {
  let component: RejeitadaCardComponent;
  let fixture: ComponentFixture<RejeitadaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejeitadaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejeitadaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
