import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { CloudTask, SyncTaskType, WolfEntity } from 'lib';
import { Observable, combineLatest, map, toArray } from 'rxjs';
import * as bmActions from 'store/actions/bookmark.actions';
import * as noteActions from 'store/actions/note.actions';
import { selBookmarkCloudTasks } from 'store/selectors/bookmark-selectors/bookmark-cloud.selectors';
import { selNoteCloudTasks } from 'store/selectors/note-selectors/note-cloud.selectors';

function getBookmarkAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

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
			return bmActions.uploadClicked();

		case SyncTaskType.deleted_deleted:
			return bmActions.syncDeletedDeleted();

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getNoteAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return noteActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return noteActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return noteActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return noteActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return noteActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return noteActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return noteActions.syncDeletedDeleted();

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getAction(task: CloudTask): Action | null {

	if (WolfEntity.bookmark.name === task.entity.name)
		return getBookmarkAction(task.type);

	if (WolfEntity.note.name === task.entity.name)
		return getNoteAction(task.type);

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

		this.tasks$ = combineLatest([
			this.store.select(selBookmarkCloudTasks),
			this.store.select(selNoteCloudTasks)
		]).pipe(
			map(([bookmarks, notes]) => [...bookmarks, ...notes])
		);

	}

	onAction(task: CloudTask): void {

		const action: Action | null = getAction(task);
		if (action !== null)
			this.store.dispatch(action);

	}

}
