import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Word } from 'lib/models';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {

	@Input() word: Word | null | undefined;

}
