import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppEntityType, CloudTask, SyncTaskType } from 'lib';
import { Observable } from 'rxjs';
import * as bmActions from 'store/actions/bookmark.actions';
import * as entityActions from 'store/actions/entity.actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud-selectors/cloud.selectors';

function getBookmarkAction(taskType: SyncTaskType): Action | null {

	const entityType = AppEntityType.bookmark;

	if (taskType === SyncTaskType.clicked)
		return bmActions.uploadClicked();

	return filterAction(AppEntityType.bookmark, taskType);

}

function filterAction(entityType: AppEntityType, taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return entityActions.syncLocalNew({ entityType });

		case SyncTaskType.local_updated:
			return entityActions.syncLocalUpdated({ entityType });

		case SyncTaskType.local_deleted:
			return entityActions.syncLocalDeleted({ entityType });

		case SyncTaskType.remote_new:
			return entityActions.syncRemoteNew({ entityType });

		case SyncTaskType.remote_updated:
			return entityActions.syncRemoteUpdated({ entityType });

		case SyncTaskType.remote_deleted:
			return entityActions.syncRemoteDeleted({ entityType });

		case SyncTaskType.deleted_deleted:
			return entityActions.syncDeletedDeleted({ entityType });

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getAction(task: CloudTask): Action | null {

	if (AppEntityType.bookmark === task.entity)
		return getBookmarkAction(task.type);

	if (AppEntityType.note === task.entity)
		return filterAction(AppEntityType.note, task.type);

	if (AppEntityType.noteContent === task.entity)
		return filterAction(AppEntityType.noteContent, task.type);

	if (AppEntityType.word === task.entity)
		return filterAction(AppEntityType.word, task.type);

	if (AppEntityType.quote === task.entity)
		return filterAction(AppEntityType.quote, task.type);

	if (AppEntityType.quizEntry === task.entity)
		return filterAction(AppEntityType.quizEntry, task.type);

	if (AppEntityType.project === task.entity)
		return filterAction(AppEntityType.project, task.type);

	if (AppEntityType.task === task.entity)
		return filterAction(AppEntityType.task, task.type);

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

		this.tasks$ = this.store.select(selCloudAvailableTasks);

	}

	onAction(task: CloudTask): void {

		const action: Action | null = getAction(task);
		if (action !== null)
			this.store.dispatch(action);

	}

}
