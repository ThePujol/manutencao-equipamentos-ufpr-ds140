import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	matAddCircleOutlineOutline,
	matBuildOutline,
	matCategoryOutline,
	matDescriptionOutline,
	matPerson2Outline,
	matPriorityHighOutline,
} from '@ng-icons/material-icons/outline';

@Component({
	selector: 'app-sidebar-button',
	imports: [RouterLink, RouterOutlet, RouterModule, NgIcon],
	viewProviders: [
		provideIcons({
			matBuildOutline,
			matCategoryOutline,
			matDescriptionOutline,
			matPerson2Outline,
			matPriorityHighOutline,
			matAddCircleOutlineOutline,
		}),
	],
	templateUrl: './sidebar-button.component.html',
})
export class SidebarButtonComponent {
	@Input() routerLink!: string;
	@Input() icon!: string;
	@Input() text!: string;
}
