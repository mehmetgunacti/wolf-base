import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as selectors from 'store/bookmark/selectors';
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

	constructor() {

		this.bookmarksCreated$ = this.store.select(selectors.bookmarksCreated);
		this.bookmarksClicked$ = this.store.select(selectors.bookmarksClicked);
		this.bookmarksDeleted$ = this.store.select(selectors.bookmarksCreated);
		this.bookmarksUpdated$ = this.store.select(selectors.bookmarksUpdated);

	}

	onStart(): void {

		this.store.dispatch(actions.syncMessage({ message: 'Start.', inProgress: true }));

	}

}