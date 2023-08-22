import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsSummary } from 'lib';
import { Observable } from 'rxjs';
import { doanloadRemoteMetadata } from 'store/actions/bookmark-sync.actions';
import { downloadRemoteData, loadFirstConflict } from 'store/actions/sync.actions';
import { bookmarkClickedCount } from 'store/selectors/bookmark-entities.selectors';
import { bookmarkStatsSummary } from 'store/selectors/bookmark-sync.selectors';

@Component({
	selector: 'app-stats-summary-container',
	templateUrl: './stats-summary-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryContainerComponent {

	summary$: Observable<StatsSummary>;

	private store: Store = inject(Store);

	bookmarkClickedCount$: Observable<number>;

	constructor() {

		this.summary$ = this.store.select(bookmarkStatsSummary);

		this.bookmarkClickedCount$ = this.store.select(bookmarkClickedCount);

	}

	onDownloadRemoteIds(): void {

		this.store.dispatch(doanloadRemoteMetadata());

	}

}