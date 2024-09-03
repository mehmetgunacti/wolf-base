import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from 'lib';
import { Observable, map } from 'rxjs';
import { selWord_filtered } from 'store/selectors/word-selectors/word-ui.selectors';

@Component({
	selector: 'app-words-container',
	templateUrl: './words-container.component.html',
	styleUrls: ['./words-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsContainerComponent {

	private store: Store = inject(Store);

	words$: Observable<Word[]>;

	constructor() {

		this.words$ = this.store.select(selWord_filtered).pipe(
			map(words => words.sort((a, b) => a.name.localeCompare(b.name)))
		);

	}


}
