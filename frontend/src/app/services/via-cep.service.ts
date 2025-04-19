import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ViaCepResponse } from '../shared/viacep-interface';

@Injectable({
	providedIn: 'root',
})
export class ViaCepService {
	constructor(private http: HttpClient) {}

	buscar(cep: string): Observable<ViaCepResponse> {
		return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
	}
}
