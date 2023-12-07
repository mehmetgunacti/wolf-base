import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { CloudTask, SyncTaskType } from 'lib';
import { Observable } from 'rxjs';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkCloudTasks } from 'store/selectors/cloud-bookmark.selectors';

function getAction(task: CloudTask): Action | null {

	switch (task.type) {

		case SyncTaskType.local_new:
			return bmActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return bmActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return bmActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return bmActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return bmActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return bmActions.syncRemoteDeleted();

		case SyncTaskType.clicked:
			return bmActions.syncClicked();

		// case CloudTaskType.deleted_deleted:
		// 	return this.syncService.downloadDeleted(task);

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

@Component({
	selector: 'app-cloud-summary-container',
	templateUrl: './cloud-summary-container.component.html',
	styleUrls: ['./cloud-summary-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudSummaryContainerComponent {

	private store: Store = inject(Store);

	tasks$: Observable<CloudTask[]>;

	constructor() {

		this.tasks$ = this.store.select(selBookmarkCloudTasks);

	}

	onAction(task: CloudTask): void {

		const action: Action | null = getAction(task);
		if (action !== null)
			this.store.dispatch(action);

	}

}
