import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { CloudTask, SyncTaskType, WolfEntity } from 'lib';
import { Observable } from 'rxjs';
import * as bmActions from 'store/actions/bookmark.actions';
import * as noteActions from 'store/actions/note.actions';
import * as contentActions from 'store/actions/note-content.actions';
import * as wordActions from 'store/actions/word.actions';
import * as quoteActions from 'store/actions/quote.actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud.selectors';

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

function getNoteContentAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return contentActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return contentActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return contentActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return contentActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return contentActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return contentActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return contentActions.syncDeletedDeleted();

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getWordAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return wordActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return wordActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return wordActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return wordActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return wordActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return wordActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return wordActions.syncDeletedDeleted();

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getQuoteAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return quoteActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return quoteActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return quoteActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return quoteActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return quoteActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return quoteActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return quoteActions.syncDeletedDeleted();

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

	if (WolfEntity.note_content.name === task.entity.name)
		return getNoteContentAction(task.type);

	if (WolfEntity.word.name === task.entity.name)
		return getWordAction(task.type);

	if (WolfEntity.quote.name === task.entity.name)
		return getQuoteAction(task.type);

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
