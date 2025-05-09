import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ViaCepService } from './via-cep.service';

describe('ViaCepService', () => {
  let service: ViaCepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViaCepService],
    });

    service = TestBed.inject(ViaCepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar o endereço pelo CEP', () => {
    const mockResponse = {
      logradouro: 'Rua Teste',
      localidade: 'Cidade Teste',
      uf: 'PR',
      complemento: '',
    };

    service.buscar('12345678').subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve retornar erro se a API falhar', () => {
    service.buscar('12345678').subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    req.flush('Erro no servidor', { status: 500, statusText: 'Internal Server Error' });
  });
});
