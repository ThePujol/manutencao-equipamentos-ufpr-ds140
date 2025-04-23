import { Routes } from '@angular/router';

import { PaginaCadastroComponent } from './components/pages/pagina-cadastro/pagina-cadastro.component';
import { PaginaCategoriasComponent } from './components/pages/pagina-categorias/pagina-categorias.component';
import { PaginaEdicaoPerfilComponent } from './components/pages/pagina-edicao-perfil/pagina-edicao-perfil.component';
import { PaginaFuncionariosComponent } from './components/pages/pagina-funcionarios/pagina-funcionarios.component';
import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { PaginaNaoEncontradaComponent } from './components/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaNovaSolicitacaoComponent } from './components/pages/pagina-nova-solicitacao/pagina-nova-solicitacao.component';
import { PaginaSolicitacoesAbertasComponent } from './components/pages/pagina-solicitacoes-abertas/pagina-solicitacoes-abertas.component';
import { PaginaSolicitacoesComponent } from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';
import { SolicitacoesFuncionarioComponent } from './components/pages/solicitacoes-funcionario/solicitacoes-funcionario.component';

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
		path: 'funcionarios',
		component: PaginaFuncionariosComponent,
		title: 'Lista de Funcionários',
	},
	{
		path: 'solicitacoes-abertas',
		component: PaginaSolicitacoesAbertasComponent,
		title: 'Solicitações em Aberto',
	},
	{
		path: 'solicitacoes-funcionario',
		component: SolicitacoesFuncionarioComponent,
		title: 'Solicitações Atribuídas',
	},
	{
		path: '404',
		component: PaginaNaoEncontradaComponent,
		title: 'Página Não Encontrada',
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full',
	},
];
