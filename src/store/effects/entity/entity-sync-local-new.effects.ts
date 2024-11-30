import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_LocalNew } from '@selectors/sync/sync-bookmark.selectors';
import { selNoteContent_LocalNew } from '@selectors/sync/sync-note-content.selectors';
import { selNote_LocalNew } from '@selectors/sync/sync-note.selectors';
import { selProject_LocalNew } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_LocalNew } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_LocalNew } from '@selectors/sync/sync-quote.selectors';
import { selTask_LocalNew } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_LocalNew } from '@selectors/sync/sync-test-suites.selectors';
import { selWord_LocalNew } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalNew;
		case AppEntityType.note: return selNote_LocalNew;
		case AppEntityType.noteContent: return selNoteContent_LocalNew;
		case AppEntityType.project: return selProject_LocalNew;
		case AppEntityType.quizEntry: return selQuizEntry_LocalNew;
		case AppEntityType.quote: return selQuote_LocalNew;
		case AppEntityType.task: return selTask_LocalNew;
		case AppEntityType.testSuite: return selTestSuite_LocalNew;
		case AppEntityType.word: return selWord_LocalNew;

	}

}

@Injectable()
export class EntitySyncLocalNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncLocalNew),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.uploadNew(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
