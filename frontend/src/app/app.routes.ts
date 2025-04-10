import { PaginaEdicaoPerfilComponent } from './components/pages/pagina-edicao-perfil/pagina-edicao-perfil.component';
import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { PaginaCadastroComponent } from './components/pages/pagina-cadastro/pagina-cadastro.component';
import { PaginaSolicitacoesComponent } from './components/pages/pagina-solicitacoes/pagina-solicitacoes.component';
import { PaginaNovaSolicitacaoComponent } from './components/pages/pagina-novaSolicitacao/pagina-novaSolicitacao.component';

export const routes: Routes = [
  {
    path:'login',
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
    path:'**',
    redirectTo: 'cadastro',
    pathMatch: 'full',
  }
];
