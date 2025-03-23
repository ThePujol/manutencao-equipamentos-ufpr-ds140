import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-cliente',
  imports: [MatIconModule],
  templateUrl: './sidebar-cliente.component.html',
})
export class SidebarClienteComponent {
  @Input() nome: string = "Nome"
}
