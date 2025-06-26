import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectEstadoComponent } from './multi-select-estado.component';
import { Situacao } from '../../../shared/models/solicitacao.model';

describe('MultiSelectEstadoComponent', () => {
  let component: MultiSelectEstadoComponent;
  let fixture: ComponentFixture<MultiSelectEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectEstadoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit estados when selection changes', () => {
    const estados = [Situacao.ABERTA, Situacao.PAGA];
    spyOn(component.estadosChange, 'emit');
    component.selecionados = estados;
    component.onSelectionChange();
    expect(component.estadosChange.emit).toHaveBeenCalledWith(estados);
  });
});
