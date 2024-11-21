import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	standalone: true,
	name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

	transform(value: number | string): string {

		// Convert to a string if the value is a number
		const numString = value.toString();
		// Use a regular expression to add dots every three digits
		return numString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

	}

}
