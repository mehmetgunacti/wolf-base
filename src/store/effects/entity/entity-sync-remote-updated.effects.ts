import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { entityActions } from 'store/actions';
import { selBookmark_RemoteUpdated } from 'store/selectors/sync/sync-bookmark.selectors';
import { selNoteContent_RemoteUpdated } from 'store/selectors/sync/sync-note-content.selectors';
import { selNote_RemoteUpdated } from 'store/selectors/sync/sync-note.selectors';
import { selProject_RemoteUpdated } from 'store/selectors/sync/sync-project.selectors';
import { selQuizEntry_RemoteUpdated } from 'store/selectors/sync/sync-quiz-entry.selectors';
import { selQuote_RemoteUpdated } from 'store/selectors/sync/sync-quote.selectors';
import { selTask_RemoteUpdated } from 'store/selectors/sync/sync-task.selectors';
import { selWord_RemoteUpdated } from 'store/selectors/sync/sync-word.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_RemoteUpdated;
		case AppEntityType.note: return selNote_RemoteUpdated;
		case AppEntityType.noteContent: return selNoteContent_RemoteUpdated;
		case AppEntityType.project: return selProject_RemoteUpdated;
		case AppEntityType.quizEntry: return selQuizEntry_RemoteUpdated;
		case AppEntityType.quote: return selQuote_RemoteUpdated;
		case AppEntityType.task: return selTask_RemoteUpdated;
		case AppEntityType.word: return selWord_RemoteUpdated;

	}

}

@Injectable()
export class EntitySyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncRemoteUpdated),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.downloadUpdated(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
