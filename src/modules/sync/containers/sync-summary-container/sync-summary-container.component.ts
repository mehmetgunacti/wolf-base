import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, of } from 'rxjs';
import { loadFirstConflict } from 'store/actions/sync.actions';
import { selectorBookmarkClickedCount } from 'store/selectors/bookmark-entities.selectors';

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
	bookmarkEmpty$: Observable<boolean>;

	constructor() {

		this.bookmarkErrorsCount$ = of(0);
		this.bookmarkCreatedCount$ = of(0);
		this.bookmarkClickedCount$ = this.store.select(selectorBookmarkClickedCount);
		this.bookmarkDeletedCount$ = of(0);
		this.bookmarkUpdatedCount$ = of(0);
		this.bookmarkEmpty$ = combineLatest([
			this.bookmarkErrorsCount$,
			this.bookmarkCreatedCount$,
			this.bookmarkClickedCount$,
			this.bookmarkDeletedCount$,
			this.bookmarkUpdatedCount$
		]).pipe(map(([a, b, c, d, e]) => a + b + c + d + e === 0));

	}

	onStart(): void {

		this.store.dispatch(loadFirstConflict());

	}

}