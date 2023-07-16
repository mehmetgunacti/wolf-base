import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as bookmarkSelectors from 'store/bookmark/selectors';
import * as syncSelectors from 'store/sync/selectors';

@Component({
	selector: 'app-sync-summary-container',
	templateUrl: './sync-summary-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSummaryContainerComponent {

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

		//

	}

}