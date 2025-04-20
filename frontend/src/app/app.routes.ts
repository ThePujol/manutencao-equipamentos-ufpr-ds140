import { Routes } from '@angular/router';

import { PaginaCadastroComponent } from './components/pages/pagina-cadastro/pagina-cadastro.component';
import { PaginaEdicaoPerfilComponent } from './components/pages/pagina-edicao-perfil/pagina-edicao-perfil.component';
import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { PaginaNovaSolicitacaoComponent } from './components/pages/pagina-nova-solicitacao/pagina-nova-solicitacao.component';
import { PaginaSolicitacoesComponent } from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';
import { PaginaCategoriasComponent } from './components/pages/pagina-categorias/pagina-categorias.component';

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
		path: 'editar-perfil',
		component: PaginaEdicaoPerfilComponent,
		title: 'Editar Perfil',
	},
  {
    path: 'categorias',
    component: PaginaCategoriasComponent,
    title: 'Lista de Categorias',
  },
	{
		path: '**',
		redirectTo: 'cadastro',
		pathMatch: 'full',
	},
];
