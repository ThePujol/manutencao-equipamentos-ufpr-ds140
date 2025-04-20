import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovadaCardComponent } from './aprovada-card.component';

describe('AprovadaCardComponent', () => {
  let component: AprovadaCardComponent;
  let fixture: ComponentFixture<AprovadaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprovadaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprovadaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
