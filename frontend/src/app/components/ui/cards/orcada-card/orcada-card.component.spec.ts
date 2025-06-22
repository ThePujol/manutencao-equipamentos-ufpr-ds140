import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcadaCardComponent } from './orcada-card.component';

describe('OrcadaCardComponent', () => {
  let component: OrcadaCardComponent;
  let fixture: ComponentFixture<OrcadaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcadaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcadaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
