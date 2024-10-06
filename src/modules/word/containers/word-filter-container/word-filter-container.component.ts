import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { wordActions } from 'store/actions';
import { selWord_search } from 'store/selectors/word/word-ui.selectors';

@Component({
	selector: 'app-word-filter-container',
	template: '<w-search-box [term]="term()" (search)="onSearch($event)"/>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordFilterContainerComponent {

	private store: Store = inject(Store);

	// Input
	term = this.store.selectSignal(selWord_search);

	// Output
	search = output<string>();

	onSearch(term: string): void {

		this.store.dispatch(wordActions.search({ term }));

	}

}
