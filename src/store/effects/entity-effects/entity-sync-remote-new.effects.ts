import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selRemoteNew as selBookmark } from 'store/selectors/bookmark-selectors/bookmark-sync.selectors';
import { selRemoteNew as selNoteContent } from 'store/selectors/note-content-selectors/note-content-sync.selectors';
import { selRemoteNew as selNote } from 'store/selectors/note-selectors/note-sync.selectors';
import { selRemoteNew as selProject } from 'store/selectors/project-selectors/project-sync.selectors';
import { selRemoteNew as selTask } from 'store/selectors/project-task-selectors/task-sync.selectors';
import { selRemoteNew as selQuizEntry } from 'store/selectors/quiz-entry-selectors/quiz-entry-sync.selectors';
import { selRemoteNew as selQuote } from 'store/selectors/quote-selectors/quote-sync.selectors';
import { selRemoteNew as selWord } from 'store/selectors/word-selectors/word-sync.selectors';

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
export class EntitySyncRemoteNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncRemoteNew),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.downloadNew(entityType, items).pipe(

					map(item => actions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
