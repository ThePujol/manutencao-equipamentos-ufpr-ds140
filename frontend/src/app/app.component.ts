import { Component } from '@angular/core';

import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';

@Component({
  selector: 'app-root',
  imports: [PaginaCadastroComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
