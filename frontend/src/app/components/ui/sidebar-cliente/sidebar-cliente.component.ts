import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar-cliente',
  imports: [MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './sidebar-cliente.component.html',
})
export class SidebarClienteComponent {
  @Input() nome: string = "Nome"
}
