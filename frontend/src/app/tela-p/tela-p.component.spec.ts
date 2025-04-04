import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPComponent } from './tela-p.component';

describe('TelaPComponent', () => {
  let component: TelaPComponent;
  let fixture: ComponentFixture<TelaPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
