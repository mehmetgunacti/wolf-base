import { Injectable, inject } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';
import { selLocalDeletedRemoteDeleted as selBookmark } from 'store/selectors/bookmark-selectors/bookmark-sync.selectors';
import { selLocalDeletedRemoteDeleted as selNoteContent } from 'store/selectors/note-content-selectors/note-content-sync.selectors';
import { selLocalDeletedRemoteDeleted as selNote } from 'store/selectors/note-selectors/note-sync.selectors';
import { selLocalDeletedRemoteDeleted as selProject } from 'store/selectors/project-selectors/project-sync.selectors';
import { selLocalDeletedRemoteDeleted as selTask } from 'store/selectors/project-task-selectors/task-sync.selectors';
import { selLocalDeletedRemoteDeleted as selQuizEntry } from 'store/selectors/quiz-entry-selectors/quiz-entry-sync.selectors';
import { selLocalDeletedRemoteDeleted as selQuote } from 'store/selectors/quote-selectors/quote-sync.selectors';
import { selLocalDeletedRemoteDeleted as selWord } from 'store/selectors/word-selectors/word-sync.selectors';

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
export class EntitySyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.syncDeletedDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)))

			}),
			switchMap(([entityType, items]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => actions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
