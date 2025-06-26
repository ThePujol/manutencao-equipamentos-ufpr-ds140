import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const usuarioLogado = authService.getUserData();
	const url = state.url;

	if (usuarioLogado) {
		if (route.data?.['role'] && route.data?.['role'].indexOf(usuarioLogado.role) === -1) {
			router.navigate(['/login'], { queryParams: { error: `Proibido o acesso a ${url}` } });
			return false;
		}

		return true;
	}

	router.navigate(['/login'], { queryParams: { error: `Deve fazer o login antes de acessar ${url}` } });
	return false;
};
