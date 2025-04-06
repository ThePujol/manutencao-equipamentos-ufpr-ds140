import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PaginaLoginComponent } from './pagina-login/pagina-login.component';

@Component({
  selector: 'app-root',
  imports: [PaginaLoginComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app-manutencoes';
}
