import { Pipe, PipeTransform } from '@angular/core';

const NO_DATA = '<no-data>';

@Pipe({ standalone: true, name: 'noData' })
export class NoDataPipe implements PipeTransform {

	transform(value: any, message: string = NO_DATA): string {

		if (value === 'null')
			return message;
		return value ? value : message;

	}

}
