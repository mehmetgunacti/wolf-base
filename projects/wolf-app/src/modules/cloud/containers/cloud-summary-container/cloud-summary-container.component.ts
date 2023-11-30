import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { CloudTask, CloudTaskType } from 'lib';
import { Observable } from 'rxjs';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkCloudTasks } from 'store/selectors/cloud-bookmark.selectors';

function getAction(task: CloudTask): Action | null {

	switch (task.type) {

		case CloudTaskType.local_new:
			return bmActions.syncLocalNew();

		case CloudTaskType.local_updated:
			return bmActions.syncLocalUpdated();

		case CloudTaskType.local_deleted:
			return bmActions.syncLocalDeleted();

		// case CloudTaskType.remote_new:
		// 	return this.syncService.downloadNew(task);

		// case CloudTaskType.remote_updated:
		// 	return this.syncService.downloadUpdated(task);

		// case CloudTaskType.remote_deleted:
		// 	return this.syncService.downloadDeleted(task);

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
