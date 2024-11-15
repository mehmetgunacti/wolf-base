import { Pipe, PipeTransform } from '@angular/core';
import { maskOrHighlight } from '@utils/string.util';

@Pipe({ name: 'markHighlight', standalone: true })
export class MarkOrHighlightPipe implements PipeTransform {

	transform(content: string | null | undefined, word: string, askWord: boolean): string {

		if (!content)
			return '';
		return maskOrHighlight(content, word, askWord);

	}

}
