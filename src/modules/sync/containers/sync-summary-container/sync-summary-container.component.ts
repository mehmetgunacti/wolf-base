import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadFirstConflict } from 'store/actions/sync.actions';
import { bookmarkClickedCount } from 'store/selectors/bookmark-entities.selectors';
import { bookmarkCreatedCount, bookmarkDeletedCount, bookmarkErrorsCount, bookmarkUpdatedCount } from 'store/selectors/bookmark-sync.selectors';
import { messages } from 'store/selectors/sync.selectors';

@Component({
	selector: 'app-sync-summary-container',
	templateUrl: './sync-summary-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncSummaryContainerComponent {

	private store: Store = inject(Store);

	bookmarkErrorsCount$: Observable<number>;
	bookmarkClickedCount$: Observable<number>;
	bookmarkCreatedCount$: Observable<number>;
	bookmarkDeletedCount$: Observable<number>;
	bookmarkUpdatedCount$: Observable<number>;

	messages$: Observable<string[]>;

	constructor() {

		this.bookmarkErrorsCount$ = this.store.select(bookmarkErrorsCount);
		this.bookmarkCreatedCount$ = this.store.select(bookmarkCreatedCount);
		this.bookmarkClickedCount$ = this.store.select(bookmarkClickedCount);
		this.bookmarkDeletedCount$ = this.store.select(bookmarkDeletedCount);
		this.bookmarkUpdatedCount$ = this.store.select(bookmarkUpdatedCount);

		this.messages$ = this.store.select(messages);

	}

	onStart(): void {

		this.store.dispatch(loadFirstConflict());

	}

}