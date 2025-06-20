import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestePessoaComponent } from './teste-pessoa.component';

describe('TestePessoaComponent', () => {
  let component: TestePessoaComponent;
  let fixture: ComponentFixture<TestePessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestePessoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestePessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
