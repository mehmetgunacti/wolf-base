import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selBookmark_LocalUpdated } from 'store/selectors/bookmark-selectors/bookmark-cloud.selectors';
import { selWord_LocalUpdated } from 'store/selectors/cloud-selectors/cloud-word.selectors';
import { selNoteContent_LocalUpdated } from 'store/selectors/note-content-selectors/note-content-cloud.selectors';
import { selNote_LocalUpdated } from 'store/selectors/note-selectors/note-cloud.selectors';
import { selProject_LocalUpdated } from 'store/selectors/project-selectors/project-cloud.selectors';
import { selTask_LocalUpdated } from 'store/selectors/project-task-selectors/task-cloud.selectors';
import { selQuizEntry_LocalUpdated } from 'store/selectors/quiz-entry-selectors/quiz-entry-cloud.selectors';
import { selQuote_LocalUpdated } from 'store/selectors/quote-selectors/quote-cloud.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark_LocalUpdated;
		case AppEntityType.note: return selNote_LocalUpdated;
		case AppEntityType.noteContent: return selNoteContent_LocalUpdated;
		case AppEntityType.project: return selProject_LocalUpdated;
		case AppEntityType.quizEntry: return selQuizEntry_LocalUpdated;
		case AppEntityType.quote: return selQuote_LocalUpdated;
		case AppEntityType.task: return selTask_LocalUpdated;
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

			ofType(actions.syncLocalUpdated),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.uploadUpdated(entityType, items).pipe(

					map(item => actions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
