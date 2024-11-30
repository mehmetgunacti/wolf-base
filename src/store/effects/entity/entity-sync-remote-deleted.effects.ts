import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_RemoteDeleted } from '@selectors/sync/sync-bookmark.selectors';
import { selNoteContent_RemoteDeleted } from '@selectors/sync/sync-note-content.selectors';
import { selNote_RemoteDeleted } from '@selectors/sync/sync-note.selectors';
import { selProject_RemoteDeleted } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_RemoteDeleted } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_RemoteDeleted } from '@selectors/sync/sync-quote.selectors';
import { selTask_RemoteDeleted } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_RemoteDeleted } from '@selectors/sync/sync-test-suites.selectors';
import { selWord_RemoteDeleted } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_RemoteDeleted;
		case AppEntityType.note: return selNote_RemoteDeleted;
		case AppEntityType.noteContent: return selNoteContent_RemoteDeleted;
		case AppEntityType.project: return selProject_RemoteDeleted;
		case AppEntityType.quizEntry: return selQuizEntry_RemoteDeleted;
		case AppEntityType.quote: return selQuote_RemoteDeleted;
		case AppEntityType.task: return selTask_RemoteDeleted;
		case AppEntityType.testSuite: return selTestSuite_RemoteDeleted;
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

			ofType(entityActions.syncRemoteDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => entityActions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
