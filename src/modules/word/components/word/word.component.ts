import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { flag_de, flag_en, flag_tr } from '@lib';
import { MenuItem, Word } from 'lib/models';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {

	@Input() word: Word | null | undefined;

	FLAGS = {

		en: flag_en,
		de: flag_de,
		tr: flag_tr

	};

}
