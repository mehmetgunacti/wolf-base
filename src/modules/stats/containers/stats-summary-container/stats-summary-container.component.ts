import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsSummary } from 'lib';
import { Observable } from 'rxjs';
import { downloadClicks, downloadNew, uploadClicks, uploadDeleted, uploadNew, uploadUpdated, viewLocalDeletedRemoteUpdated, viewLocalUpdatedRemoteDeleted, deletePermanently, viewLocalUpdatedRemoteUpdated, downloadDeleted, downloadUpdated } from 'store/actions/stats-bookmark.actions';
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

	onDownloadNew(): void {

		this.store.dispatch(downloadNew());

	}

	onUploadNew(): void {

		this.store.dispatch(uploadNew());

	}

	onUploadClicks(): void {

		this.store.dispatch(uploadClicks());

	}

	onDownloadDeleted(): void {

		console.log('onDownloadDeleted');
		
		this.store.dispatch(downloadDeleted());

	}

	onDownloadUpdated(): void {

		this.store.dispatch(downloadUpdated());

	}

	onUploadUpdated(): void {

		this.store.dispatch(uploadUpdated());

	}

	onUploadDeleted(): void {

		this.store.dispatch(uploadDeleted());

	}

	onDownloadClicks(): void {

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