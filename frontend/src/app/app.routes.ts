import { Routes } from '@angular/router';

import { PaginaCadastroComponent } from './components/pages/pagina-cadastro/pagina-cadastro.component';
import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { PaginaNovaSolicitacaoComponent } from './components/pages/pagina-nova-solicitacao/pagina-nova-solicitacao.component';
import { PaginaSolicitacoesComponent } from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';

export const routes: Routes = [
	{
		path: 'login',
		component: PaginaLoginComponent,
		title: 'Login',
	},
	{
		path: 'cadastro',
		component: PaginaCadastroComponent,
		title: 'Cadastro',
	},
	{
		path: 'solicitacoes',
		component: PaginaSolicitacoesComponent,
		title: 'Solicitações',
	},
	{
		path: 'nova-solicitacao',
		component: PaginaNovaSolicitacaoComponent,
		title: 'Nova Solicitação',
	},
	{
		path: '**',
		redirectTo: 'cadastro',
		pathMatch: 'full',
	},
];
