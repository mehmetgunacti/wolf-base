import { wordActions } from '@actions/word.actions';
import { Component, inject, output } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { SearchBoxComponent } from '@libComponents/search-box/search-box.component';
import { Store } from '@ngrx/store';
import { selWord_search } from '@selectors/word/word-ui.selectors';

@Component({
	imports: [ SearchBoxComponent ],
	selector: 'app-word-filter-container',
	template: '<w-search-box [term]="term()" (search)="onSearch($event)"/>'
})
export class WordFilterContainer extends BaseComponent {

	private store: Store = inject(Store);

	// Input
	term = this.store.selectSignal(selWord_search);

	// Output
	search = output<string>();

	onSearch(term: string): void {

		this.store.dispatch(wordActions.search({ term }));

	}

}
