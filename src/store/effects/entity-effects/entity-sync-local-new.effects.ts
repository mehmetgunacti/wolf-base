import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selLocalNew as selBookmark } from 'store/selectors/bookmark-selectors/bookmark-sync.selectors';
import { selLocalNew as selNoteContent } from 'store/selectors/note-content-selectors/note-content-sync.selectors';
import { selLocalNew as selNote } from 'store/selectors/note-selectors/note-sync.selectors';
import { selLocalNew as selProject } from 'store/selectors/project-selectors/project-sync.selectors';
import { selLocalNew as selTask } from 'store/selectors/project-task-selectors/task-sync.selectors';
import { selLocalNew as selQuizEntry } from 'store/selectors/quiz-entry-selectors/quiz-entry-sync.selectors';
import { selLocalNew as selQuote } from 'store/selectors/quote-selectors/quote-sync.selectors';
import { selLocalNew as selWord } from 'store/selectors/word-selectors/word-sync.selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selBookmark;
		case AppEntityType.note: return selNote;
		case AppEntityType.noteContent: return selNoteContent;
		case AppEntityType.project: return selProject;
		case AppEntityType.quizEntry: return selQuizEntry;
		case AppEntityType.quote: return selQuote;
		case AppEntityType.task: return selTask;
		case AppEntityType.word: return selWord;

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
