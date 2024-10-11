import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { entityActions } from 'store/actions';
import { selBookmark_RemoteNew } from 'store/selectors/sync/sync-bookmark.selectors';
import { selNoteContent_RemoteNew } from 'store/selectors/sync/sync-note-content.selectors';
import { selNote_RemoteNew } from 'store/selectors/sync/sync-note.selectors';
import { selProject_RemoteNew } from 'store/selectors/sync/sync-project.selectors';
import { selQuizEntry_RemoteNew } from 'store/selectors/sync/sync-quiz-entry.selectors';
import { selQuote_RemoteNew } from 'store/selectors/sync/sync-quote.selectors';
import { selTask_RemoteNew } from 'store/selectors/sync/sync-task.selectors';
import { selWord_RemoteNew } from 'store/selectors/sync/sync-word.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_RemoteNew;
		case AppEntityType.note: return selNote_RemoteNew;
		case AppEntityType.noteContent: return selNoteContent_RemoteNew;
		case AppEntityType.project: return selProject_RemoteNew;
		case AppEntityType.quizEntry: return selQuizEntry_RemoteNew;
		case AppEntityType.quote: return selQuote_RemoteNew;
		case AppEntityType.task: return selTask_RemoteNew;
		case AppEntityType.word: return selWord_RemoteNew;

	}

}

@Injectable()
export class EntitySyncRemoteNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncRemoteNew),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.downloadNew(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
