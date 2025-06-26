import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) return value; // Verifica se o valor não é nulo ou vazio
		return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
	}
}
