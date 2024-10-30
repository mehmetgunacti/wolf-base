import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { maskOrHighlight } from '@utils';

@Pipe({ name: 'markHighlight' })
export class MarkOrHighlightPipe implements PipeTransform {

	constructor() { }

	transform(content: string | null | undefined, word: string, askWord: boolean): string {

		if (!content)
			return '';

		return maskOrHighlight(content, word, askWord);

	}

}
