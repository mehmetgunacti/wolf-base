import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsSummary } from 'lib';
import { Observable } from 'rxjs';
import { downloadClicks, downloadNew, uploadClicks, uploadDeleted, uploadNew, uploadUpdated, viewLocalDeletedRemoteUpdated, viewLocalUpdatedRemoteDeleted, deletePermanently, viewLocalUntouchedRemoteDeleted, viewLocalUntouchedRemoteUpdated, viewLocalUpdatedRemoteUpdated } from 'store/actions/stats-bookmark.actions';
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

		this.store.dispatch(downloadNew());

	}

	onUploadLocalNew(): void {

		this.store.dispatch(uploadNew());

	}

	onUploadLocalClicked(): void {

		this.store.dispatch(uploadClicks());

	}

	onViewRemoteDeleted(): void {

		this.store.dispatch(viewLocalUntouchedRemoteDeleted());

	}

	onViewRemoteUpdated(): void {

		this.store.dispatch(viewLocalUntouchedRemoteUpdated());

	}

	onUploadLocalUpdated(): void {

		this.store.dispatch(uploadUpdated());

	}

	onUploadLocalDeleted(): void {

		this.store.dispatch(uploadDeleted());

	}

	onDownloadRemoteClicks(): void {

		this.store.dispatch(downloadClicks());

	}

	onViewLocalUpdatedRemoteUpdated(): void {

		this.store.dispatch(viewLocalUpdatedRemoteUpdated());

	}

	onDeleteLocalMetadata(): void {

		this.store.dispatch(deletePermanently());

	}

	onViewLocalUpdatedRemoteDeleted(): void {

		this.store.dispatch(viewLocalUpdatedRemoteDeleted());

	}

	onViewLocalDeletedRemoteUpdated(): void {

		this.store.dispatch(viewLocalDeletedRemoteUpdated());

	}

}