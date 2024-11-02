import { Pipe, PipeTransform } from '@angular/core';
import { DefinitionLanguageLabels } from '@constants';

@Pipe({ standalone: true, name: 'defLanguage' })
export class LanguagePipe implements PipeTransform {

	transform(value: any): string {

		if (!value)
			return '-';
		return DefinitionLanguageLabels[ value ];

	}

}
