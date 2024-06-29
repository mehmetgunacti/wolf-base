import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UUID, Word } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { moveToTrash } from 'store/actions/word.actions';
import { selWord_selected } from 'store/selectors/word-selectors/word-entities.selectors';

@Component({
	selector: 'app-word-container',
	templateUrl: './word-container.component.html',
	styleUrls: ['./word-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordContainerComponent {

	private store: Store = inject(Store);

	word$: Observable<Word | null>;

	constructor() {

		this.word$ = this.store.select(selWord_selected);

	}

	navTo(url: string[]): void {

		this.store.dispatch(navigate({ url }));

	}

	onRemove(id: UUID): void {

		if (confirm(`Word will be deleted. Continue?`))
			this.store.dispatch(moveToTrash({ id }));

	}

}
