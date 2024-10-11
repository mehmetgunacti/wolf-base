import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { entityActions } from 'store/actions';
import { selBookmark_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-bookmark.selectors';
import { selNoteContent_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-note-content.selectors';
import { selNote_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-note.selectors';
import { selProject_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-project.selectors';
import { selQuizEntry_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-quiz-entry.selectors';
import { selQuote_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-quote.selectors';
import { selTask_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-task.selectors';
import { selWord_LocalDeletedRemoteDeleted } from 'store/selectors/sync/sync-word.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalDeletedRemoteDeleted;
		case AppEntityType.note: return selNote_LocalDeletedRemoteDeleted;
		case AppEntityType.noteContent: return selNoteContent_LocalDeletedRemoteDeleted;
		case AppEntityType.project: return selProject_LocalDeletedRemoteDeleted;
		case AppEntityType.quizEntry: return selQuizEntry_LocalDeletedRemoteDeleted;
		case AppEntityType.quote: return selQuote_LocalDeletedRemoteDeleted;
		case AppEntityType.task: return selTask_LocalDeletedRemoteDeleted;
		case AppEntityType.word: return selWord_LocalDeletedRemoteDeleted;

	}

}

@Injectable()
export class EntitySyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncDeletedDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => entityActions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
