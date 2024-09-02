import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selBookmark_LocalNew } from 'store/selectors/bookmark-selectors/bookmark-cloud.selectors';
import { selWord_LocalNew } from 'store/selectors/cloud-selectors/cloud-word.selectors';
import { selNoteContent_LocalNew } from 'store/selectors/note-content-selectors/note-content-cloud.selectors';
import { selNote_LocalNew } from 'store/selectors/note-selectors/note-cloud.selectors';
import { selProject_LocalNew } from 'store/selectors/project-selectors/project-cloud.selectors';
import { selTask_LocalNew } from 'store/selectors/project-task-selectors/task-cloud.selectors';
import { selQuizEntry_LocalNew } from 'store/selectors/quiz-entry-selectors/quiz-entry-cloud.selectors';
import { selQuote_LocalNew } from 'store/selectors/quote-selectors/quote-cloud.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalNew;
		case AppEntityType.note: return selNote_LocalNew;
		case AppEntityType.noteContent: return selNoteContent_LocalNew;
		case AppEntityType.project: return selProject_LocalNew;
		case AppEntityType.quizEntry: return selQuizEntry_LocalNew;
		case AppEntityType.quote: return selQuote_LocalNew;
		case AppEntityType.task: return selTask_LocalNew;
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

			ofType(actions.syncLocalNew),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.uploadNew(entityType, items).pipe(

					map(item => actions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
