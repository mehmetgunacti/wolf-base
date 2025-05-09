import { Pipe, PipeTransform } from '@angular/core';
import { DefinitionTypeLabels } from '@constants/word.constant';

@Pipe({ standalone: true, name: 'defType' })
export class DefinitionTypePipe implements PipeTransform {

	transform(value: any): string {

		if (!value)
			return '-';
		return DefinitionTypeLabels[ value ];

	}

}
