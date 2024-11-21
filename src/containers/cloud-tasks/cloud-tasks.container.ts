import { bookmarkActions } from '@actions/bookmark.actions';
import { entityActions } from '@actions/entity.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CloudTaskComponent } from '@components/cloud-task/cloud-task.component';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { CloudTask, SyncTaskType } from '@models/cloud.model';
import { Action, Store } from '@ngrx/store';
import { selBoomkark_clickedCloudTasks } from '@selectors/bookmark/bookmark-clicks.selectors';
import { selCloudAvailableTasks } from '@selectors/cloud/cloud.selectors';
import { selCore_isFirestoreConfigMissing } from '@selectors/core/core-configuration.selectors';
import { combineLatest, map, Observable } from 'rxjs';
import { AlertComponent } from "../../lib/components/alert/alert.component";
import { PortalComponent } from "../../lib/components/portal.component";

function getBookmarkAction(taskType: SyncTaskType): Action | null {

	const entityType = AppEntityType.bookmark;

	if (taskType === SyncTaskType.clicked)
		return bookmarkActions.uploadClicked();

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
	standalone: true,
	imports: [ GlyphDirective, AsyncPipe, CloudTaskComponent, PortalComponent, AlertComponent, RouterLink ],
	selector: 'app-cloud-tasks-container',
	templateUrl: './cloud-tasks.container.html',
	host: { 'class': 'grid gap-1 md:gap-2' }
})
export class CloudTasksContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected isFirestoreConfigMissing = this.store.selectSignal(selCore_isFirestoreConfigMissing);
	protected tasks$: Observable<CloudTask[]>;

	constructor() {

		super();
		this.tasks$ = combineLatest([
			this.store.select(selCloudAvailableTasks),
			this.store.select(selBoomkark_clickedCloudTasks)
		]).pipe(

			map(([ tasks, clicks ]) => clicks ? [ ...tasks, clicks ] : tasks)

		);

	}

	onAction(task: CloudTask): void {

		const action: Action | null = getAction(task);
		if (action !== null)
			this.store.dispatch(action);

	}

	onDownloadRemoteIds(): void {

		this.store.dispatch(entityActions.downloadRemoteMetadata());

	}

}
