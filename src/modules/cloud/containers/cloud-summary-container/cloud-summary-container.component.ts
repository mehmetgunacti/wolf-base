import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { CloudTask, SyncTaskType, WolfEntity } from 'lib';
import { Observable } from 'rxjs';
import * as bmActions from 'store/actions/bookmark.actions';
import * as noteActions from 'store/actions/note.actions';
import * as contentActions from 'store/actions/note-content.actions';
import * as wordActions from 'store/actions/word.actions';
import * as projectActions from 'store/actions/project.actions';
import * as quoteActions from 'store/actions/quote.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import * as taskActions from 'store/actions/project-task.actions';
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

function getQuizEntryAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return quizEntryActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return quizEntryActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return quizEntryActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return quizEntryActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return quizEntryActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return quizEntryActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return quizEntryActions.syncDeletedDeleted();

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getProjectAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return projectActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return projectActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return projectActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return projectActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return projectActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return projectActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return projectActions.syncDeletedDeleted();

		// case CloudTaskType.updated_updated:
		// case CloudTaskType.updated_deleted:
		// case CloudTaskType.deleted_updated:
		// 	return EMPTY;

	}
	return null;

}

function getTaskAction(taskType: SyncTaskType): Action | null {

	switch (taskType) {

		case SyncTaskType.local_new:
			return taskActions.syncLocalNew();

		case SyncTaskType.local_updated:
			return taskActions.syncLocalUpdated();

		case SyncTaskType.local_deleted:
			return taskActions.syncLocalDeleted();

		case SyncTaskType.remote_new:
			return taskActions.syncRemoteNew();

		case SyncTaskType.remote_updated:
			return taskActions.syncRemoteUpdated();

		case SyncTaskType.remote_deleted:
			return taskActions.syncRemoteDeleted();

		case SyncTaskType.deleted_deleted:
			return taskActions.syncDeletedDeleted();

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

	if (WolfEntity.quizEntry.name === task.entity.name)
		return getQuizEntryAction(task.type);

	if (WolfEntity.project.name === task.entity.name)
		return getProjectAction(task.type);

	if (WolfEntity.task.name === task.entity.name)
		return getTaskAction(task.type);

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
