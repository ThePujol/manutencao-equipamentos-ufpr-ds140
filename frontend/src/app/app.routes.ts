import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { PaginaCadastroComponent } from './components/pages/pagina-cadastro/pagina-cadastro.component';
import { PaginaCategoriasComponent } from './components/pages/pagina-categorias/pagina-categorias.component';
import { PaginaEdicaoPerfilComponent } from './components/pages/pagina-edicao-perfil/pagina-edicao-perfil.component';
import { PaginaFuncionariosComponent } from './components/pages/pagina-funcionarios/pagina-funcionarios.component';
import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { PaginaNaoEncontradaComponent } from './components/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaNovaSolicitacaoComponent } from './components/pages/pagina-nova-solicitacao/pagina-nova-solicitacao.component';
import { PaginaRelatorioReceitasCategoriaComponent } from './components/pages/pagina-relatorio-receitas-categoria/pagina-relatorio-receitas-categoria.component';
import { PaginaRelatorioReceitasComponent } from './components/pages/pagina-relatorio-receitas/pagina-relatorio-receitas.component';
import { PaginaSolicitacoesAbertasComponent } from './components/pages/pagina-solicitacoes-abertas/pagina-solicitacoes-abertas.component';
import { PaginaSolicitacoesComponent } from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';
import { SolicitacoesFuncionarioComponent } from './components/pages/solicitacoes-funcionario/solicitacoes-funcionario.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'cadastro',
		pathMatch: 'full',
	},
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
		canActivate: [authGuard],
		data: { role: 'pessoa' },
	},
	{
		path: 'nova-solicitacao',
		component: PaginaNovaSolicitacaoComponent,
		title: 'Nova Solicitação',
		canActivate: [authGuard],
		data: { role: 'pessoa' },
	},
	{
		path: 'editar-perfil',
		component: PaginaEdicaoPerfilComponent,
		title: 'Editar Perfil',
		canActivate: [authGuard],
		data: { role: 'pessoa' },
	},
	{
		path: 'categorias',
		component: PaginaCategoriasComponent,
		title: 'Lista de Categorias',
		canActivate: [authGuard],
		data: { role: 'pessoa' },
	},
	{
		path: 'funcionarios',
		component: PaginaFuncionariosComponent,
		title: 'Lista de Funcionários',
		canActivate: [authGuard],
		data: { role: 'funcionario' },
	},
	{
		path: 'solicitacoes-abertas',
		component: PaginaSolicitacoesAbertasComponent,
		title: 'Solicitações em Aberto',
		canActivate: [authGuard],
		data: { role: 'funcionario' },
	},
	{
		path: 'solicitacoes-funcionario',
		component: SolicitacoesFuncionarioComponent,
		title: 'Solicitações Atribuídas',
		canActivate: [authGuard],
		data: { role: 'funcionario' },
	},
	{
		path: '404',
		component: PaginaNaoEncontradaComponent,
		title: 'Página Não Encontrada',
	},
	{
		path: 'relatorios/receitas',
		component: PaginaRelatorioReceitasComponent,
		title: 'Relatório de Receitas (por dia)',
		canActivate: [authGuard],
		data: { role: 'funcionario' },
	},
	{
		path: 'relatorios/receitas-categoria',
		component: PaginaRelatorioReceitasCategoriaComponent,
		title: 'Relatório de Receitas por Categoria',
		canActivate: [authGuard],
		data: { role: 'funcionario' },
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full',
	},
];
