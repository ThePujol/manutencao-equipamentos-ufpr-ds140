import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoTagComponent } from './situacao-tag.component';

describe('SituacaoTagComponent', () => {
  let component: SituacaoTagComponent;
  let fixture: ComponentFixture<SituacaoTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituacaoTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacaoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
