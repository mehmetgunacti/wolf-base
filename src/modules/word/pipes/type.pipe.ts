import { Pipe, PipeTransform } from '@angular/core';
import { DefinitionTypeLabels } from 'lib/constants/word.constant';

@Pipe({ name: 'defType' })
export class TypePipe implements PipeTransform {

	transform(value: any): string {

		if (!value)
			return '-';
		return DefinitionTypeLabels[value];

	}

}
