import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selBookmark_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-bookmark.selectors';
import { selNoteContent_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-note-content.selectors';
import { selNote_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-note.selectors';
import { selProject_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-project.selectors';
import { selQuizEntry_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-quiz-entry.selectors';
import { selQuote_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-quote.selectors';
import { selTask_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-task.selectors';
import { selWord_LocalDeletedRemoteDeleted } from 'store/selectors/sync-selectors/sync-word.selectors';

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

			ofType(actions.syncDeletedDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => actions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
