import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from 'lib';
import { Observable } from 'rxjs';
import { selWord_array } from 'store/selectors/word-selectors/word-entities.selectors';

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

		this.words$ = this.store.select(selWord_array);

	}


}
