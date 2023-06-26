import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as bookmarkSelectors from 'store/bookmark/selectors';
import * as syncSelectors from 'store/sync/selectors';

import * as actions from 'store/sync/actions';

@Component({
	selector: 'app-sync-page',
	templateUrl: './sync-page.component.html'
})
export class SyncPageComponent {

	private store: Store = inject(Store);

	bookmarksClicked$: Observable<number>;
	bookmarksCreated$: Observable<number>;
	bookmarksDeleted$: Observable<number>;
	bookmarksUpdated$: Observable<number>;

	messages$: Observable<string[]>;

	constructor() {

		this.bookmarksCreated$ = this.store.select(bookmarkSelectors.bookmarksCreated);
		this.bookmarksClicked$ = this.store.select(bookmarkSelectors.bookmarksClicked);
		this.bookmarksDeleted$ = this.store.select(bookmarkSelectors.bookmarksCreated);
		this.bookmarksUpdated$ = this.store.select(bookmarkSelectors.bookmarksUpdated);

		this.messages$ = this.store.select(syncSelectors.messages);

	}

	onStart(): void {

		this.store.dispatch(actions.syncTrigger());

	}

}