import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-sidebar-button',
	imports: [MatIcon, RouterLink, RouterOutlet, RouterModule],
	templateUrl: './sidebar-button.component.html',
})
export class SidebarButtonComponent {
	@Input() routerLink!: string;
	@Input() icon!: string;
	@Input() text!: string;
}
