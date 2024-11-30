import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_RemoteUpdated } from '@selectors/sync/sync-bookmark.selectors';
import { selNoteContent_RemoteUpdated } from '@selectors/sync/sync-note-content.selectors';
import { selNote_RemoteUpdated } from '@selectors/sync/sync-note.selectors';
import { selProject_RemoteUpdated } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_RemoteUpdated } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_RemoteUpdated } from '@selectors/sync/sync-quote.selectors';
import { selTask_RemoteUpdated } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_RemoteUpdated } from '@selectors/sync/sync-test-suites.selectors';
import { selWord_RemoteUpdated } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_RemoteUpdated;
		case AppEntityType.note: return selNote_RemoteUpdated;
		case AppEntityType.noteContent: return selNoteContent_RemoteUpdated;
		case AppEntityType.project: return selProject_RemoteUpdated;
		case AppEntityType.quizEntry: return selQuizEntry_RemoteUpdated;
		case AppEntityType.quote: return selQuote_RemoteUpdated;
		case AppEntityType.task: return selTask_RemoteUpdated;
		case AppEntityType.testSuite: return selTestSuite_RemoteUpdated;
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
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.downloadUpdated(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
