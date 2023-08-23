import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsSummary } from 'lib';
import { Observable } from 'rxjs';
import { downloadRemoteMetadata, downloadRemoteNew, uploadLocalNew } from 'store/actions/bookmark-sync.actions';
import { selectorBookmarkClickedCount } from 'store/selectors/bookmark-entities.selectors';
import { bookmarkStatsSummary } from 'store/selectors/bookmark-stats.selectors';

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

		this.bookmarkClickedCount$ = this.store.select(selectorBookmarkClickedCount);

	}

	onDownloadRemoteNew(): void {

		this.store.dispatch(downloadRemoteNew());

	}

	onUploadLocalNew(): void {

		this.store.dispatch(uploadLocalNew());

	}

}