import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { SyncService } from '@libServices/sync-service.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selBookmark_LocalUpdated } from '@selectors/sync/sync-bookmark.selectors';
import { selNoteContent_LocalUpdated } from '@selectors/sync/sync-note-content.selectors';
import { selNote_LocalUpdated } from '@selectors/sync/sync-note.selectors';
import { selProject_LocalUpdated } from '@selectors/sync/sync-project.selectors';
import { selQuizEntry_LocalUpdated } from '@selectors/sync/sync-quiz-entry.selectors';
import { selQuote_LocalUpdated } from '@selectors/sync/sync-quote.selectors';
import { selTask_LocalUpdated } from '@selectors/sync/sync-task.selectors';
import { selTestSuite_LocalUpdated } from '@selectors/sync/sync-test-suites.selectors';
import { selWord_LocalUpdated } from '@selectors/sync/sync-word.selectors';
import { SYNC_SERVICE } from '@services/sync.service';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalUpdated;
		case AppEntityType.note: return selNote_LocalUpdated;
		case AppEntityType.noteContent: return selNoteContent_LocalUpdated;
		case AppEntityType.project: return selProject_LocalUpdated;
		case AppEntityType.quizEntry: return selQuizEntry_LocalUpdated;
		case AppEntityType.quote: return selQuote_LocalUpdated;
		case AppEntityType.task: return selTask_LocalUpdated;
		case AppEntityType.testSuite: return selTestSuite_LocalUpdated;
		case AppEntityType.word: return selWord_LocalUpdated;

	}

}

@Injectable()
export class EntitySyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncLocalUpdated),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.uploadUpdated(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
