import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { PaginaCadastroComponent } from './pagina-cadastro.component';
import { ViaCepService } from '../../../services/via-cep.service';
import { PessoaService } from '../../../services/pessoa.service';

describe('PaginaCadastroComponent', () => {
  let component: PaginaCadastroComponent;
  let fixture: ComponentFixture<PaginaCadastroComponent>;
  let viaCepService: jasmine.SpyObj<ViaCepService>;
  let pessoaService: jasmine.SpyObj<PessoaService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const viaCepSpy = jasmine.createSpyObj('ViaCepService', ['buscar']);
    const pessoaSpy = jasmine.createSpyObj('PessoaService', ['addPessoa']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PaginaCadastroComponent],
      providers: [
        { provide: ViaCepService, useValue: viaCepSpy },
        { provide: PessoaService, useValue: pessoaSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    viaCepService = TestBed.inject(ViaCepService) as jasmine.SpyObj<ViaCepService>;
    pessoaService = TestBed.inject(PessoaService) as jasmine.SpyObj<PessoaService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(PaginaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de cadastro', () => {
    expect(component.cadastroForm).toBeDefined();
    expect(component.cadastroForm.controls['nome']).toBeTruthy();
  });

  it('deve marcar o formulário como inválido se os campos obrigatórios estiverem vazios', () => {
    component.cadastroForm.controls['nome'].setValue('');
    component.cadastroForm.controls['email'].setValue('');
    expect(component.cadastroForm.valid).toBeFalse();
  });

  it('deve buscar o endereço ao preencher o CEP válido', () => {
    const mockCepData = {
      logradouro: 'Rua Teste',
      localidade: 'Cidade Teste',
      uf: 'PR',
      complemento: '',
      erro: false,
    };
    viaCepService.buscar.and.returnValue(of(mockCepData));

    component.cadastroForm.controls['cep'].setValue('12345678');
    expect(viaCepService.buscar).toHaveBeenCalledWith('12345678');
    expect(component.cadastroForm.controls['endereco'].value).toBe('Rua Teste');
  });

  it('deve exibir erro se o CEP não for encontrado', () => {
    viaCepService.buscar.and.returnValue(of({ erro: true }));

    component.cadastroForm.controls['cep'].setValue('12345678');
    expect(component.cepNaoEncontrado).toBeTrue();
    expect(component.cadastroForm.controls['cep'].hasError('cepInvalido')).toBeTrue();
  });

  it('deve chamar o serviço de pessoa ao enviar o formulário válido', () => {
    component.cadastroForm.setValue({
      nome: 'Teste',
      email: 'teste@teste.com',
      cpf: '12345678900',
      tel: '41999999999',
      estado: 'PR',
      cidade: 'Curitiba',
      cep: '12345678',
      endereco: 'Rua Teste',
      numero: '123',
      complemento: '',
    });

    component.onSubmit();
    expect(pessoaService.addPessoa).toHaveBeenCalledWith(component.cadastroForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve marcar todos os campos como tocados se o formulário for inválido', () => {
    spyOn(component.cadastroForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.cadastroForm.markAllAsTouched).toHaveBeenCalled();
  });
});
