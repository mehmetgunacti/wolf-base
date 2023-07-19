import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bookmarksClicked } from 'store/selectors/bookmark-entities.selectors';
import { bookmarksCreated, bookmarksDeleted, bookmarksUpdated } from 'store/selectors/bookmark-sync.selectors';
import { messages } from 'store/selectors/sync.selectors';

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

		this.bookmarksCreated$ = this.store.select(bookmarksCreated);
		this.bookmarksClicked$ = this.store.select(bookmarksClicked);
		this.bookmarksDeleted$ = this.store.select(bookmarksDeleted);
		this.bookmarksUpdated$ = this.store.select(bookmarksUpdated);

		this.messages$ = this.store.select(messages);

	}

	onStart(): void {

		//

	}

}