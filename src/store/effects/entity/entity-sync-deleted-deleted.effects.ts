import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-bookmark.selectors';
import { selExam_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-exam.selectors';
import { selNoteContent_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-note-content.selectors';
import { selNote_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-note.selectors';
import { selProject_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-quote.selectors';
import { selSession_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-session.selectors';
import { selTask_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-test-suite.selectors';
import { selWord_LocalDeletedRemoteDeleted } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalDeletedRemoteDeleted;
		case AppEntityType.exam: return selExam_LocalDeletedRemoteDeleted;
		case AppEntityType.note: return selNote_LocalDeletedRemoteDeleted;
		case AppEntityType.noteContent: return selNoteContent_LocalDeletedRemoteDeleted;
		case AppEntityType.project: return selProject_LocalDeletedRemoteDeleted;
		case AppEntityType.quizEntry: return selQuizEntry_LocalDeletedRemoteDeleted;
		case AppEntityType.quote: return selQuote_LocalDeletedRemoteDeleted;
		case AppEntityType.session: return selSession_LocalDeletedRemoteDeleted;
		case AppEntityType.task: return selTask_LocalDeletedRemoteDeleted;
		case AppEntityType.testSuite: return selTestSuite_LocalDeletedRemoteDeleted;
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
