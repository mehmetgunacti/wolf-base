import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selBookmark_RemoteDeleted } from 'store/selectors/sync-selectors/sync-bookmark.selectors';
import { selNoteContent_RemoteDeleted } from 'store/selectors/sync-selectors/sync-note-content.selectors';
import { selNote_RemoteDeleted } from 'store/selectors/sync-selectors/sync-note.selectors';
import { selProject_RemoteDeleted } from 'store/selectors/sync-selectors/sync-project.selectors';
import { selQuizEntry_RemoteDeleted } from 'store/selectors/sync-selectors/sync-quiz-entry.selectors';
import { selQuote_RemoteDeleted } from 'store/selectors/sync-selectors/sync-quote.selectors';
import { selTask_RemoteDeleted } from 'store/selectors/sync-selectors/sync-task.selectors';
import { selWord_RemoteDeleted } from 'store/selectors/sync-selectors/sync-word.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_RemoteDeleted;
		case AppEntityType.note: return selNote_RemoteDeleted;
		case AppEntityType.noteContent: return selNoteContent_RemoteDeleted;
		case AppEntityType.project: return selProject_RemoteDeleted;
		case AppEntityType.quizEntry: return selQuizEntry_RemoteDeleted;
		case AppEntityType.quote: return selQuote_RemoteDeleted;
		case AppEntityType.task: return selTask_RemoteDeleted;
		case AppEntityType.word: return selWord_RemoteDeleted;

	}

}

@Injectable()
export class EntitySyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncRemoteDeleted),
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
