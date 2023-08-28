import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsSummary } from 'lib';
import { Observable } from 'rxjs';
import { downloadRemoteClicks, downloadRemoteNew, uploadLocalClicked, uploadLocalDeleted, uploadLocalNew, uploadLocalUpdated, viewLocalDeletedRemoteDeleted, viewLocalDeletedRemoteUpdated, viewLocalUpdatedRemoteDeleted, viewLocalUpdatedRemoteUpdated, viewLocalUntouchedRemoteDeleted, viewLocalUntouchedRemoteUpdated } from 'store/actions/stats-bookmark.actions';
import { selBookmarkStatsSummary } from 'store/selectors/stats-bookmark.selectors';

@Component({
	selector: 'app-stats-summary-container',
	templateUrl: './stats-summary-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryContainerComponent {

	summary$: Observable<StatsSummary>;

	private store: Store = inject(Store);

	constructor() {

		this.summary$ = this.store.select(selBookmarkStatsSummary);

	}

	onDownloadRemoteNew(): void {

		this.store.dispatch(downloadRemoteNew());

	}

	onUploadLocalNew(): void {

		this.store.dispatch(uploadLocalNew());

	}

	onUploadLocalClicked(): void {

		this.store.dispatch(uploadLocalClicked());

	}

	onViewRemoteDeleted(): void {

		this.store.dispatch(viewLocalUntouchedRemoteDeleted());

	}

	onViewRemoteUpdated(): void {

		this.store.dispatch(viewLocalUntouchedRemoteUpdated());

	}

	onUploadLocalUpdated(): void {

		this.store.dispatch(uploadLocalUpdated());

	}

	onUploadLocalDeleted(): void {

		this.store.dispatch(uploadLocalDeleted());

	}

	onDownloadRemoteClicks(): void {

		this.store.dispatch(downloadRemoteClicks());

	}

	onViewLocalUpdatedRemoteUpdated(): void {

		this.store.dispatch(viewLocalUpdatedRemoteUpdated());

	}

	onViewLocalDeletedRemoteDeleted(): void {

		this.store.dispatch(viewLocalDeletedRemoteDeleted());

	}

	onViewLocalUpdatedRemoteDeleted(): void {

		this.store.dispatch(viewLocalUpdatedRemoteDeleted());

	}

	onViewLocalDeletedRemoteUpdated(): void {

		this.store.dispatch(viewLocalDeletedRemoteUpdated());

	}

}