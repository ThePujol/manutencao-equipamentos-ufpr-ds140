import { Component } from '@angular/core';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';

@Component({
  selector: 'app-root',
  imports: [PaginaLoginComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
