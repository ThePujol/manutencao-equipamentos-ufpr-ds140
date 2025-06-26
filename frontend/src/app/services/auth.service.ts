import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginRequest {
	email: string;
	senha: string;
}

export interface LoginResponse {
	token: string;
	role: 'pessoa' | 'funcionario';
	id: number;
	nome: string;
	email: string;
}

const LS_USER = 'userData';
const LS_TOKEN = 'authToken';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = 'http://localhost:8080/api/auth';

	constructor(private http: HttpClient) {}

	login(credentials: LoginRequest): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
	}

	getUserData() {
		const userData = localStorage.getItem(LS_USER);
		return userData ? JSON.parse(userData) : undefined;
	}

	getCurrentToken() {
		return localStorage[LS_TOKEN];
	}

	logout() {
		delete localStorage[LS_USER];
		delete localStorage[LS_TOKEN];
	}
}
