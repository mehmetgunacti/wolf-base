import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selBookmark_LocalDeleted } from 'store/selectors/sync-selectors/sync-bookmark.selectors';
import { selNoteContent_LocalDeleted } from 'store/selectors/sync-selectors/sync-note-content.selectors';
import { selNote_LocalDeleted } from 'store/selectors/sync-selectors/sync-note.selectors';
import { selProject_LocalDeleted } from 'store/selectors/sync-selectors/sync-project.selectors';
import { selQuizEntry_LocalDeleted } from 'store/selectors/sync-selectors/sync-quiz-entry.selectors';
import { selQuote_LocalDeleted } from 'store/selectors/sync-selectors/sync-quote.selectors';
import { selTask_LocalDeleted } from 'store/selectors/sync-selectors/sync-task.selectors';
import { selWord_LocalDeleted } from 'store/selectors/sync-selectors/sync-word.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalDeleted;
		case AppEntityType.note: return selNote_LocalDeleted;
		case AppEntityType.noteContent: return selNoteContent_LocalDeleted;
		case AppEntityType.project: return selProject_LocalDeleted;
		case AppEntityType.quizEntry: return selQuizEntry_LocalDeleted;
		case AppEntityType.quote: return selQuote_LocalDeleted;
		case AppEntityType.task: return selTask_LocalDeleted;
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

			ofType(actions.syncLocalDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, entities]) =>

				this.syncService.uploadDeleted(entityType, entities).pipe(

					map(item => actions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
