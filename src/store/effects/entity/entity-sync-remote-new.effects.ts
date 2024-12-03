import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_RemoteNew } from '@selectors/sync/sync-bookmark.selectors';
import { selExam_RemoteNew } from '@selectors/sync/sync-exam.selectors';
import { selNoteContent_RemoteNew } from '@selectors/sync/sync-note-content.selectors';
import { selNote_RemoteNew } from '@selectors/sync/sync-note.selectors';
import { selProject_RemoteNew } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_RemoteNew } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_RemoteNew } from '@selectors/sync/sync-quote.selectors';
import { selSession_RemoteNew } from '@selectors/sync/sync-session.selectors';
import { selTask_RemoteNew } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_RemoteNew } from '@selectors/sync/sync-test-suite.selectors';
import { selWord_RemoteNew } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_RemoteNew;
		case AppEntityType.exam: return selExam_RemoteNew;
		case AppEntityType.note: return selNote_RemoteNew;
		case AppEntityType.noteContent: return selNoteContent_RemoteNew;
		case AppEntityType.project: return selProject_RemoteNew;
		case AppEntityType.quizEntry: return selQuizEntry_RemoteNew;
		case AppEntityType.quote: return selQuote_RemoteNew;
		case AppEntityType.session: return selSession_RemoteNew;
		case AppEntityType.task: return selTask_RemoteNew;
		case AppEntityType.testSuite: return selTestSuite_RemoteNew;
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
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.downloadNew(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
