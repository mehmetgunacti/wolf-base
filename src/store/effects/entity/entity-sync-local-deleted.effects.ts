import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_LocalDeleted } from '@selectors/sync/sync-bookmark.selectors';
import { selExam_LocalDeleted } from '@selectors/sync/sync-exam.selectors';
import { selNoteContent_LocalDeleted } from '@selectors/sync/sync-note-content.selectors';
import { selNote_LocalDeleted } from '@selectors/sync/sync-note.selectors';
import { selProject_LocalDeleted } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_LocalDeleted } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_LocalDeleted } from '@selectors/sync/sync-quote.selectors';
import { selSession_LocalDeleted } from '@selectors/sync/sync-session.selectors';
import { selTask_LocalDeleted } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_LocalDeleted } from '@selectors/sync/sync-test-suite.selectors';
import { selWord_LocalDeleted } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalDeleted;
		case AppEntityType.note: return selNote_LocalDeleted;
		case AppEntityType.exam: return selExam_LocalDeleted;
		case AppEntityType.noteContent: return selNoteContent_LocalDeleted;
		case AppEntityType.project: return selProject_LocalDeleted;
		case AppEntityType.quizEntry: return selQuizEntry_LocalDeleted;
		case AppEntityType.quote: return selQuote_LocalDeleted;
		case AppEntityType.session: return selSession_LocalDeleted;
		case AppEntityType.task: return selTask_LocalDeleted;
		case AppEntityType.testSuite: return selTestSuite_LocalDeleted;
		case AppEntityType.word: return selWord_LocalDeleted;

	}

}

@Injectable()
export class EntitySyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncLocalDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, entities ]) =>

				this.syncService.uploadDeleted(entityType, entities).pipe(

					map(item => entityActions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
