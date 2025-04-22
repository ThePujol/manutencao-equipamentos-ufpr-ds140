import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPesquisarComponent } from './input-pesquisar.component';

describe('InputPesquisarComponent', () => {
  let component: InputPesquisarComponent;
  let fixture: ComponentFixture<InputPesquisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPesquisarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
