import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatsSummary } from 'lib';
import { Observable } from 'rxjs';
import { downloadRemoteClicked, downloadRemoteNew, uploadLocalClicked, uploadLocalNew } from 'store/actions/bookmark-sync.actions';
import { sltBookmarkStatsSummary } from 'store/selectors/bookmark-stats.selectors';

@Component({
	selector: 'app-stats-summary-container',
	templateUrl: './stats-summary-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsSummaryContainerComponent {

	summary$: Observable<StatsSummary>;

	private store: Store = inject(Store);

	constructor() {

		this.summary$ = this.store.select(sltBookmarkStatsSummary);

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

		this.store.dispatch(uploadLocalClicked());

	}

	onViewRemoteUpdated(): void {

		this.store.dispatch(uploadLocalClicked());

	}

	onUploadLocalUpdated(): void {

		this.store.dispatch(uploadLocalClicked());

	}

	onUploadLocalDeleted(): void {

		this.store.dispatch(uploadLocalClicked());

	}

	onViewErrors(): void {

		this.store.dispatch(uploadLocalClicked());

	}

	onDownloadRemoteClicked(): void {

		this.store.dispatch(downloadRemoteClicked());

	}

}