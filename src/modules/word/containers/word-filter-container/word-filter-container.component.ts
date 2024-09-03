import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { search } from 'store/actions/word.actions';
import { selWord_search } from 'store/selectors/word-selectors/word-ui.selectors';

@Component({
	selector: 'app-word-filter-container',
	templateUrl: './word-filter-container.component.html',
	styleUrls: ['./word-filter-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordFilterContainerComponent {

	term$: Observable<string | null>;

	@Output() search: EventEmitter<string> = new EventEmitter();

	private store: Store = inject(Store);

	constructor() {

		this.term$ = this.store.select(selWord_search);

	}

	onSearch(term: string): void {

		this.store.dispatch(search({ term }));

	}

}
